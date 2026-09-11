import { normalizeConversation, normalizeMessages } from "./normalizers";
import type { ConversationSummary, ChatMessage } from "@example/shared";

// Mock data generator for testing architecture out-of-the-box
export const chatService = {
  async getRecentConversations(): Promise<ConversationSummary[]> {
    const mock = [
      {
        id: "c1",
        title: "Nhóm Hỗ Trợ Kỹ Thuật",
        avatarUrl: null,
        unreadCount: 2,
        updatedAt: new Date().toISOString(),
        lastMessage: {
          id: "m1",
          conversationId: "c1",
          senderId: "u2",
          content: "Kiến trúc mobile đã sẵn sàng kiểm thử rồi nhé!",
          type: "TEXT",
          createdAt: new Date().toISOString(),
          isRead: false,
        },
      },
      {
        id: "c2",
        title: "Nguyễn Văn A",
        avatarUrl: null,
        unreadCount: 0,
        updatedAt: new Date(Date.now() - 3600000).toISOString(),
        lastMessage: {
          id: "m2",
          conversationId: "c2",
          senderId: "u1",
          content: "Hẹn gặp lại bạn vào chiều mai.",
          type: "TEXT",
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          isRead: true,
        },
      },
    ];

    return mock.map(normalizeConversation);
  },

  async getMessagesByConversationId(id: string): Promise<ChatMessage[]> {
    return normalizeMessages([
      {
        id: "m-001",
        conversationId: id,
        senderId: "u-bot",
        content: "Chào mừng bạn đến với CodeAppExampleTTA!",
        type: "TEXT",
        createdAt: new Date().toISOString(),
        isRead: true,
      },
      {
        id: "m-002",
        conversationId: id,
        senderId: "u-me",
        content: "Ứng dụng chạy rất mượt và chuẩn kiến trúc.",
        type: "TEXT",
        createdAt: new Date().toISOString(),
        isRead: true,
      },
    ]);
  },
};
