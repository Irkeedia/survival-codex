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

interface AITabProps {
  t: Translations;
  user: User | null;
  onUpgradeClick: () => void;
}

export function AITab({ t, user, onUpgradeClick }: AITabProps) {
  const [messages, setMessages] = useKV<ChatMessage[]>('ai-chat-messages', []);
  const [apiKey, ] = useKV<string>('openai-api-key', '');
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

    if (!apiKey) {
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
      const prompt = `You are a wilderness survival expert. Answer this question concisely and practically: ${questionText}`;
      const response = await window.spark.llm(prompt);

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      };

      setMessages((current) => [...(current || []), assistantMessage]);
    } catch (error) {
      toast.error('Failed to get AI response');
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
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Card className="p-8 max-w-md text-center space-y-4">
          <Sparkle size={48} className="mx-auto text-accent" weight="fill" />
          <h2 className="text-2xl font-bold">{t.ai.title}</h2>
          <p className="text-muted-foreground">{t.auth.signIn}</p>
        </Card>
      </div>
    );
  }

  if (user.subscriptionTier !== 'premium') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Card className="p-8 max-w-md text-center space-y-4">
          <Crown size={48} className="mx-auto text-accent" weight="fill" />
          <h2 className="text-2xl font-bold">{t.subscription.upgradeRequired}</h2>
          <p className="text-muted-foreground">{t.ai.premiumOnly}</p>
          <Button onClick={onUpgradeClick} className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
            <Crown size={18} weight="fill" />
            {t.subscription.upgradeToPremium}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">{t.ai.title}</h2>
          <p className="text-sm text-muted-foreground">{t.ai.subtitle}</p>
        </div>
        {messages && messages.length > 0 && (
          <Button variant="ghost" size="sm" onClick={handleClearChat}>
            <Trash size={18} />
            {t.ai.clearChat}
          </Button>
        )}
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          {(!messages || messages.length === 0) && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-8">
              <Sparkle size={64} className="text-accent/50" weight="duotone" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{t.ai.askAnything}</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  {t.ai.exampleQuestion}
                </p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {messages?.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-muted">
                  <p className="text-sm text-muted-foreground">{t.ai.thinking}</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border">
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
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !inputValue.trim()} size="icon">
              <PaperPlaneRight size={20} weight="fill" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
