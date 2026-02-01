import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type DocumentType = 'prescription' | 'lab_report' | 'imaging' | 'discharge_summary' | 'vaccination_record' | 'other';

export interface MedicalRecord {
  id: string;
  user_id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  document_type: DocumentType;
  report_date: string | null;
  hospital_name: string | null;
  doctor_name: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  tags?: string[];
}

export interface RecordTag {
  id: string;
  record_id: string;
  tag: string;
  created_at: string;
}

export interface QRAccessToken {
  id: string;
  user_id: string;
  record_id: string | null;
  token: string;
  password_hash: string | null;
  expires_at: string | null;
  access_count: number;
  is_revoked: boolean;
  created_at: string;
}

export interface QRAccessLog {
  id: string;
  token_id: string;
  accessed_at: string;
  ip_address: string | null;
  user_agent: string | null;
}

export const useMedicalRecords = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [qrTokens, setQrTokens] = useState<QRAccessToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchRecords();
        fetchQRTokens();
      } else {
        setRecords([]);
        setQrTokens([]);
        setLoading(false);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchRecords();
        fetchQRTokens();
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const { data: recordsData, error: recordsError } = await supabase
        .from('medical_records')
        .select('*')
        .order('created_at', { ascending: false });

      if (recordsError) throw recordsError;

      const { data: tagsData, error: tagsError } = await supabase
        .from('record_tags')
        .select('*');

      if (tagsError) throw tagsError;

      const recordsWithTags = (recordsData || []).map(record => ({
        ...record,
        tags: (tagsData || [])
          .filter(tag => tag.record_id === record.id)
          .map(tag => tag.tag)
      }));

      setRecords(recordsWithTags);
    } catch (error: any) {
      console.error('Error fetching records:', error);
      toast({
        title: "Error",
        description: "Failed to fetch medical records",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchQRTokens = async () => {
    try {
      const { data, error } = await supabase
        .from('qr_access_tokens')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQrTokens(data || []);
    } catch (error: any) {
      console.error('Error fetching QR tokens:', error);
    }
  };

  const uploadRecord = async (
    file: File,
    metadata: {
      document_type: DocumentType;
      report_date?: string;
      hospital_name?: string;
      doctor_name?: string;
      notes?: string;
      tags?: string[];
    }
  ) => {
    if (!user) throw new Error('User not authenticated');

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('medical-records')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: recordData, error: recordError } = await supabase
      .from('medical_records')
      .insert({
        user_id: user.id,
        file_name: file.name,
        file_path: fileName,
        file_type: file.type,
        file_size: file.size,
        document_type: metadata.document_type,
        report_date: metadata.report_date || null,
        hospital_name: metadata.hospital_name || null,
        doctor_name: metadata.doctor_name || null,
        notes: metadata.notes || null
      })
      .select()
      .single();

    if (recordError) throw recordError;

    if (metadata.tags && metadata.tags.length > 0) {
      const tagsToInsert = metadata.tags.map(tag => ({
        record_id: recordData.id,
        tag
      }));

      const { error: tagsError } = await supabase
        .from('record_tags')
        .insert(tagsToInsert);

      if (tagsError) console.error('Error inserting tags:', tagsError);
    }

    await fetchRecords();
    return recordData;
  };

  const deleteRecord = async (recordId: string, filePath: string) => {
    const { error: storageError } = await supabase.storage
      .from('medical-records')
      .remove([filePath]);

    if (storageError) console.error('Storage delete error:', storageError);

    const { error: recordError } = await supabase
      .from('medical_records')
      .delete()
      .eq('id', recordId);

    if (recordError) throw recordError;

    await fetchRecords();
  };

  const getFileUrl = async (filePath: string) => {
    const { data, error } = await supabase.storage
      .from('medical-records')
      .createSignedUrl(filePath, 3600);

    if (error) throw error;
    return data.signedUrl;
  };

  const generateQRToken = async (
    recordId: string | null,
    expiresIn: 'hour' | 'day' | 'week' | 'never',
    password?: string
  ) => {
    if (!user) throw new Error('User not authenticated');

    const token = crypto.randomUUID();
    
    let expiresAt: string | null = null;
    if (expiresIn !== 'never') {
      const now = new Date();
      switch (expiresIn) {
        case 'hour':
          now.setHours(now.getHours() + 1);
          break;
        case 'day':
          now.setDate(now.getDate() + 1);
          break;
        case 'week':
          now.setDate(now.getDate() + 7);
          break;
      }
      expiresAt = now.toISOString();
    }

    const { data, error } = await supabase
      .from('qr_access_tokens')
      .insert({
        user_id: user.id,
        record_id: recordId,
        token,
        password_hash: password ? btoa(password) : null,
        expires_at: expiresAt
      })
      .select()
      .single();

    if (error) throw error;

    await fetchQRTokens();
    return data;
  };

  const revokeQRToken = async (tokenId: string) => {
    const { error } = await supabase
      .from('qr_access_tokens')
      .update({ is_revoked: true })
      .eq('id', tokenId);

    if (error) throw error;
    await fetchQRTokens();
  };

  const getAccessLogs = async (tokenId: string) => {
    const { data, error } = await supabase
      .from('qr_access_logs')
      .select('*')
      .eq('token_id', tokenId)
      .order('accessed_at', { ascending: false });

    if (error) throw error;
    return data || [];
  };

  return {
    records,
    qrTokens,
    loading,
    user,
    uploadRecord,
    deleteRecord,
    getFileUrl,
    generateQRToken,
    revokeQRToken,
    getAccessLogs,
    fetchRecords
  };
};
