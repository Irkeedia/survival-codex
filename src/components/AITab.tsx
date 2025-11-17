import { useState, useRef, useEffect } from 'react';
import { useKV } from '@github/spark/hooks';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Translations } from '@/lib/translations';
import { ChatMessage, User } from '@/lib/types';
import { PaperPlaneRight, Sparkle, Trash, Crown } from '@phosphor-icons/react';
import { toast } from 'sonner';

const CREATOR_API_KEY = import.meta.env.VITE_AI_API_KEY || '';

interface AITabProps {
  t: Translations;
  user: User | null;
  onUpgradeClick: () => void;
}

export function AITab({ t, user, onUpgradeClick }: AITabProps) {
  const [messages, setMessages] = useKV<ChatMessage[]>('ai-chat-messages', []);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    if (!CREATOR_API_KEY) {
      toast.error(t.ai.apiKeyRequired, {
        description: t.ai.apiKeyDesc,
      });
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: Date.now(),
    };

    setMessages((current) => [...(current || []), userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const questionText = inputValue;
      const prompt = `Tu es Charlie, un expert en survie dans la nature. Réponds à cette question de manière concise et pratique: ${questionText}`;
      const response = await window.spark.llm(prompt);

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      };

      setMessages((current) => [...(current || []), assistantMessage]);
    } catch (error) {
      toast.error('Impossible d\'obtenir une réponse de Charlie');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    toast.success(t.ai.clearChat);
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4">
        <Card className="p-6 sm:p-8 max-w-md w-full text-center space-y-4">
          <Sparkle size={48} className="mx-auto text-accent" weight="fill" />
          <h2 className="text-xl sm:text-2xl font-bold">{t.ai.title}</h2>
          <p className="text-sm sm:text-base text-muted-foreground">{t.auth.signIn}</p>
        </Card>
      </div>
    );
  }

  if (user.subscriptionTier !== 'premium') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4">
        <Card className="p-6 sm:p-8 max-w-md w-full text-center space-y-4">
          <Crown size={48} className="mx-auto text-accent" weight="fill" />
          <h2 className="text-xl sm:text-2xl font-bold">{t.subscription.upgradeRequired}</h2>
          <p className="text-sm sm:text-base text-muted-foreground">{t.ai.premiumOnly}</p>
          <Button onClick={onUpgradeClick} className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto touch-manipulation h-11">
            <Crown size={18} weight="fill" />
            {t.subscription.upgradeToPremium}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-14rem)] sm:h-[calc(100vh-12rem)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3 sm:gap-4">
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold truncate">{t.ai.title}</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">{t.ai.subtitle}</p>
        </div>
        {messages && messages.length > 0 && (
          <Button variant="ghost" size="sm" onClick={handleClearChat} className="gap-2 self-start sm:self-auto touch-manipulation h-9 sm:h-10">
            <Trash size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="text-sm">{t.ai.clearChat}</span>
          </Button>
        )}
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 p-3 sm:p-4" ref={scrollRef}>
          {(!messages || messages.length === 0) && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-8 px-4">
              <Sparkle size={56} className="sm:w-16 sm:h-16 text-accent/50" weight="duotone" />
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-semibold">{t.ai.askAnything}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
                  {t.ai.exampleQuestion}
                </p>
              </div>
            </div>
          )}

          <div className="space-y-3 sm:space-y-4">
            {messages?.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3 bg-muted">
                  <p className="text-sm text-muted-foreground">{t.ai.thinking}</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-3 sm:p-4 border-t border-border">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex gap-2"
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t.ai.placeholder}
              disabled={isLoading}
              className="flex-1 h-11 text-base"
            />
            <Button type="submit" disabled={isLoading || !inputValue.trim()} size="icon" className="h-11 w-11 flex-shrink-0 touch-manipulation">
              <PaperPlaneRight size={20} weight="fill" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
