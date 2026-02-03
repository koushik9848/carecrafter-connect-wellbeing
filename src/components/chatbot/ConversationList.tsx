import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { MessageSquare, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { format, isToday, isYesterday, subDays, isAfter } from 'date-fns';
import type { Conversation } from './ChatSidebar';

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onRename: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
}

function groupConversations(conversations: Conversation[]) {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterdayStart = subDays(todayStart, 1);
  const last7DaysStart = subDays(todayStart, 7);
  const last30DaysStart = subDays(todayStart, 30);

  const groups: Record<string, Conversation[]> = {
    today: [],
    yesterday: [],
    last7Days: [],
    last30Days: [],
    older: [],
  };

  conversations.forEach((conv) => {
    const updatedAt = new Date(conv.updatedAt);
    if (isToday(updatedAt)) {
      groups.today.push(conv);
    } else if (isYesterday(updatedAt)) {
      groups.yesterday.push(conv);
    } else if (isAfter(updatedAt, last7DaysStart)) {
      groups.last7Days.push(conv);
    } else if (isAfter(updatedAt, last30DaysStart)) {
      groups.last30Days.push(conv);
    } else {
      groups.older.push(conv);
    }
  });

  return groups;
}

export function ConversationList({
  conversations,
  activeId,
  onSelect,
  onRename,
  onDelete,
}: ConversationListProps) {
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [newTitle, setNewTitle] = useState('');

  const groups = groupConversations(conversations);

  const handleRenameClick = (conv: Conversation) => {
    setSelectedConv(conv);
    setNewTitle(conv.title);
    setRenameDialogOpen(true);
  };

  const handleDeleteClick = (conv: Conversation) => {
    setSelectedConv(conv);
    setDeleteDialogOpen(true);
  };

  const handleRenameConfirm = () => {
    if (selectedConv && newTitle.trim()) {
      onRename(selectedConv.id, newTitle.trim());
      setRenameDialogOpen(false);
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedConv) {
      onDelete(selectedConv.id);
      setDeleteDialogOpen(false);
    }
  };

  const renderGroup = (title: string, items: Conversation[]) => {
    if (items.length === 0) return null;

    return (
      <div key={title} className="py-2">
        <h3 className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </h3>
        <div className="space-y-1">
          {items.map((conv) => (
            <div
              key={conv.id}
              className={`
                group flex items-center justify-between px-4 py-3 cursor-pointer
                hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
                ${activeId === conv.id ? 'bg-gray-100 dark:bg-gray-800 border-l-3 border-blue-600' : ''}
              `}
              onClick={() => onSelect(conv.id)}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <MessageSquare className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                <span className="text-sm truncate">{conv.title}</span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    handleRenameClick(conv);
                  }}>
                    <Edit2 className="h-4 w-4 mr-2" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(conv);
                    }}
                    className="text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div>
        {renderGroup('Today', groups.today)}
        {renderGroup('Yesterday', groups.yesterday)}
        {renderGroup('Last 7 Days', groups.last7Days)}
        {renderGroup('Last 30 Days', groups.last30Days)}
        {renderGroup('Older', groups.older)}
      </div>

      {/* Rename Dialog */}
      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Conversation</DialogTitle>
          </DialogHeader>
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter new title"
            onKeyDown={(e) => e.key === 'Enter' && handleRenameConfirm()}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRenameConfirm}>Rename</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Conversation?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{selectedConv?.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
