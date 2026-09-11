import { z } from "zod";
import { userProfileSchema } from "./auth";

export const messageTypeSchema = z.enum(["TEXT", "IMAGE", "FILE", "SYSTEM"]);
export type MessageType = z.infer<typeof messageTypeSchema>;

export const chatMessageSchema = z.object({
  id: z.string().min(1),
  conversationId: z.string().min(1),
  senderId: z.string().min(1),
  sender: userProfileSchema.optional(),
  content: z.string().min(1),
  type: messageTypeSchema.default("TEXT"),
  createdAt: z.string().datetime(),
  isRead: z.boolean().default(false),
});
export type ChatMessage = z.infer<typeof chatMessageSchema>;

export const conversationSummarySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  avatarUrl: z.string().url().nullable().optional(),
  lastMessage: chatMessageSchema.nullable().optional(),
  unreadCount: z.number().int().nonnegative().default(0),
  updatedAt: z.string().datetime(),
});
export type ConversationSummary = z.infer<typeof conversationSummarySchema>;

export const sendMessageInputSchema = z.object({
  conversationId: z.string().min(1),
  content: z.string().trim().min(1, "Nội dung tin nhắn không được để trống"),
  type: messageTypeSchema.default("TEXT"),
});
export type SendMessageInput = z.infer<typeof sendMessageInputSchema>;
