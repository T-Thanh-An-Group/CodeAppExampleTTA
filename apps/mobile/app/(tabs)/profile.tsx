import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "../../src/shared/ui/button";
import { Card } from "../../src/shared/ui/card";
import { colors, spacing } from "../../src/shared/theme";

export default function ProfileTab() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <Card style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>P</Text>
        </View>
        <Text style={styles.name}>Nguyễn Phát</Text>
        <Text style={styles.email}>phatdev2412@example.com</Text>
        <Text style={styles.role}>Vai trò: ADMIN</Text>
      </Card>

      <View style={{ marginTop: spacing.xl }}>
        <Button title="Đăng Xuất" variant="danger" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  profileCard: {
    alignItems: "center",
    paddingVertical: spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  avatarText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  name: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 4,
  },
  role: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "600",
    marginTop: spacing.sm,
  },
});
