import React from "react";
import { Stack } from "expo-router";
import { colors } from "../../src/shared/theme";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.text,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="login" options={{ title: "Đăng nhập", headerShown: false }} />
    </Stack>
  );
}
