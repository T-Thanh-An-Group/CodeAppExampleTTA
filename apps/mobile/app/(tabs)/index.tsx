import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { chatService } from "../../src/features/chat/chat-service";
import type { ConversationSummary } from "@example/shared";
import { formatTimestamp } from "@example/shared";
import { Card } from "../../src/shared/ui/card";
import { colors, spacing } from "../../src/shared/theme";

export default function ConversationsTab() {
  const router = useRouter();
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    chatService.getRecentConversations().then((data) => {
      setConversations(data);
      setLoading(false);
    });
  }, []);

  const renderItem = ({ item }: { item: ConversationSummary }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => router.push(`/conversations/${item.id}` as any)}
      style={styles.itemContainer}
    >
      <Card style={styles.card}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>{item.title.charAt(0)}</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.time}>{formatTimestamp(item.updatedAt)}</Text>
          </View>
          <Text style={styles.message} numberOfLines={1}>
            {item.lastMessage?.content || "Chưa có tin nhắn"}
          </Text>
        </View>
        {item.unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.unreadCount}</Text>
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  list: {
    padding: spacing.md,
  },
  itemContainer: {
    marginBottom: spacing.sm,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    marginRight: spacing.sm,
  },
  time: {
    color: colors.textMuted,
    fontSize: 12,
  },
  message: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 4,
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: spacing.sm,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
