import { useState, useEffect, useCallback } from 'react';
import { useSupabase } from '@/hooks/useSupabase';
import { ChatConversation, ChatMessage } from '@/lib/types';
import { toast } from 'sonner';

export function useAIConversations(userId?: string) {
  const { client } = useSupabase();
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch conversations from Supabase
  const fetchConversations = useCallback(async () => {
    if (!client || !userId) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await client
        .from('ai_conversations')
        .select(`
          id,
          title,
          created_at,
          updated_at,
          ai_messages (
            id,
            role,
            content,
            created_at
          )
        `)
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      const formattedConversations: ChatConversation[] = data.map((conv: any) => ({
        id: conv.id,
        title: conv.title,
        createdAt: new Date(conv.created_at).getTime(),
        updatedAt: new Date(conv.updated_at).getTime(),
        messages: conv.ai_messages
          .map((msg: any) => ({
            id: msg.id,
            role: msg.role,
            content: msg.content,
            timestamp: new Date(msg.created_at).getTime(),
          }))
          .sort((a: ChatMessage, b: ChatMessage) => a.timestamp - b.timestamp),
      }));

      setConversations(formattedConversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      toast.error('Erreur lors du chargement de l\'historique');
    } finally {
      setIsLoading(false);
    }
  }, [client, userId]);

  // Initial fetch
  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const createConversation = async (title: string, firstMessage: ChatMessage, assistantMessage?: ChatMessage) => {
    if (!client || !userId) return null;

    try {
      // 1. Create Conversation
      const { data: convData, error: convError } = await client
        .from('ai_conversations')
        .insert({
          user_id: userId,
          title: title,
        })
        .select()
        .single();

      if (convError) throw convError;

      const conversationId = convData.id;

      // 2. Insert Messages
      const messagesToInsert = [
        {
          conversation_id: conversationId,
          role: firstMessage.role,
          content: firstMessage.content,
        },
      ];

      if (assistantMessage) {
        messagesToInsert.push({
          conversation_id: conversationId,
          role: assistantMessage.role,
          content: assistantMessage.content,
        });
      }

      const { data: msgData, error: msgError } = await client
        .from('ai_messages')
        .insert(messagesToInsert)
        .select();

      if (msgError) throw msgError;

      // Update local state
      await fetchConversations();
      return conversationId;
    } catch (error) {
      console.error('Error creating conversation:', error);
      toast.error('Erreur lors de la sauvegarde de la conversation');
      return null;
    }
  };

  const addMessageToConversation = async (conversationId: string, message: ChatMessage) => {
    if (!client || !userId) return;

    try {
      const { error } = await client
        .from('ai_messages')
        .insert({
          conversation_id: conversationId,
          role: message.role,
          content: message.content,
        });

      if (error) throw error;

      // Update conversation timestamp
      await client
        .from('ai_conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', conversationId);

      // Optimistic update or refetch
      // For simplicity, we refetch, but we could optimize
      await fetchConversations();
    } catch (error) {
      console.error('Error adding message:', error);
    }
  };

  const deleteConversation = async (conversationId: string) => {
    if (!client || !userId) return;

    try {
      const { error } = await client
        .from('ai_conversations')
        .delete()
        .eq('id', conversationId);

      if (error) throw error;

      setConversations(prev => prev.filter(c => c.id !== conversationId));
      toast.success('Conversation supprimée');
    } catch (error) {
      console.error('Error deleting conversation:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  return {
    conversations,
    isLoading,
    createConversation,
    addMessageToConversation,
    deleteConversation,
    refresh: fetchConversations
  };
}
