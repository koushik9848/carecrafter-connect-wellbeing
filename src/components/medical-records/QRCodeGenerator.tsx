import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { format } from 'date-fns';
import {
  QrCode, Download, Copy, Clock, Lock, Eye, EyeOff,
  Share2, RefreshCw, X, Shield, History
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MedicalRecord, QRAccessToken, QRAccessLog } from '@/hooks/useMedicalRecords';
import { useToast } from '@/hooks/use-toast';

interface QRCodeGeneratorProps {
  record?: MedicalRecord | null;
  isAllRecords?: boolean;
  tokens: QRAccessToken[];
  onGenerate: (recordId: string | null, expiresIn: 'hour' | 'day' | 'week' | 'never', password?: string) => Promise<QRAccessToken>;
  onRevoke: (tokenId: string) => Promise<void>;
  getAccessLogs: (tokenId: string) => Promise<QRAccessLog[]>;
  onClose?: () => void;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  record,
  isAllRecords = false,
  tokens,
  onGenerate,
  onRevoke,
  getAccessLogs,
  onClose
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [expiresIn, setExpiresIn] = useState<'hour' | 'day' | 'week' | 'never'>('day');
  const [usePassword, setUsePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [selectedToken, setSelectedToken] = useState<QRAccessToken | null>(null);
  const [accessLogs, setAccessLogs] = useState<QRAccessLog[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const { toast } = useToast();

  // Filter tokens for this record or all records
  const relevantTokens = tokens.filter(token => 
    isAllRecords ? token.record_id === null : token.record_id === record?.id
  );

  const generateQRImage = async (token: string) => {
    const accessUrl = `${window.location.origin}/medical-access/${token}`;
    const dataUrl = await QRCode.toDataURL(accessUrl, {
      width: 300,
      margin: 2,
      color: {
        dark: '#1a365d',
        light: '#ffffff'
      }
    });
    setQrDataUrl(dataUrl);
  };

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const token = await onGenerate(
        isAllRecords ? null : record?.id || null,
        expiresIn,
        usePassword ? password : undefined
      );
      await generateQRImage(token.token);
      toast({
        title: "QR Code Generated",
        description: "Your secure QR code is ready to share"
      });
    } catch (error: any) {
      toast({
        title: "Generation failed",
        description: error.message || "Failed to generate QR code",
        variant: "destructive"
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `medical-qr-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLink = async (token: string) => {
    const accessUrl = `${window.location.origin}/medical-access/${token}`;
    await navigator.clipboard.writeText(accessUrl);
    toast({
      title: "Copied",
      description: "Link copied to clipboard"
    });
  };

  const handleViewLogs = async (token: QRAccessToken) => {
    setSelectedToken(token);
    setLoadingLogs(true);
    try {
      const logs = await getAccessLogs(token.id);
      setAccessLogs(logs);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch access logs",
        variant: "destructive"
      });
    } finally {
      setLoadingLogs(false);
    }
  };

  const handleRevoke = async (tokenId: string) => {
    try {
      await onRevoke(tokenId);
      toast({
        title: "Revoked",
        description: "QR code access has been revoked"
      });
      setSelectedToken(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to revoke access",
        variant: "destructive"
      });
    }
  };

  const getExpirationLabel = (token: QRAccessToken) => {
    if (!token.expires_at) return 'Never expires';
    const expiresAt = new Date(token.expires_at);
    if (expiresAt < new Date()) return 'Expired';
    return `Expires ${format(expiresAt, 'MMM d, yyyy h:mm a')}`;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              {isAllRecords ? 'Share All Records' : `Share: ${record?.file_name}`}
            </CardTitle>
            <CardDescription>
              Generate a secure QR code to share your medical records
            </CardDescription>
          </div>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="generate" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generate">Generate New</TabsTrigger>
            <TabsTrigger value="manage">
              Manage ({relevantTokens.filter(t => !t.is_revoked).length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-6">
            {/* Expiration */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Access Duration
              </Label>
              <Select value={expiresIn} onValueChange={(v: any) => setExpiresIn(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hour">1 Hour</SelectItem>
                  <SelectItem value="day">1 Day</SelectItem>
                  <SelectItem value="week">1 Week</SelectItem>
                  <SelectItem value="never">Never Expires</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Password Protection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password Protection
                </Label>
                <Switch checked={usePassword} onCheckedChange={setUsePassword} />
              </div>
              {usePassword && (
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>

            {/* Generate Button */}
            <Button
              className="w-full"
              onClick={handleGenerate}
              disabled={generating || (usePassword && !password)}
            >
              {generating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <QrCode className="h-4 w-4 mr-2" />
                  Generate QR Code
                </>
              )}
            </Button>

            {/* QR Code Display */}
            {qrDataUrl && (
              <div className="space-y-4">
                <div className="flex justify-center p-4 bg-white rounded-lg">
                  <img src={qrDataUrl} alt="QR Code" className="w-[200px] h-[200px]" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={handleDownloadQR}>
                    <Download className="h-4 w-4 mr-2" />
                    Download PNG
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => {
                    const token = relevantTokens[0]?.token;
                    if (token) handleCopyLink(token);
                  }}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="manage" className="space-y-4">
            {relevantTokens.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Share2 className="h-10 w-10 mx-auto mb-3 opacity-50" />
                <p>No QR codes generated yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {relevantTokens.map(token => (
                  <Card key={token.id} className={token.is_revoked ? 'opacity-50' : ''}>
                    <CardContent className="py-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge variant={token.is_revoked ? 'destructive' : 'default'}>
                              {token.is_revoked ? 'Revoked' : 'Active'}
                            </Badge>
                            {token.password_hash && (
                              <Badge variant="outline">
                                <Lock className="h-3 w-3 mr-1" />
                                Protected
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {getExpirationLabel(token)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Accessed {token.access_count} times
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCopyLink(token.token)}
                            disabled={token.is_revoked}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewLogs(token)}
                          >
                            <History className="h-4 w-4" />
                          </Button>
                          {!token.is_revoked && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRevoke(token.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Shield className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Access Logs Dialog */}
      <Dialog open={!!selectedToken} onOpenChange={() => setSelectedToken(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Access Logs</DialogTitle>
            <DialogDescription>
              View who has accessed this QR code
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[300px] overflow-y-auto">
            {loadingLogs ? (
              <div className="text-center py-4">Loading...</div>
            ) : accessLogs.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                No access logs yet
              </div>
            ) : (
              <div className="space-y-2">
                {accessLogs.map(log => (
                  <div key={log.id} className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium">
                      {format(new Date(log.accessed_at), 'MMM d, yyyy h:mm:ss a')}
                    </p>
                    {log.user_agent && (
                      <p className="text-xs text-muted-foreground truncate">
                        {log.user_agent}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default QRCodeGenerator;
