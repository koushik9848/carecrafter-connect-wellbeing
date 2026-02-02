import { createClient } from "https://esm.sh/@supabase/supabase-js@2.93.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = await req.json().catch(() => ({}));
    const token = typeof payload?.token === "string" ? payload.token.trim() : "";
    const password = typeof payload?.password === "string" ? payload.password : null;

    if (!token) {
      return json({ ok: false, error: "Invalid or expired access link" });
    }

    const url = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!url || !serviceKey) {
      return json({ ok: false, error: "Server not configured" });
    }

    const admin = createClient(url, serviceKey);

    const { data: tokenRow, error: tokenError } = await admin
      .from("qr_access_tokens")
      .select("id, user_id, record_id, expires_at, is_revoked, password_hash, access_count")
      .eq("token", token)
      .maybeSingle();

    if (tokenError || !tokenRow) {
      return json({ ok: false, error: "Invalid or expired access link" });
    }

    if (tokenRow.is_revoked) {
      return json({ ok: false, error: "This access link has been revoked" });
    }

    if (tokenRow.expires_at && new Date(tokenRow.expires_at) < new Date()) {
      return json({ ok: false, error: "This access link has expired" });
    }

    const { data: profile } = await admin
      .from("profiles")
      .select("full_name")
      .eq("user_id", tokenRow.user_id)
      .maybeSingle();

    const ownerName = profile?.full_name || "User";

    const requiresPassword = !!tokenRow.password_hash;
    if (requiresPassword) {
      if (!password) {
        return json({ ok: true, ownerName, requiresPassword: true });
      }

      // NOTE: demo-level password check (matches frontend generator)
      if (tokenRow.password_hash !== btoa(password)) {
        return json({ ok: false, error: "Incorrect password" });
      }
    }

    // Log access + increment count (best effort)
    await admin.from("qr_access_logs").insert({
      token_id: tokenRow.id,
      user_agent: req.headers.get("user-agent"),
      ip_address: req.headers.get("x-forwarded-for"),
    });

    await admin
      .from("qr_access_tokens")
      .update({ access_count: (tokenRow.access_count ?? 0) + 1 })
      .eq("id", tokenRow.id);

    let recordsQuery = admin
      .from("medical_records")
      .select(
        "id, file_name, file_path, file_type, document_type, report_date, hospital_name, doctor_name, notes, created_at"
      )
      .eq("user_id", tokenRow.user_id)
      .order("created_at", { ascending: false });

    if (tokenRow.record_id) {
      recordsQuery = recordsQuery.eq("id", tokenRow.record_id);
    }

    const { data: records, error: recordsError } = await recordsQuery;
    if (recordsError) {
      return json({ ok: false, error: "Failed to load medical records" });
    }

    const recordsWithUrls = await Promise.all(
      (records ?? []).map(async (r) => {
        const { data: signed, error: signedError } = await admin.storage
          .from("medical-records")
          .createSignedUrl(r.file_path, 60 * 60);

        return {
          ...r,
          signed_url: signedError ? null : signed?.signedUrl ?? null,
        };
      })
    );

    return json({
      ok: true,
      ownerName,
      requiresPassword: false,
      records: recordsWithUrls,
    });
  } catch (err) {
    console.error("medical-access error", err);
    return json({ ok: false, error: "Something went wrong. Please try again." });
  }
});
