
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type MessageType = "user" | "ai";

export interface ChatMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
  type: MessageType;
  timestamp?: string;
}

const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ content, type, timestamp, className, ...props }, ref) => {
    const isUser = type === "user";

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full animate-slide-in flex-col gap-2 p-1",
          isUser ? "items-end" : "items-start",
          className
        )}
        {...props}
      >
        <div className="flex max-w-[80%] flex-col gap-2">
          <div className="text-sm font-medium text-muted-foreground">
            {isUser ? "You" : "AI Assistant"}
          </div>
          <div
            className={cn(
              "rounded-xl px-4 py-3 shadow-sm",
              isUser
                ? "chat-bubble-user rounded-tr-none"
                : "chat-bubble-ai rounded-tl-none"
            )}
          >
            <p className="whitespace-pre-wrap text-sm">{content}</p>
          </div>
          {timestamp && (
            <div className="text-xs text-muted-foreground">{timestamp}</div>
          )}
        </div>
      </div>
    );
  }
);

ChatMessage.displayName = "ChatMessage";

export { ChatMessage };
