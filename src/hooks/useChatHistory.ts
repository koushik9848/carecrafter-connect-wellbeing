
import { useState, useEffect } from 'react';

interface ChatMessage {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  ageGroup: 'youth' | 'adult' | 'senior';
  messages: ChatMessage[];
  startTime: Date;
  firstUserMessage?: string;
}

export const useChatHistory = (ageGroup: 'youth' | 'adult' | 'senior') => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');

  useEffect(() => {
    // Load chat history from localStorage
    const storedSessions = localStorage.getItem('chatSessions');
    if (storedSessions) {
      const parsedSessions = JSON.parse(storedSessions, (key, value) => {
        if (key === 'startTime' || key === 'timestamp') {
          return new Date(value);
        }
        return value;
      });
      setSessions(parsedSessions);
    }
  }, []);

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      ageGroup,
      messages: [],
      startTime: new Date(),
    };
    setSessions(prev => {
      const updatedSessions = [...prev, newSession];
      localStorage.setItem('chatSessions', JSON.stringify(updatedSessions));
      return updatedSessions;
    });
    setCurrentSessionId(newSession.id);
    return newSession;
  };

  const loadSession = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSessionId(sessionId);
      return session;
    }
    return null;
  };

  const addMessageToSession = (message: Omit<ChatMessage, 'timestamp'>) => {
    setSessions(prev => {
      const updatedSessions = prev.map(session => {
        if (session.id === currentSessionId) {
          const newMessage = { ...message, timestamp: new Date() };
          const updatedMessages = [...session.messages, newMessage];
          const updatedSession = {
            ...session,
            messages: updatedMessages,
            firstUserMessage: !session.firstUserMessage && message.isUser ? message.text : session.firstUserMessage
          };
          return updatedSession;
        }
        return session;
      });
      localStorage.setItem('chatSessions', JSON.stringify(updatedSessions));
      return updatedSessions;
    });
  };

  return {
    sessions,
    currentSessionId,
    createNewSession,
    loadSession,
    addMessageToSession,
  };
};
