import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  FileText, Image as ImageIcon, Calendar, Building, User,
  Download, Trash2, QrCode, Eye, Filter, Search, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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

const DOCUMENT_TYPE_COLORS: Record<DocumentType, string> = {
  prescription: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  lab_report: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  imaging: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  discharge_summary: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  vaccination_record: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
  other: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
};

interface RecordTimelineProps {
  records: MedicalRecord[];
  onDelete: (recordId: string, filePath: string) => Promise<void>;
  onView: (record: MedicalRecord) => void;
  onGenerateQR: (record: MedicalRecord) => void;
  getFileUrl: (filePath: string) => Promise<string>;
}

const RecordTimeline: React.FC<RecordTimelineProps> = ({
  records,
  onDelete,
  onView,
  onGenerateQR,
  getFileUrl
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [deleteRecord, setDeleteRecord] = useState<MedicalRecord | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const filteredRecords = records.filter(record => {
    // Search filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery ||
      record.file_name.toLowerCase().includes(searchLower) ||
      record.hospital_name?.toLowerCase().includes(searchLower) ||
      record.doctor_name?.toLowerCase().includes(searchLower) ||
      record.notes?.toLowerCase().includes(searchLower) ||
      record.tags?.some(tag => tag.toLowerCase().includes(searchLower));

    // Type filter
    const matchesType = typeFilter === 'all' || record.document_type === typeFilter;

    // Date filter
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const recordDate = new Date(record.created_at);
      const now = new Date();
      switch (dateFilter) {
        case 'week':
          matchesDate = (now.getTime() - recordDate.getTime()) <= 7 * 24 * 60 * 60 * 1000;
          break;
        case 'month':
          matchesDate = (now.getTime() - recordDate.getTime()) <= 30 * 24 * 60 * 60 * 1000;
          break;
        case 'year':
          matchesDate = (now.getTime() - recordDate.getTime()) <= 365 * 24 * 60 * 60 * 1000;
          break;
      }
    }

    return matchesSearch && matchesType && matchesDate;
  });

  const handleDownload = async (record: MedicalRecord) => {
    try {
      const url = await getFileUrl(record.file_path);
      const link = document.createElement('a');
      link.href = url;
      link.download = record.file_name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Failed to download the file",
        variant: "destructive"
      });
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteRecord) return;
    setDeleting(true);
    try {
      await onDelete(deleteRecord.id, deleteRecord.file_path);
      toast({
        title: "Deleted",
        description: "Medical record deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "Failed to delete the record",
        variant: "destructive"
      });
    } finally {
      setDeleting(false);
      setDeleteRecord(null);
    }
  };

  // Group records by month/year
  const groupedRecords = filteredRecords.reduce((acc, record) => {
    const date = new Date(record.report_date || record.created_at);
    const key = format(date, 'MMMM yyyy');
    if (!acc[key]) acc[key] = [];
    acc[key].push(record);
    return acc;
  }, {} as Record<string, MedicalRecord[]>);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5" />
            Filter Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {Object.entries(DOCUMENT_TYPE_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      {Object.keys(groupedRecords).length === 0 ? (
        <Card className="p-8 text-center">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No records found</h3>
          <p className="text-muted-foreground">
            {records.length === 0
              ? "Upload your first medical record to get started"
              : "Try adjusting your search or filters"}
          </p>
        </Card>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedRecords).map(([month, monthRecords]) => (
            <div key={month}>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                {month}
              </h3>
              <div className="space-y-4 ml-6 border-l-2 border-muted pl-6">
                {monthRecords.map(record => (
                  <Card key={record.id} className="relative">
                    <div className="absolute -left-[2.1rem] top-6 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          {record.file_type === 'application/pdf' ? (
                            <FileText className="h-10 w-10 text-red-500 flex-shrink-0" />
                          ) : (
                            <ImageIcon className="h-10 w-10 text-blue-500 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-medium truncate">{record.file_name}</h4>
                              <Badge className={DOCUMENT_TYPE_COLORS[record.document_type]}>
                                {DOCUMENT_TYPE_LABELS[record.document_type]}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1 flex-wrap">
                              {record.report_date && (
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {format(new Date(record.report_date), 'MMM d, yyyy')}
                                </span>
                              )}
                              {record.hospital_name && (
                                <span className="flex items-center gap-1">
                                  <Building className="h-3 w-3" />
                                  {record.hospital_name}
                                </span>
                              )}
                              {record.doctor_name && (
                                <span className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  Dr. {record.doctor_name}
                                </span>
                              )}
                            </div>
                            {record.tags && record.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {record.tags.map(tag => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                            {record.notes && (
                              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                {record.notes}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onView(record)}
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDownload(record)}
                            title="Download"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onGenerateQR(record)}
                            title="Generate QR"
                          >
                            <QrCode className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteRecord(record)}
                            title="Delete"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteRecord} onOpenChange={() => setDeleteRecord(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Medical Record?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{deleteRecord?.file_name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RecordTimeline;
