import { useState, useRef, useEffect } from 'react';
import { usePersistentState } from '@/hooks/use-persistent-state';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Progress } from '@/components/ui/progress';
import { Translations } from '@/lib/translations';
import { ChatMessage, ChatConversation, User } from '@/lib/types';
import { PaperPlaneRight, Sparkle, Trash, Crown, ClockCounterClockwise, Plus, ChatCircleText, Microphone, CaretLeft } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { GoogleGenerativeAI } from '@google/generative-ai';

const CREATOR_API_KEY = import.meta.env.VITE_AI_API_KEY || '';
const AI_MODEL = import.meta.env.VITE_AI_MODEL || 'gemini-pro';
const FREE_QUOTA_LIMIT = 25;

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
  const [conversations, setConversations] = usePersistentState<ChatConversation[]>('ai-conversations', []);
  const [currentConversationId, setCurrentConversationId] = usePersistentState<string | null>('current-conversation-id', null);
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

    const effectiveApiKey = CREATOR_API_KEY;

    if (!effectiveApiKey) {
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
      const genAI = new GoogleGenerativeAI(effectiveApiKey);
      const model = genAI.getGenerativeModel({ model: AI_MODEL });

      const questionText = userMessage.content;
      const userName = user.name || 'Survivant';
      const promptText = `Tu es Charlie, un expert en survie dans la nature. Tu t'adresses à ${userName}. Réponds à cette question de manière concise, pratique et personnalisée: ${questionText}`;
      
      const result = await model.generateContent(promptText);
      const response = result.response.text().replace(/\*\*/g, '');

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
    } catch (error: any) {
      console.error('Gemini Error:', error);
      const errorMessage = error?.message || 'Erreur inconnue';
      
      if (errorMessage.includes('API key not valid')) {
        toast.error('Clé API invalide. Vérifiez votre configuration.');
      } else if (errorMessage.includes('User location is not supported')) {
        toast.error('L\'IA n\'est pas disponible dans votre région.');
      } else {
        toast.error(`Erreur IA: ${errorMessage}`);
      }
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
    <div className="fixed inset-0 z-40 bg-background flex flex-col">
      {/* Header */}
      <div className="flex-none relative flex items-center justify-center px-4 pt-12 pb-4 min-h-[90px] bg-background/80 backdrop-blur-md border-b border-border/5 z-10">
        <div className="absolute left-4 bottom-4 flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={createNewConversation} 
            className="rounded-full h-10 w-10 hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Plus size={24} weight="regular" />
          </Button>
        </div>
        
        <div className="bg-muted/50 rounded-full px-4 py-1.5 flex items-center gap-2 mt-auto">
          <Sparkle size={16} weight="fill" className="text-primary" />
          <span className="text-sm font-medium">Charlie AI</span>
        </div>

        <div className="absolute right-4 bottom-4">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
                <ClockCounterClockwise size={24} weight="regular" />
              </Button>
            </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col pt-12 sm:pt-10">
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
        </div>
      </div>

      {user.subscriptionTier !== 'premium' && (
        <div className="mb-2 px-4">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-muted-foreground">{t.ai.quotaRemaining || 'Requests remaining'}</span>
            <span className="font-medium">{Math.max(0, FREE_QUOTA_LIMIT - quota.count)} / {FREE_QUOTA_LIMIT}</span>
          </div>
          <Progress value={(quota.count / FREE_QUOTA_LIMIT) * 100} className="h-1.5" />
        </div>
      )}

      <ScrollArea className="flex-1 px-4 min-h-0" ref={scrollRef}>
        {(!messages || messages.length === 0) && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-12">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-2 animate-pulse">
              <Sparkle size={40} className="text-primary" weight="fill" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{t.ai.askAnything}</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                {t.ai.exampleQuestion}
              </p>
            </div>
          </div>
        )}

        <div className="space-y-6 pb-4 pt-2">
          {messages?.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkle size={16} className="text-white" weight="fill" />
                </div>
              )}
              
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-5 py-3 shadow-sm text-sm leading-relaxed whitespace-pre-wrap break-words",
                  message.role === 'user'
                    ? "bg-white text-black rounded-br-none border border-border/10" // User bubble style
                    : "bg-transparent text-foreground pl-0 pt-1" // Assistant bubble style (clean text)
                )}
              >
                {message.content}
                {message.role === 'assistant' && (
                   <div className="mt-2 flex gap-2">
                      {/* Optional: Add action buttons for assistant messages here later */}
                   </div>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3">
               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkle size={16} className="text-white" weight="fill" />
                </div>
                <div className="flex items-center h-10 pl-2">
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                  </div>
                </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="flex-none w-full bg-background/80 backdrop-blur-md border-t border-border/5 px-4 pt-2 pb-32 z-20">
        <div className="max-w-screen-xl mx-auto flex flex-col gap-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="relative flex items-center"
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t.ai.placeholder || "Ask Charlie..."}
              disabled={isLoading || (user.subscriptionTier !== 'premium' && quota.count >= FREE_QUOTA_LIMIT)}
              className="w-full h-14 pl-6 pr-14 rounded-[2rem] bg-background/50 border border-border/10 shadow-sm focus-visible:ring-1 focus-visible:ring-primary/30 transition-all"
            />
            <div className="absolute right-2 flex items-center gap-1">
               <Button 
                  type="submit" 
                  disabled={isLoading || !inputValue.trim() || (user.subscriptionTier !== 'premium' && quota.count >= FREE_QUOTA_LIMIT)} 
                  size="icon" 
                  className={cn(
                    "h-10 w-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all",
                    (!inputValue.trim()) && "opacity-0 scale-75 pointer-events-none"
                  )}
                >
                  <PaperPlaneRight size={20} weight="fill" />
                </Button>
            </div>
          </form>
          <p className="text-[10px] text-center text-muted-foreground/70 px-4">
            Charlie peut faire des erreurs. Vérifiez les informations importantes.
          </p>
        </div>
      </div>
    </div>
  );
}

