import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, ChevronLeft, MessageSquare, X } from 'lucide-react';
import { ConversationList } from './ConversationList';

export interface Conversation {
  id: string;
  title: string;
  updatedAt: Date;
  messageCount: number;
}

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onNewChat: () => void;
  onSelectConversation: (id: string) => void;
  onRenameConversation: (id: string, newTitle: string) => void;
  onDeleteConversation: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function ChatSidebar({
  conversations,
  activeConversationId,
  onNewChat,
  onSelectConversation,
  onRenameConversation,
  onDeleteConversation,
  isOpen,
  onClose,
}: ChatSidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto
          w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
          flex flex-col h-full
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header with New Chat button */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <span className="font-semibold">Chat History</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Button
            onClick={() => {
              onNewChat();
              onClose();
            }}
            className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            New Chat
          </Button>
        </div>

        {/* Conversation List */}
        <ScrollArea className="flex-1">
          {conversations.length > 0 ? (
            <ConversationList
              conversations={conversations}
              activeId={activeConversationId}
              onSelect={(id) => {
                onSelectConversation(id);
                onClose();
              }}
              onRename={onRenameConversation}
              onDelete={onDeleteConversation}
            />
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No conversations yet</p>
              <p className="text-xs mt-1">Start a new chat to begin</p>
            </div>
          )}
        </ScrollArea>

        {/* Collapse button (mobile/tablet) */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 lg:hidden">
          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full gap-2 justify-start"
          >
            <ChevronLeft className="h-4 w-4" />
            Collapse
          </Button>
        </div>
      </div>
    </>
  );
}
