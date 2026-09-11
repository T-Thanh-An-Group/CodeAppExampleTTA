import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { chatService } from "../../src/features/chat/chat-service";
import type { ChatMessage } from "@example/shared";
import { formatTimestamp, sendMessageInputSchema } from "@example/shared";
import { Button } from "../../src/shared/ui/button";
import { colors, spacing } from "../../src/shared/theme";

export default function ConversationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (id) {
      chatService.getMessagesByConversationId(id).then(setMessages);
    }
  }, [id]);

  const handleSend = () => {
    try {
      // Validate input trước khi gửi bằng Zod schema từ @example/shared
      const valid = sendMessageInputSchema.parse({
        conversationId: id || "default",
        content: input,
      });

      const newMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        conversationId: valid.conversationId,
        senderId: "u-me",
        content: valid.content,
        type: valid.type,
        createdAt: new Date().toISOString(),
        isRead: true,
      };

      setMessages((prev) => [...prev, newMsg]);
      setInput("");
    } catch {
      // Lỗi bỏ trống tin nhắn
    }
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isMe = item.senderId === "u-me";
    return (
      <View
        style={[
          styles.messageRow,
          isMe ? styles.myMessageRow : styles.otherMessageRow,
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            isMe ? styles.myBubble : styles.otherBubble,
          ]}
        >
          <Text style={styles.messageText}>{item.content}</Text>
          <Text style={styles.messageTime}>{formatTimestamp(item.createdAt)}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.list}
      />
      <View style={styles.inputBar}>
        <TextInput
          style={styles.textInput}
          value={input}
          onChangeText={setInput}
          placeholder="Nhập tin nhắn..."
          placeholderTextColor={colors.textMuted}
        />
        <View style={styles.sendButton}>
          <Button title="Gửi" onPress={handleSend} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: spacing.md,
  },
  messageRow: {
    flexDirection: "row",
    marginVertical: 4,
  },
  myMessageRow: {
    justifyContent: "flex-end",
  },
  otherMessageRow: {
    justifyContent: "flex-start",
  },
  messageBubble: {
    maxWidth: "80%",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 16,
  },
  myBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: colors.card,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  messageText: {
    color: "#fff",
    fontSize: 15,
  },
  messageTime: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 10,
    alignSelf: "flex-end",
    marginTop: 4,
  },
  inputBar: {
    flexDirection: "row",
    padding: spacing.md,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
  },
  sendButton: {
    minWidth: 70,
  },
});
