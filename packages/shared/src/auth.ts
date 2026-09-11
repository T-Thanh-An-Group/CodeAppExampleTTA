import { z } from "zod";

export const userRoleSchema = z.enum(["USER", "ADMIN", "MODERATOR"]);
export type UserRole = z.infer<typeof userRoleSchema>;

export const userProfileSchema = z.object({
  id: z.string().min(1),
  email: z.string().email("Email không hợp lệ"),
  displayName: z.string().min(2, "Tên hiển thị tối thiểu 2 ký tự"),
  avatarUrl: z.string().url().nullable().optional(),
  role: userRoleSchema.default("USER"),
  createdAt: z.string().datetime().optional(),
});
export type UserProfile = z.infer<typeof userProfileSchema>;

export const loginInputSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải từ 6 ký tự trở lên"),
});
export type LoginInput = z.infer<typeof loginInputSchema>;

export const authTokenResponseSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1).optional(),
  user: userProfileSchema,
});
export type AuthTokenResponse = z.infer<typeof authTokenResponseSchema>;
