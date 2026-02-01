import React, { useState } from 'react';
import { FileText, Plus, QrCode, LogOut, User } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RecordUploadForm from '@/components/medical-records/RecordUploadForm';
import RecordTimeline from '@/components/medical-records/RecordTimeline';
import QRCodeGenerator from '@/components/medical-records/QRCodeGenerator';
import RecordViewer from '@/components/medical-records/RecordViewer';
import AuthModal from '@/components/AuthModal';
import { useMedicalRecords, MedicalRecord } from '@/hooks/useMedicalRecords';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const MedicalRecordsPage: React.FC = () => {
  const {
    records,
    qrTokens,
    loading,
    user,
    uploadRecord,
    deleteRecord,
    getFileUrl,
    generateQRToken,
    revokeQRToken,
    getAccessLogs
  } = useMedicalRecords();

  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [qrRecord, setQrRecord] = useState<MedicalRecord | null>(null);
  const [showAllRecordsQR, setShowAllRecordsQR] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const { toast } = useToast();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully"
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoginOpen(false);
    setAuthModalOpen(true);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header
          currentPage="medical-records"
          setIsLoginOpen={setIsLoginOpen}
          setIsSignupOpen={setIsSignupOpen}
          isLoginOpen={isLoginOpen}
          isSignupOpen={isSignupOpen}
          handleLogin={handleLogin}
        />
        
        <main className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <FileText className="h-20 w-20 mx-auto text-blue-600 mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Secure Medical Records
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Store, organize, and share your medical documents securely with QR code access control.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" onClick={() => setAuthModalOpen(true)}>
                Get Started
              </Button>
              <Button size="lg" variant="outline" onClick={() => setAuthModalOpen(true)}>
                Login
              </Button>
            </div>
          </div>
        </main>

        <AuthModal
          open={authModalOpen}
          onOpenChange={setAuthModalOpen}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header
        currentPage="medical-records"
        onLogout={handleLogout}
        user={{
          name: user.email || 'User',
          email: user.email || ''
        }}
        setIsLoginOpen={setIsLoginOpen}
        setIsSignupOpen={setIsSignupOpen}
        isLoginOpen={isLoginOpen}
        isSignupOpen={isSignupOpen}
        handleLogin={handleLogin}
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" />
              Medical Records
            </h1>
            <p className="text-gray-600 mt-1">
              {records.length} document{records.length !== 1 ? 's' : ''} stored securely
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowAllRecordsQR(true)}
              disabled={records.length === 0}
            >
              <QrCode className="h-4 w-4 mr-2" />
              Share All Records
            </Button>
            <Button onClick={() => setShowUploadForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Upload Record
            </Button>
          </div>
        </div>

        {/* Main Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : showUploadForm ? (
          <RecordUploadForm
            onUpload={uploadRecord}
            onCancel={() => setShowUploadForm(false)}
          />
        ) : showAllRecordsQR ? (
          <QRCodeGenerator
            isAllRecords
            tokens={qrTokens}
            onGenerate={generateQRToken}
            onRevoke={revokeQRToken}
            getAccessLogs={getAccessLogs}
            onClose={() => setShowAllRecordsQR(false)}
          />
        ) : qrRecord ? (
          <QRCodeGenerator
            record={qrRecord}
            tokens={qrTokens}
            onGenerate={generateQRToken}
            onRevoke={revokeQRToken}
            getAccessLogs={getAccessLogs}
            onClose={() => setQrRecord(null)}
          />
        ) : (
          <RecordTimeline
            records={records}
            onDelete={deleteRecord}
            onView={setSelectedRecord}
            onGenerateQR={setQrRecord}
            getFileUrl={getFileUrl}
          />
        )}

        {/* Record Viewer Modal */}
        <RecordViewer
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
          getFileUrl={getFileUrl}
        />
      </main>
    </div>
  );
};

export default MedicalRecordsPage;
