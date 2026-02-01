import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { FileText, Image as ImageIcon, X, Download, Calendar, Building, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MedicalRecord, DocumentType } from '@/hooks/useMedicalRecords';
import { useToast } from '@/hooks/use-toast';

const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  prescription: 'Prescription',
  lab_report: 'Lab Report',
  imaging: 'Imaging',
  discharge_summary: 'Discharge Summary',
  vaccination_record: 'Vaccination',
  other: 'Other'
};

interface RecordViewerProps {
  record: MedicalRecord | null;
  onClose: () => void;
  getFileUrl: (filePath: string) => Promise<string>;
}

const RecordViewer: React.FC<RecordViewerProps> = ({ record, onClose, getFileUrl }) => {
  const [fileUrl, setFileUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (record) {
      loadFile();
    }
  }, [record]);

  const loadFile = async () => {
    if (!record) return;
    setLoading(true);
    try {
      const url = await getFileUrl(record.file_path);
      setFileUrl(url);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load the file",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!fileUrl || !record) return;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = record.file_name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!record) return null;

  const isPdf = record.file_type === 'application/pdf';

  return (
    <Dialog open={!!record} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isPdf ? (
              <FileText className="h-5 w-5 text-red-500" />
            ) : (
              <ImageIcon className="h-5 w-5 text-blue-500" />
            )}
            {record.file_name}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          {/* Metadata */}
          <div className="flex flex-wrap gap-4 mb-4 text-sm">
            <Badge variant="outline">
              {DOCUMENT_TYPE_LABELS[record.document_type]}
            </Badge>
            {record.report_date && (
              <span className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {format(new Date(record.report_date), 'MMM d, yyyy')}
              </span>
            )}
            {record.hospital_name && (
              <span className="flex items-center gap-1 text-muted-foreground">
                <Building className="h-4 w-4" />
                {record.hospital_name}
              </span>
            )}
            {record.doctor_name && (
              <span className="flex items-center gap-1 text-muted-foreground">
                <User className="h-4 w-4" />
                Dr. {record.doctor_name}
              </span>
            )}
          </div>

          {/* Tags */}
          {record.tags && record.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              <Tag className="h-4 w-4 text-muted-foreground mr-1" />
              {record.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Notes */}
          {record.notes && (
            <div className="mb-4 p-3 bg-muted rounded-lg">
              <p className="text-sm">{record.notes}</p>
            </div>
          )}

          {/* File Preview */}
          <div className="bg-muted rounded-lg overflow-hidden min-h-[400px] flex items-center justify-center">
            {loading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-muted-foreground">Loading...</p>
              </div>
            ) : isPdf ? (
              <iframe
                src={fileUrl}
                className="w-full h-[500px]"
                title={record.file_name}
              />
            ) : (
              <img
                src={fileUrl}
                alt={record.file_name}
                className="max-w-full max-h-[500px] object-contain"
              />
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Close
          </Button>
          <Button onClick={handleDownload} disabled={!fileUrl}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecordViewer;
