
import { useState, FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input);
      setInput("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-end gap-2 p-4 border-t dark:border-gray-800"
    >
      <div className="relative flex w-full flex-grow flex-col">
        <textarea
          placeholder="Send a message..."
          className="input-glass min-h-12 w-full resize-none rounded-xl px-4 py-3 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          rows={1}
          disabled={disabled}
        />
      </div>
      <Button
        type="submit"
        size="icon"
        disabled={!input.trim() || disabled}
        className="h-12 w-12 shrink-0 rounded-full bg-primary hover:bg-primary/90 transition-colors duration-200"
      >
        <Send className="h-5 w-5" />
        <span className="sr-only">Send</span>
      </Button>
    </form>
  );
}
