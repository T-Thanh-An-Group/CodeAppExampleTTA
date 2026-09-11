import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../src/shared/theme";

export default function IndexScreen() {
  const router = useRouter();

  useEffect(() => {
    // Chuyển hướng trực tiếp vào màn hình chính tabs
    const timer = setTimeout(() => {
      router.replace("/(tabs)");
    }, 100);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
