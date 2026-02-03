import React, { useEffect, useState } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import ChatbotInterface from "../components/ChatbotInterface";
import { Button } from "../components/ui/button";
import { ChatSidebar } from "../components/chatbot/ChatSidebar";
import { WelcomeScreen } from "../components/chatbot/WelcomeScreen";
import { useChatHistory } from "../hooks/useChatHistory";
import { toast } from "@/hooks/use-toast";
import { Menu, ArrowLeft } from "lucide-react";

const ChatbotPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const ageGroup = location.state?.ageGroup as 'youth' | 'adult' | 'senior';
  
  if (!ageGroup) {
    return <Navigate to="/" replace />;
  }

  const { 
    currentSession, 
    currentSessionId,
    createNewSession, 
    loadSession, 
    addMessageToSession,
    renameSession,
    deleteSession,
    getConversationsForSidebar,
  } = useChatHistory(ageGroup);

  const conversations = getConversationsForSidebar();

  const handleNewChat = () => {
    createNewSession();
    setSidebarOpen(false);
  };

  const handleSelectConversation = (id: string) => {
    const session = loadSession(id);
    if (session) {
      toast({
        title: "Chat loaded",
        description: "Continuing your previous conversation"
      });
    }
    setSidebarOpen(false);
  };

  const handleStartWithSuggestion = (suggestion?: string) => {
    const session = createNewSession();
    if (suggestion && session) {
      // The message will be sent through the ChatbotInterface
      // We just need to ensure a session exists
    }
  };

  const getPageTitle = () => {
    switch (ageGroup) {
      case 'youth':
        return 'Youth Wellness Hub';
      case 'adult':
        return 'Adult Health Guide';
      case 'senior':
        return 'Senior Care Corner';
      default:
        return 'Health Assistant';
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <ChatSidebar
        conversations={conversations}
        activeConversationId={currentSessionId}
        onNewChat={handleNewChat}
        onSelectConversation={handleSelectConversation}
        onRenameConversation={renameSession}
        onDeleteConversation={deleteSession}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-blue-800">
              {getPageTitle()}
            </h1>
            {currentSession && currentSession.title !== 'New Chat' && (
              <p className="text-sm text-muted-foreground truncate">
                {currentSession.title}
              </p>
            )}
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-hidden">
          {currentSession ? (
            <div className="h-full">
              <ChatbotInterface 
                ageGroup={ageGroup}
                initialMessages={currentSession.messages}
                onMessageSend={(message) => {
                  addMessageToSession({
                    id: Date.now(),
                    text: message,
                    isUser: true
                  });
                }}
                onResponseReceived={(response) => {
                  addMessageToSession({
                    id: Date.now(),
                    text: response,
                    isUser: false
                  });
                }}
              />
            </div>
          ) : (
            <WelcomeScreen
              ageGroup={ageGroup}
              onStartChat={(suggestion) => {
                const session = createNewSession();
                // If there's a suggestion, we need to trigger the chat
                // This will be handled by the ChatbotInterface when it mounts
              }}
            />
          )}
        </div>

        {/* Footer Disclaimer */}
        <div className="bg-gray-100 border-t border-gray-200 px-4 py-2 text-center">
          <p className="text-xs text-gray-500">
            This chatbot provides general guidance only and is not a substitute for professional medical advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
