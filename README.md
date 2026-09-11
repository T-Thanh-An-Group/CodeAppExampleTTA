# CodeAppExampleTTA

> Kiến trúc chuẩn Monorepo tích hợp **Website (Next.js)** và **Mobile App (React Native / Expo SDK 52-56 hướng Android)** sử dụng **npm workspaces**. Chia sẻ 100% dữ liệu hợp đồng (Data Contracts), Zod Schemas và Typescript Types qua `@example/shared`.

Kho lưu trữ này được thiết kế theo tư duy kiến trúc phân tầng rõ ràng (Clean & Minimal Architecture), giúp các lập trình viên dễ dàng học hỏi, tiếp cận và áp dụng để phát triển sản phẩm thực tế.

---

## 📑 Mục Lục
1. [Tổng Quan Kiến Trúc Monorepo](#1-tổng-quan-kiến-trúc-monorepo)
2. [Cấu Trúc Dự Án Mobile App (Bản Android)](#2-cấu-trúc-dự-án-mobile-app-bản-android)
3. [Quy Tắc Tổ Chức Code & Đặt Tên File/Thư Mục](#3-quy-tắc-tổ-chức-code--đặt-tên-filethư-mục)
4. [Cấu Trúc Mẫu Điển Hình (Sample Architecture)](#4-cấu-trúc-mẫu-điển-hình-sample-architecture)
5. [Ngôn Ngữ & Các Thư Viện Sử Dụng Đi Kèm](#5-ngôn-ngữ--các-thư-viện-sử-dụng-đi-kèm)
6. [Kỹ Thuật Cần Trang Bị Trước Khi Bắt Tay Vào Làm](#6-kỹ-thuật-cần-trang-bị-trước-khi-bắt-tay-vào-làm)
7. [Hướng Dẫn Cài Đặt & Chạy Cục Bộ Với npm](#7-hướng-dẫn-cài-đặt--chạy-cục-bộ-với-npm)
8. [Quy Trình Build Native Android (APK / AAB)](#8-quy-trình-build-native-android-apk--aab)

---

## 1. Tổng Quan Kiến Trúc Monorepo

Dự án sử dụng cơ chế **npm workspaces** nguyên bản (`workspaces: ["packages/*", "apps/*"]`), không phụ thuộc pnpm hay lerna:

```text
CodeAppExampleTTA/
├── package.json              # Quản lý workspaces npm và script chạy tổng
├── .gitignore                # Ignore artifacts, build outputs, node_modules
├── README.md                 # Tài liệu hướng dẫn chi tiết
├── packages/
│   └── shared/               # @example/shared: Data contracts, Zod schemas, Types, Helpers
└── apps/
    ├── mobile/               # @example/mobile: Expo / React Native App (Android & iOS)
    └── web/                  # @example/web: Next.js App Router
```

* **Lợi ích cốt lõi**: Khi backend hoặc frontend thay đổi một trường dữ liệu (ví dụ: `ChatMessage`, `UserRole`), bạn chỉ cần cập nhật ở `packages/shared`, cả Web và Mobile đều nhận được gợi ý TypeScript và kiểm tra lỗi ngay tức thì (Single Source of Truth).

---

## 2. Cấu Trúc Dự Án Mobile App (Bản Android)

Dự án mobile nằm tại `apps/mobile/`, sử dụng nền tảng **Expo Router** (file-based routing) và sẵn sàng xuất bản ra nền tảng **Android**:

```text
apps/mobile/
├── app/                         # Expo Router (Khai báo route & cấu trúc màn hình)
│   ├── (auth)/                  # Nhóm route xác thực (không xuất hiện trên URL)
│   │   ├── _layout.tsx          # Stack navigation cho luồng Auth
│   │   └── login.tsx            # Màn hình đăng nhập
│   ├── (tabs)/                  # Nhóm route giao diện thanh Tab đáy
│   │   ├── _layout.tsx          # Cấu hình thanh Tab Navigation
│   │   ├── index.tsx            # Tab danh sách tin nhắn
│   │   └── profile.tsx          # Tab hồ sơ cá nhân
│   ├── conversations/
│   │   └── [id].tsx             # Màn hình chi tiết cuộc trò chuyện (Dynamic route)
│   ├── _layout.tsx              # Root Stack Layout, ThemeProvider, SafeAreaProvider
│   └── index.tsx                # Entry router điều hướng ban đầu
├── src/                         # Mã nguồn nghiệp vụ ứng dụng
│   ├── config/                  # Cấu hình môi trường (env, base URL)
│   ├── core/                    # Hạ tầng kết nối & platform boundary
│   │   ├── api/client.ts        # Fetch client kết hợp Zod parser
│   │   └── auth/session.ts      # Quản lý token an toàn (Expo SecureStore)
│   ├── features/                # Chia nhỏ nghiệp vụ độc lập (Feature-driven)
│   │   └── chat/                # Module chat (service, normalizers, UI)
│   └── shared/                  # Code dùng chung nội bộ mobile
│       ├── theme.ts             # Màu sắc, khoảng cách (spacing), typography
│       └── ui/                  # Primitives UI (Button, Card, Input)
├── android/                     # Thư mục Native Android (tạo tự động qua expo prebuild)
│   ├── app/                     # Module app Android (build.gradle, AndroidManifest.xml)
│   ├── build.gradle             # Cấu hình Gradle root
│   └── gradlew                  # Wrapper thực thi build Android
├── assets/                      # Ảnh tĩnh, adaptive icon Android, splash screen
├── app.json                     # Cấu hình định danh Expo, package Android, permissions
├── tsconfig.json                # TypeScript aliases (@/* -> ./src/*)
└── package.json                 # Khai báo thư viện mobile
```

---

## 3. Quy Tắc Tổ Chức Code & Đặt Tên File/Thư Mục

### 3.1 Quy tắc phân tầng (Separation of Concerns)
1. **`app/` (Presentation & Routing)**:
   * Chỉ khai báo màn hình, nhận tham số từ URL (`useLocalSearchParams`) và lắp ráp các UI component từ tầng `features/` hoặc `shared/`.
   * **Tuyệt đối không** viết trực tiếp logic gọi API, không gọi `fetch` hay trực tiếp lưu token tại đây.
2. **`src/core/` (Infrastructure & Platform Boundaries)**:
   * Là nơi duy nhất giao tiếp với HTTP API, WebSocket, SecureStore (lưu token bảo mật trên Android KeyStore) và Push Notification.
3. **`src/features/<feature>/` (Business Domain)**:
   * Mỗi tính năng lớn (`chat`, `auth`, `profile`) sở hữu một thư mục riêng biệt.
   * Chứa business logic, state hooks, normalizer biến đổi dữ liệu.
4. **`src/shared/` (Mobile Shared Primitives)**:
   * Chứa các UI Primitives dùng chung (`Button`, `Card`, `Modal`) và Design Tokens (`colors`, `spacing`).
   * Không phụ thuộc vào API hay session cụ thể.
5. **`packages/shared/` (Monorepo Contracts)**:
   * Nơi lưu trữ Zod Schemas và Typescript types dùng chung cho cả Web và Mobile. Không chứa bất kỳ thư viện native nào (`react-native`).

### 3.2 Quy ước đặt tên (Naming Conventions)
* **Thư mục**: Luôn dùng chữ thường dạng **`kebab-case`** (ví dụ: `chat-service`, `push-notifications`).
* **File Component**: Dùng chữ thường gạch nối **`kebab-case.tsx`** (ví dụ: `button.tsx`, `login.tsx`, `card.tsx`).
* **File Logic / Helper**: Dùng **`kebab-case.ts`** (ví dụ: `client.ts`, `normalizers.ts`, `session.ts`).
* **Co-location Tests**: Đặt file kiểm thử trực tiếp kế bên file nguồn (ví dụ: `normalizers.ts` -> `normalizers.test.ts`).
* **Không dùng Barrel `index.ts` bừa bãi**: Tránh gom hàng chục component vào một file `index.ts` để re-export. Hãy import trực tiếp từ đường dẫn đích (`../../src/shared/ui/button`) nhằm giữ bundle size nhẹ và tree-shaking hiệu quả trên Android.

---

## 4. Cấu Trúc Mẫu Điển Hình (Sample Architecture)

### 4.1 Luồng dữ liệu chuẩn (Data Flow)
```text
[Màn hình Route: app/conversations/[id].tsx]
               │
               ▼
[Feature Service: src/features/chat/chat-service.ts]
               │
               ▼
[Core API Client: src/core/api/client.ts]
               │ ──> Xác thực header từ [core/auth/session.ts] (SecureStore)
               │ ──> Validate runtime bằng Schema từ [@example/shared]
               ▼
[Backend Server (NestJS / REST API)]
```

### 4.2 Ví dụ chia sẻ Contract giữa Web và Mobile
* Định nghĩa tại [packages/shared/src/chat.ts](file:///Volumes/D/Codex/projects/CodeAppExampleTTA/packages/shared/src/chat.ts):
```typescript
import { z } from "zod";

export const chatMessageSchema = z.object({
  id: z.string().min(1),
  conversationId: z.string().min(1),
  senderId: z.string().min(1),
  content: z.string().min(1),
  createdAt: z.string().datetime(),
});
export type ChatMessage = z.infer<typeof chatMessageSchema>;
```
* Cả **Next.js Web** (`apps/web`) và **React Native Android** (`apps/mobile`) đều import trực tiếp:
```typescript
import { chatMessageSchema, type ChatMessage } from "@example/shared";
```

---

## 5. Ngôn Ngữ & Các Thư Viện Sử Dụng Đi Kèm

| Thành phần | Công nghệ / Thư viện | Vai trò |
| :--- | :--- | :--- |
| **Ngôn ngữ** | TypeScript 5.8+ | Ép kiểu tĩnh toàn bộ hệ thống |
| **Nền tảng Mobile** | React Native 0.76+ & Expo SDK 52-56 | Nền tảng xây dựng ứng dụng di động đa nền tảng |
| **Routing** | `expo-router` | Điều hướng file-based routing mượt mà cho Mobile |
| **Bảo mật thiết bị** | `expo-secure-store` | Lưu trữ Access Token vào Android KeyStore bảo mật |
| **Icons** | `lucide-react-native` | Bộ icon SVG nhẹ và hiện đại |
| **Xác thực dữ liệu** | `zod` | Kiểm tra schema dữ liệu runtime từ API |
| **Giao diện & Cử chỉ** | `react-native-safe-area-context`, `react-native-screens`, `react-native-gesture-handler` | Tối ưu hiển thị vùng tai thỏ và cử chỉ Android |
| **Nền tảng Web** | Next.js 15 (App Router) | Ứng dụng web hiển thị dashboard |

---

## 6. Kỹ Thuật Cần Trang Bị Trước Khi Bắt Tay Vào Làm

1. **Hiểu cơ chế npm workspaces**:
   * Cách các gói trong monorepo liên kết với nhau bằng symlink cục bộ mà không cần tải lên npm registry.
2. **File-based Routing trong Expo Router**:
   * Nhóm route có dấu ngoặc đơn `(auth)`, `(tabs)` (route groups không ảnh hưởng URL).
   * File `_layout.tsx` đóng vai trò layout bao bọc các màn hình con.
   * Dynamic routes như `[id].tsx` để lấy tham số URL.
3. **Quản lý dữ liệu bất đồng bộ & Cache**:
   * Tư duy tách biệt giữa UI state cục bộ và Server state (sử dụng React Query hoặc Service layer).
4. **Kiến thức Native Android cơ bản**:
   * Hiểu về Android Package Name (`com.example.codeapptta`), quyền trong `AndroidManifest.xml`.
   * Cài đặt Android Studio, Android SDK (API 34/35), thiết lập biến môi trường `ANDROID_HOME`.
5. **Runtime Validation với Zod**:
   * Biết cách dùng `schema.parse()` và `schema.safeParse()` để chống crash app khi API thay đổi đột ngột.

---

## 7. Hướng Dẫn Cài Đặt & Chạy Cục Bộ Với npm

### Yêu cầu môi trường:
* **Node.js**: Phiên bản `>= 20.0.0`
* **npm**: Phiên bản `>= 10.0.0` (hỗ trợ npm workspaces đầy đủ)
* **Android Studio** & Máy ảo Android Emulator (nếu muốn chạy app Android native)

### Bước 1: Cài đặt toàn bộ dependencies
Chạy lệnh duy nhất tại thư mục gốc để npm tự động cài đặt và link tất cả workspaces:
```bash
npm install
```

### Bước 2: Build package dùng chung `@example/shared`
```bash
npm run build:shared
```

### Bước 3: Chạy ứng dụng

* **Chạy Mobile App (Expo Metro Bundler)**:
  ```bash
  npm run dev:mobile
  ```
  *(Dùng ứng dụng Expo Go trên điện thoại Android quét mã QR hoặc bấm phím `a` để mở trên Android Emulator).*

* **Chạy trực tiếp trên thiết bị / máy ảo Android**:
  ```bash
  npm run dev:android
  ```

* **Chạy Web App (Next.js)**:
  ```bash
  npm run dev:web
  ```
  *(Mở trình duyệt tại địa chỉ `http://localhost:3000`)*

* **Kiểm tra lỗi kiểu dữ liệu toàn bộ dự án**:
  ```bash
  npm run typecheck
  ```

---

## 8. Quy Trình Build Native Android (APK / AAB)

### Cách 1: Sử dụng Expo Prebuild (Tạo code Android Native thuần)
Nếu bạn muốn can thiệp code Java/Kotlin hoặc build offline bằng Android Studio:
```bash
# Di chuyển vào thư mục mobile
cd apps/mobile

# Tạo thư mục android/ nguyên bản
npx expo prebuild --platform android

# Build file APK Debug trực tiếp bằng Gradle Wrapper
cd android
./gradlew assembleDebug
```
*File APK debug sau khi build sẽ nằm tại: `apps/mobile/android/app/build/outputs/apk/debug/app-debug.apk`.*

### Cách 2: Sử dụng Expo Application Services (EAS Build lên Cloud)
```bash
# Cài đặt EAS CLI
npm install -g eas-cli

# Đăng nhập tài khoản Expo
eas login

# Cấu hình dự án
eas build:configure

# Build file APK cài trực tiếp cho Android
eas build --platform android --profile preview
```

---

## Giấy Phép (License)
Dự án được phân phối dưới giấy phép **MIT**. Mọi người có thể thoải mái sao chép, học tập và tùy biến cho mục đích cá nhân hoặc thương mại.
