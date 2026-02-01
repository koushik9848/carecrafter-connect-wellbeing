import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { FileText, Image as ImageIcon, Lock, AlertTriangle, Calendar, Building, User, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Stethoscope from '@/components/Stethoscope';

interface AccessRecord {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  document_type: string;
  report_date: string | null;
  hospital_name: string | null;
  doctor_name: string | null;
  notes: string | null;
  created_at: string;
}

const DOCUMENT_TYPE_LABELS: Record<string, string> = {
  prescription: 'Prescription',
  lab_report: 'Lab Report',
  imaging: 'Imaging',
  discharge_summary: 'Discharge Summary',
  vaccination_record: 'Vaccination',
  other: 'Other'
};

const MedicalAccessPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [records, setRecords] = useState<AccessRecord[]>([]);
  const [ownerName, setOwnerName] = useState<string>('');
  const [requiresPassword, setRequiresPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AccessRecord | null>(null);
  const [fileUrl, setFileUrl] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (token) {
      validateToken();
    }
  }, [token]);

  const validateToken = async () => {
    try {
      // Get token info
      const { data: tokenData, error: tokenError } = await supabase
        .from('qr_access_tokens')
        .select('*, profiles:user_id(full_name)')
        .eq('token', token)
        .maybeSingle();

      if (tokenError || !tokenData) {
        setError('Invalid or expired access link');
        setLoading(false);
        return;
      }

      if (tokenData.is_revoked) {
        setError('This access link has been revoked');
        setLoading(false);
        return;
      }

      if (tokenData.expires_at && new Date(tokenData.expires_at) < new Date()) {
        setError('This access link has expired');
        setLoading(false);
        return;
      }

      setOwnerName((tokenData as any).profiles?.full_name || 'User');

      if (tokenData.password_hash) {
        setRequiresPassword(true);
        setLoading(false);
        return;
      }

      await loadRecords(tokenData);
    } catch (err) {
      console.error('Error validating token:', err);
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: tokenData, error: tokenError } = await supabase
        .from('qr_access_tokens')
        .select('*')
        .eq('token', token)
        .single();

      if (tokenError || !tokenData) {
        setError('Invalid access link');
        setLoading(false);
        return;
      }

      // Simple password check (base64 encoded for demo)
      if (tokenData.password_hash !== btoa(password)) {
        toast({
          title: "Incorrect password",
          description: "Please try again",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      setAuthenticated(true);
      await loadRecords(tokenData);
    } catch (err) {
      setError('Something went wrong');
      setLoading(false);
    }
  };

  const loadRecords = async (tokenData: any) => {
    try {
      // Log the access
      await supabase.from('qr_access_logs').insert({
        token_id: tokenData.id,
        user_agent: navigator.userAgent
      });

      // Update access count
      await supabase
        .from('qr_access_tokens')
        .update({ access_count: tokenData.access_count + 1 })
        .eq('id', tokenData.id);

      // Fetch records
      let query = supabase
        .from('medical_records')
        .select('*')
        .eq('user_id', tokenData.user_id)
        .order('created_at', { ascending: false });

      if (tokenData.record_id) {
        query = query.eq('id', tokenData.record_id);
      }

      const { data: recordsData, error: recordsError } = await query;

      if (recordsError) throw recordsError;

      setRecords(recordsData || []);
      setLoading(false);
    } catch (err) {
      console.error('Error loading records:', err);
      setError('Failed to load medical records');
      setLoading(false);
    }
  };

  const viewRecord = async (record: AccessRecord) => {
    try {
      const { data, error } = await supabase.storage
        .from('medical-records')
        .createSignedUrl(record.file_path, 3600);

      if (error) throw error;
      setFileUrl(data.signedUrl);
      setSelectedRecord(record);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to load file",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading medical records...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Access Denied</h2>
            <p className="text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (requiresPassword && !authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <Lock className="h-12 w-12 text-primary mx-auto mb-2" />
            <CardTitle>Password Required</CardTitle>
            <CardDescription>
              Enter the password to access {ownerName}'s medical records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Access Records
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
          <Stethoscope className="h-8 w-8 text-blue-900" />
          <div>
            <h1 className="text-xl font-bold text-blue-900">CareCrafter</h1>
            <p className="text-sm text-muted-foreground">
              Viewing {ownerName}'s Medical Records
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {selectedRecord ? (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {selectedRecord.file_type === 'application/pdf' ? (
                    <FileText className="h-5 w-5 text-red-500" />
                  ) : (
                    <ImageIcon className="h-5 w-5 text-blue-500" />
                  )}
                  {selectedRecord.file_name}
                </CardTitle>
                <Button variant="outline" onClick={() => setSelectedRecord(null)}>
                  Back to List
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 mb-4 text-sm">
                <Badge variant="outline">
                  {DOCUMENT_TYPE_LABELS[selectedRecord.document_type] || 'Other'}
                </Badge>
                {selectedRecord.report_date && (
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(selectedRecord.report_date), 'MMM d, yyyy')}
                  </span>
                )}
                {selectedRecord.hospital_name && (
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Building className="h-4 w-4" />
                    {selectedRecord.hospital_name}
                  </span>
                )}
                {selectedRecord.doctor_name && (
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <User className="h-4 w-4" />
                    Dr. {selectedRecord.doctor_name}
                  </span>
                )}
              </div>

              {selectedRecord.notes && (
                <div className="mb-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm">{selectedRecord.notes}</p>
                </div>
              )}

              <div className="bg-muted rounded-lg overflow-hidden">
                {selectedRecord.file_type === 'application/pdf' ? (
                  <iframe
                    src={fileUrl}
                    className="w-full h-[600px]"
                    title={selectedRecord.file_name}
                  />
                ) : (
                  <img
                    src={fileUrl}
                    alt={selectedRecord.file_name}
                    className="max-w-full mx-auto"
                  />
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6">
              {records.length} Medical Record{records.length !== 1 ? 's' : ''}
            </h2>

            <div className="grid gap-4">
              {records.map(record => (
                <Card key={record.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {record.file_type === 'application/pdf' ? (
                          <FileText className="h-10 w-10 text-red-500" />
                        ) : (
                          <ImageIcon className="h-10 w-10 text-blue-500" />
                        )}
                        <div>
                          <h3 className="font-medium">{record.file_name}</h3>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Badge variant="outline">
                              {DOCUMENT_TYPE_LABELS[record.document_type] || 'Other'}
                            </Badge>
                            {record.report_date && (
                              <span>{format(new Date(record.report_date), 'MMM d, yyyy')}</span>
                            )}
                            {record.hospital_name && (
                              <span>{record.hospital_name}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button onClick={() => viewRecord(record)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 py-6 text-center text-sm text-muted-foreground">
        <p>Shared via CareCrafter Secure Medical Records</p>
      </footer>
    </div>
  );
};

export default MedicalAccessPage;
