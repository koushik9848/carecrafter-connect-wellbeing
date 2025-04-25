
import { ScrollArea } from "./ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

interface ChatHistoryProps {
  sessions: Array<{
    id: string;
    startTime: Date;
    firstUserMessage?: string;
    ageGroup: 'youth' | 'adult' | 'senior';
  }>;
  onSelectSession: (sessionId: string) => void;
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({ sessions, onSelectSession }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Chat History
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Previous Chats</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-100px)] mt-4">
          <div className="space-y-4 pr-4">
            {sessions.map((session) => (
              <Button
                key={session.id}
                variant="outline"
                className="w-full flex flex-col items-start gap-1 h-auto p-4"
                onClick={() => onSelectSession(session.id)}
              >
                <span className="font-medium">
                  Chat on {session.startTime.toLocaleDateString()} at{" "}
                  {session.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {session.firstUserMessage && (
                  <span className="text-sm text-muted-foreground line-clamp-2 text-left">
                    {session.firstUserMessage}
                  </span>
                )}
                <span className="text-xs text-muted-foreground mt-1">
                  {session.ageGroup.charAt(0).toUpperCase() + session.ageGroup.slice(1)} Care
                </span>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
