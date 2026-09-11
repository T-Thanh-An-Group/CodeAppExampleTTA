import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { loginInputSchema } from "@example/shared";
import { Button } from "../../src/shared/ui/button";
import { colors, spacing } from "../../src/shared/theme";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    try {
      // Validate trực tiếp bằng schema dùng chung từ @example/shared
      loginInputSchema.parse({ email, password });
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        router.replace("/(tabs)");
      }, 500);
    } catch (err: any) {
      Alert.alert("Lỗi nhập liệu", err.errors?.[0]?.message || "Thông tin không hợp lệ");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>
      <Text style={styles.subtitle}>Sử dụng tài khoản hệ thống</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="example@mail.com"
          placeholderTextColor={colors.textMuted}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Mật khẩu:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Tối thiểu 6 ký tự"
          placeholderTextColor={colors.textMuted}
        />

        <View style={{ marginTop: spacing.lg }}>
          <Button title="Đăng Nhập" onPress={handleLogin} loading={loading} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    padding: spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  form: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "500",
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
  input: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    padding: spacing.md,
    color: colors.text,
    fontSize: 16,
  },
});
