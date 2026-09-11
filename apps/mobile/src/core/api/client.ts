import { APP_CONFIG } from "../../config/env";
import { sessionStore } from "../auth/session";
import {
  loginInputSchema,
  authTokenResponseSchema,
  type LoginInput,
  type AuthTokenResponse,
} from "@example/shared";

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl = APP_CONFIG.apiUrl) {
    this.baseUrl = baseUrl.replace(/\/+$/, "");
  }

  private async fetchWithAuth(endpoint: string, init: RequestInit = {}): Promise<Response> {
    const token = await sessionStore.getAccessToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(init.headers as Record<string, string>),
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return fetch(`${this.baseUrl}${endpoint}`, {
      ...init,
      headers,
    });
  }

  async login(input: LoginInput): Promise<AuthTokenResponse> {
    const valid = loginInputSchema.parse(input);
    const res = await fetch(`${this.baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(valid),
    });

    if (!res.ok) {
      throw new Error(`Login failed with status ${res.status}`);
    }

    const data = await res.json();
    return authTokenResponseSchema.parse(data);
  }

  async getConversations() {
    const res = await this.fetchWithAuth("/conversations");
    if (!res.ok) throw new Error("Failed to fetch conversations");
    return res.json();
  }
}

export const api = new ApiClient();
