-- Create enum for document types
CREATE TYPE public.document_type AS ENUM (
  'prescription',
  'lab_report',
  'imaging',
  'discharge_summary',
  'vaccination_record',
  'other'
);

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create medical_records table
CREATE TABLE public.medical_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  document_type public.document_type NOT NULL DEFAULT 'other',
  report_date DATE,
  hospital_name TEXT,
  doctor_name TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tags table
CREATE TABLE public.record_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  record_id UUID NOT NULL REFERENCES public.medical_records(id) ON DELETE CASCADE,
  tag TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create QR access tokens table
CREATE TABLE public.qr_access_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  record_id UUID REFERENCES public.medical_records(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  password_hash TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  access_count INTEGER NOT NULL DEFAULT 0,
  is_revoked BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create QR access logs table
CREATE TABLE public.qr_access_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token_id UUID NOT NULL REFERENCES public.qr_access_tokens(id) ON DELETE CASCADE,
  accessed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.record_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qr_access_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qr_access_logs ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Medical records policies
CREATE POLICY "Users can view their own medical records"
  ON public.medical_records FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own medical records"
  ON public.medical_records FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own medical records"
  ON public.medical_records FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own medical records"
  ON public.medical_records FOR DELETE
  USING (auth.uid() = user_id);

-- Record tags policies
CREATE POLICY "Users can view tags on their records"
  ON public.record_tags FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.medical_records 
      WHERE id = record_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can add tags to their records"
  ON public.record_tags FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.medical_records 
      WHERE id = record_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete tags from their records"
  ON public.record_tags FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.medical_records 
      WHERE id = record_id AND user_id = auth.uid()
    )
  );

-- QR access tokens policies
CREATE POLICY "Users can view their own QR tokens"
  ON public.qr_access_tokens FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create QR tokens for their records"
  ON public.qr_access_tokens FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their QR tokens"
  ON public.qr_access_tokens FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their QR tokens"
  ON public.qr_access_tokens FOR DELETE
  USING (auth.uid() = user_id);

-- QR access logs policies (users can view logs for their tokens)
CREATE POLICY "Users can view access logs for their tokens"
  ON public.qr_access_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.qr_access_tokens 
      WHERE id = token_id AND user_id = auth.uid()
    )
  );

-- Create storage bucket for medical records
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'medical-records',
  'medical-records',
  false,
  10485760, -- 10MB limit
  ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
);

-- Storage policies for medical records bucket
CREATE POLICY "Users can upload their own medical records"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'medical-records' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own medical records"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'medical-records' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own medical records"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'medical-records' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_medical_records_updated_at
  BEFORE UPDATE ON public.medical_records
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();