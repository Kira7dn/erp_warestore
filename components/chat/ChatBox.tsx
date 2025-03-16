"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Send,
  Loader2,
  X,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const suggestions = [
  "💼 Tìm hiểu về sản phẩm",
  "🎓 Hướng dẫn sử dụng",
  "❓ Câu hỏi thường gặp",
  "🚨 Báo cáo vấn đề",
];

export function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messages
            .concat(userMessage)
            .map(({ role, content }) => ({
              role,
              content,
            })),
        }),
      });

      if (!response.ok) {
        throw new Error("Lỗi khi gửi tin nhắn");
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.content,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Lỗi:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-blue-600 text-white border-0"
        >
          <Sparkles className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[400px] sm:w-[400px] p-0 [&>button]:hidden"
      >
        <SheetTitle className="sr-only">
          AI Assistant Chat
        </SheetTitle>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-3 bg-blue-600 text-white">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-blue-700 rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <h2 className="font-semibold">
                AI Assistant
              </h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-blue-700 rounded-full"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">
                  Tôi có thể giúp gì cho bạn?
                </h2>
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                    onClick={() => setInput(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-8">
                  <svg
                    viewBox="0 0 40 40"
                    className="h-4 w-4"
                  >
                    <path
                      fill="currentColor"
                      d="M37.136 16.369a9.975 9.975 0 0 0-.859-8.185 10.077 10.077 0 0 0-10.85-4.833A10.107 10.107 0 0 0 8.301 6.97a9.976 9.976 0 0 0-6.663 4.833A10.076 10.076 0 0 0 2.876 23.63a9.964 9.964 0 0 0 .852 8.184 10.085 10.085 0 0 0 10.857 4.833A9.972 9.972 0 0 0 22.1 40c4.39.004 8.279-2.83 9.62-7.01a9.985 9.985 0 0 0 6.663-4.833 10.094 10.094 0 0 0-1.247-11.788z"
                    />
                  </svg>
                  Powered by OpenAI
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-gray-100">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </div>
            )}
          </div>

          <div className="border-t p-4">
            <form
              onSubmit={handleSubmit}
              className="relative"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Gửi tin nhắn"
                className="w-full rounded-lg border border-gray-300 pl-4 pr-12 py-3 focus:outline-none focus:border-blue-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
