import { useState, useRef, useEffect } from 'react';
import { usePersistentState } from '@/hooks/use-persistent-state';
import { useKV } from '@github/spark/hooks';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Progress } from '@/components/ui/progress';
import { Translations } from '@/lib/translations';
import { ChatMessage, ChatConversation, User } from '@/lib/types';
import { PaperPlaneRight, Sparkle, Trash, Crown, ClockCounterClockwise, Plus, ChatCircleText } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const CREATOR_API_KEY = import.meta.env.VITE_AI_API_KEY || '';
const FREE_QUOTA_LIMIT = 15;

interface AITabProps {
  t: Translations;
  user: User | null;
  onUpgradeClick: () => void;
}

interface AIQuota {
  count: number;
  lastReset: number;
}

export function AITab({ t, user, onUpgradeClick }: AITabProps) {
  const [conversations, setConversations] = useKV<ChatConversation[]>('ai-conversations', []);
  const [currentConversationId, setCurrentConversationId] = useKV<string | null>('current-conversation-id', null);
  const [quota, setQuota] = usePersistentState<AIQuota>('ai-quota', { count: 0, lastReset: Date.now() });
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentConversation = conversations?.find(c => c.id === currentConversationId);
  const messages = currentConversation?.messages || [];

  // Check and reset quota if new month
  useEffect(() => {
    const now = new Date();
    const lastResetDate = new Date(quota.lastReset);
    
    if (now.getMonth() !== lastResetDate.getMonth() || now.getFullYear() !== lastResetDate.getFullYear()) {
      setQuota({ count: 0, lastReset: Date.now() });
    }
  }, [quota.lastReset, setQuota]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const createNewConversation = () => {
    const newConversation: ChatConversation = {
      id: Date.now().toString(),
      title: t.ai.newConversation,
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    setConversations((current) => [newConversation, ...(current || [])]);
    setCurrentConversationId(newConversation.id);
    setSheetOpen(false);
  };

  const deleteConversation = (id: string) => {
    setConversations((current) => (current || []).filter(c => c.id !== id));
    if (currentConversationId === id) {
      setCurrentConversationId(null);
    }
    toast.success(t.ai.deleteConversation);
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    if (!user) {
      toast.error(t.auth.signIn);
      return;
    }

    // Check quota for free users
    if (user.subscriptionTier !== 'premium') {
      if (quota.count >= FREE_QUOTA_LIMIT) {
        toast.error(t.subscription.upgradeRequired, {
          description: t.ai.upgradeForUnlimited || 'Upgrade for unlimited requests',
        });
        onUpgradeClick();
        return;
      }
    }

    if (!CREATOR_API_KEY) {
      toast.error(t.ai.apiKeyRequired, {
        description: t.ai.apiKeyDesc,
      });
      return;
    }

    let conversationId = currentConversationId;
    
    if (!conversationId) {
      const newConv: ChatConversation = {
        id: Date.now().toString(),
        title: inputValue.trim().substring(0, 50),
        messages: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setConversations((current) => [newConv, ...(current || [])]);
      conversationId = newConv.id;
      setCurrentConversationId(conversationId);
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: Date.now(),
    };

    setConversations((current) => 
      (current || []).map(conv => 
        conv.id === conversationId 
          ? { 
              ...conv, 
              messages: [...conv.messages, userMessage],
              updatedAt: Date.now(),
              title: conv.messages.length === 0 ? inputValue.trim().substring(0, 50) : conv.title
            }
          : conv
      )
    );
    
    setInputValue('');
    setIsLoading(true);

    // Increment quota for free users
    if (user.subscriptionTier !== 'premium') {
      setQuota(prev => ({ ...prev, count: prev.count + 1 }));
    }

    try {
      const questionText = userMessage.content;
      const promptText = `Tu es Charlie, un expert en survie dans la nature. Réponds à cette question de manière concise et pratique: ${questionText}`;
      const response = await window.spark.llm(promptText);

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      };

      setConversations((current) => 
        (current || []).map(conv => 
          conv.id === conversationId 
            ? { 
                ...conv, 
                messages: [...conv.messages, assistantMessage],
                updatedAt: Date.now()
              }
            : conv
        )
      );
    } catch (error) {
      toast.error('Impossible d\'obtenir une réponse de Charlie');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (!currentConversationId) return;
    deleteConversation(currentConversationId);
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4 pt-12 pb-24">
        <Card className="p-6 sm:p-8 max-w-md w-full text-center space-y-4">
          <Sparkle size={48} className="mx-auto text-accent" weight="fill" />
          <h2 className="text-xl sm:text-2xl font-bold">{t.ai.title}</h2>
          <p className="text-sm sm:text-base text-muted-foreground">{t.ai.premiumOnly}</p>
          <Button onClick={onUpgradeClick} className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto touch-manipulation h-11">
            <Crown size={18} weight="fill" />
            {t.auth.signIn}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] pt-12 pb-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl sm:text-2xl font-bold truncate">{t.ai.title}</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">{t.ai.subtitle}</p>
        </div>
        <div className="flex gap-2 items-center">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 touch-manipulation h-9 sm:h-10">
                <ClockCounterClockwise size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="text-sm hidden sm:inline">{t.ai.conversationHistory}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] flex flex-col">
              <SheetHeader>
                <SheetTitle className="flex items-center justify-between">
                  <span>{t.ai.conversationHistory}</span>
                  <Button size="sm" onClick={createNewConversation} className="gap-1.5 h-8 px-3">
                    <Plus size={16} />
                    <span className="text-xs">{t.ai.newConversation}</span>
                  </Button>
                </SheetTitle>
              </SheetHeader>
              <ScrollArea className="flex-1 -mx-6 px-6 mt-4">
                {(!conversations || conversations.length === 0) ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
                    <ChatCircleText size={48} className="text-muted-foreground/50" weight="duotone" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{t.ai.noConversations}</p>
                      <p className="text-xs text-muted-foreground">{t.ai.noConversationsDesc}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {conversations.map((conv) => (
                      <div
                        key={conv.id}
                        className={cn(
                          "group flex items-start gap-2 p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50",
                          currentConversationId === conv.id ? "bg-muted border-primary" : "bg-card"
                        )}
                        onClick={() => {
                          setCurrentConversationId(conv.id);
                          setSheetOpen(false);
                        }}
                      >
                        <ChatCircleText size={20} className="flex-shrink-0 mt-0.5" weight={currentConversationId === conv.id ? 'fill' : 'regular'} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{conv.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {conv.messages.length} {conv.messages.length === 1 ? 'message' : 'messages'}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteConversation(conv.id);
                          }}
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </SheetContent>
          </Sheet>
          <Button variant="outline" size="sm" onClick={createNewConversation} className="gap-2 touch-manipulation h-9 sm:h-10">
            <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="text-sm hidden sm:inline">{t.ai.newConversation}</span>
          </Button>
          {messages && messages.length > 0 && (
            <Button variant="ghost" size="sm" onClick={handleClearChat} className="gap-2 touch-manipulation h-9 sm:h-10">
              <Trash size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="text-sm hidden sm:inline">{t.ai.clearChat}</span>
            </Button>
          )}
        </div>
      </div>

      {user.subscriptionTier !== 'premium' && (
        <div className="mb-4 px-1">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-muted-foreground">{t.ai.quotaRemaining || 'Requests remaining'}</span>
            <span className="font-medium">{Math.max(0, FREE_QUOTA_LIMIT - quota.count)} / {FREE_QUOTA_LIMIT}</span>
          </div>
          <Progress value={(quota.count / FREE_QUOTA_LIMIT) * 100} className="h-2" />
          {quota.count >= FREE_QUOTA_LIMIT && (
            <Button 
              variant="link" 
              size="sm" 
              onClick={onUpgradeClick} 
              className="w-full mt-1 h-auto p-0 text-xs text-accent"
            >
              {t.ai.upgradeForUnlimited || 'Upgrade for unlimited'}
            </Button>
          )}
        </div>
      )}

      <Card className="flex-1 flex flex-col overflow-hidden border-0 sm:border bg-background/50 backdrop-blur-sm shadow-none sm:shadow-sm">
        <ScrollArea className="flex-1 p-3 sm:p-4" ref={scrollRef}>
          {(!messages || messages.length === 0) && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-8 px-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
                <Sparkle size={32} className="text-primary" weight="fill" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{t.ai.askAnything}</h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                  {t.ai.exampleQuestion}
                </p>
              </div>
            </div>
          )}

          <div className="space-y-4 pb-4">
            {messages?.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={cn(
                    "max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
                    message.role === 'user'
                      ? "bg-primary text-primary-foreground rounded-tr-none"
                      : "bg-card border border-border/50 rounded-tl-none"
                  )}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-3 bg-card border border-border/50 rounded-tl-none">
                  <div className="flex gap-1.5 items-center h-5">
                    <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-3 sm:p-4 bg-background/80 backdrop-blur-md border-t border-border/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex gap-2 relative"
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t.ai.placeholder}
              disabled={isLoading || (user.subscriptionTier !== 'premium' && quota.count >= FREE_QUOTA_LIMIT)}
              className="flex-1 h-12 pl-4 pr-12 rounded-full bg-muted/50 border-transparent focus:bg-background focus:border-primary/20 transition-all"
            />
            <Button 
              type="submit" 
              disabled={isLoading || !inputValue.trim() || (user.subscriptionTier !== 'premium' && quota.count >= FREE_QUOTA_LIMIT)} 
              size="icon" 
              className="absolute right-1 top-1 h-10 w-10 rounded-full shadow-sm"
            >
              <PaperPlaneRight size={18} weight="fill" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

