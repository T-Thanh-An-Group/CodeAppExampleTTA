import type { ChatMessage, ConversationSummary } from "@example/shared";

export function normalizeConversation(item: unknown): ConversationSummary {
  const data = item as Partial<ConversationSummary>;
  return {
    id: String(data.id || ""),
    title: String(data.title || "Cuộc trò chuyện"),
    avatarUrl: data.avatarUrl || null,
    lastMessage: data.lastMessage || null,
    unreadCount: Number(data.unreadCount) || 0,
    updatedAt: data.updatedAt || new Date().toISOString(),
  };
}

export function normalizeMessages(items: unknown[]): ChatMessage[] {
  if (!Array.isArray(items)) return [];
  return items.map((m) => {
    const raw = m as Partial<ChatMessage>;
    return {
      id: String(raw.id || Math.random().toString()),
      conversationId: String(raw.conversationId || ""),
      senderId: String(raw.senderId || ""),
      content: String(raw.content || ""),
      type: raw.type || "TEXT",
      createdAt: raw.createdAt || new Date().toISOString(),
      isRead: Boolean(raw.isRead),
    };
  });
}
