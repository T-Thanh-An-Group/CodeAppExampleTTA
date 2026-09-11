import * as SecureStore from "expo-secure-store";
import type { UserProfile } from "@example/shared";

const TOKEN_KEY = "auth_access_token";
const USER_KEY = "auth_user_profile";

export const sessionStore = {
  async getAccessToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(TOKEN_KEY);
    } catch {
      return null;
    }
  },

  async setSession(token: string, user: UserProfile): Promise<void> {
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.error("Failed to persist session", e);
    }
  },

  async clearSession(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_KEY);
    } catch (e) {
      console.error("Failed to delete session", e);
    }
  },

  async getUserProfile(): Promise<UserProfile | null> {
    try {
      const raw = await SecureStore.getItemAsync(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
};
