import { useState, useEffect, useCallback } from 'react';

interface ChatMessage {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  ageGroup: 'youth' | 'adult' | 'senior';
  messages: ChatMessage[];
  startTime: Date;
  updatedAt: Date;
}

const STORAGE_KEY = 'chatSessions';

function generateTitle(firstMessage: string): string {
  let title = firstMessage.substring(0, 50).trim();
  title = title.replace(/[?\.]+$/, '');
  if (firstMessage.length > 50) {
    title += '...';
  }
  title = title.charAt(0).toUpperCase() + title.slice(1);
  return title || 'New Chat';
}

export const useChatHistory = (ageGroup: 'youth' | 'adult' | 'senior') => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);

  // Load chat history from localStorage
  useEffect(() => {
    const storedSessions = localStorage.getItem(STORAGE_KEY);
    if (storedSessions) {
      const parsedSessions = JSON.parse(storedSessions, (key, value) => {
        if (key === 'startTime' || key === 'timestamp' || key === 'updatedAt') {
          return new Date(value);
        }
        return value;
      });
      // Filter by age group and sort by updatedAt
      const filteredSessions = parsedSessions
        .filter((s: ChatSession) => s.ageGroup === ageGroup)
        .sort((a: ChatSession, b: ChatSession) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      setSessions(filteredSessions);
    }
  }, [ageGroup]);

  const saveToStorage = useCallback((updatedSessions: ChatSession[]) => {
    // Get all sessions (including other age groups)
    const storedSessions = localStorage.getItem(STORAGE_KEY);
    let allSessions: ChatSession[] = [];
    if (storedSessions) {
      allSessions = JSON.parse(storedSessions, (key, value) => {
        if (key === 'startTime' || key === 'timestamp' || key === 'updatedAt') {
          return new Date(value);
        }
        return value;
      });
    }
    // Remove sessions for current age group
    allSessions = allSessions.filter((s: ChatSession) => s.ageGroup !== ageGroup);
    // Add updated sessions
    allSessions = [...allSessions, ...updatedSessions];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allSessions));
  }, [ageGroup]);

  const createNewSession = useCallback(() => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Chat',
      ageGroup,
      messages: [],
      startTime: new Date(),
      updatedAt: new Date(),
    };
    setSessions(prev => {
      const updatedSessions = [newSession, ...prev];
      saveToStorage(updatedSessions);
      return updatedSessions;
    });
    setCurrentSessionId(newSession.id);
    setCurrentSession(newSession);
    return newSession;
  }, [ageGroup, saveToStorage]);

  const loadSession = useCallback((sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSessionId(sessionId);
      setCurrentSession(session);
      return session;
    }
    return null;
  }, [sessions]);

  const addMessageToSession = useCallback((message: Omit<ChatMessage, 'timestamp'>) => {
    if (!currentSessionId) return;

    setSessions(prev => {
      const updatedSessions = prev.map(session => {
        if (session.id === currentSessionId) {
          const newMessage = { ...message, timestamp: new Date() };
          const updatedMessages = [...session.messages, newMessage];
          
          // Generate title from first user message
          let title = session.title;
          if (title === 'New Chat' && message.isUser && session.messages.length === 0) {
            title = generateTitle(message.text);
          }
          
          const updatedSession = {
            ...session,
            title,
            messages: updatedMessages,
            updatedAt: new Date(),
          };
          setCurrentSession(updatedSession);
          return updatedSession;
        }
        return session;
      });
      
      // Re-sort by updatedAt
      updatedSessions.sort((a, b) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      
      saveToStorage(updatedSessions);
      return updatedSessions;
    });
  }, [currentSessionId, saveToStorage]);

  const renameSession = useCallback((sessionId: string, newTitle: string) => {
    setSessions(prev => {
      const updatedSessions = prev.map(session => {
        if (session.id === sessionId) {
          const updatedSession = { ...session, title: newTitle };
          if (session.id === currentSessionId) {
            setCurrentSession(updatedSession);
          }
          return updatedSession;
        }
        return session;
      });
      saveToStorage(updatedSessions);
      return updatedSessions;
    });
  }, [currentSessionId, saveToStorage]);

  const deleteSession = useCallback((sessionId: string) => {
    setSessions(prev => {
      const updatedSessions = prev.filter(session => session.id !== sessionId);
      saveToStorage(updatedSessions);
      
      // If deleting current session, clear it
      if (sessionId === currentSessionId) {
        setCurrentSessionId('');
        setCurrentSession(null);
      }
      
      return updatedSessions;
    });
  }, [currentSessionId, saveToStorage]);

  const getConversationsForSidebar = useCallback(() => {
    return sessions.map(s => ({
      id: s.id,
      title: s.title,
      updatedAt: s.updatedAt,
      messageCount: s.messages.length,
    }));
  }, [sessions]);

  return {
    sessions,
    currentSessionId,
    currentSession,
    createNewSession,
    loadSession,
    addMessageToSession,
    renameSession,
    deleteSession,
    getConversationsForSidebar,
  };
};
