import React from "react";
import { formatCompactNumber, formatTimestamp, type ConversationSummary } from "@example/shared";

const sampleConversations: ConversationSummary[] = [
  {
    id: "c1",
    title: "Nhóm Kỹ Thuật Web & Mobile",
    avatarUrl: null,
    unreadCount: 4,
    updatedAt: new Date().toISOString(),
    lastMessage: {
      id: "m1",
      conversationId: "c1",
      senderId: "u1",
      content: "Web và Android đang chia sẻ chung 100% Zod schema từ @example/shared!",
      type: "TEXT",
      createdAt: new Date().toISOString(),
      isRead: false,
    },
  },
  {
    id: "c2",
    title: "Ban Quản Trị Hệ Thống",
    avatarUrl: null,
    unreadCount: 0,
    updatedAt: new Date(Date.now() - 7200000).toISOString(),
    lastMessage: {
      id: "m2",
      conversationId: "c2",
      senderId: "u2",
      content: "Kiến trúc npm workspaces đã hoàn thiện.",
      type: "TEXT",
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      isRead: true,
    },
  },
];

export default function WebHomePage() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "40px 20px" }}>
      <header style={{ marginBottom: 32, borderBottom: "1px solid #334155", paddingBottom: 20 }}>
        <h1 style={{ color: "#38bdf8", margin: "0 0 8px 0" }}>CodeAppExampleTTA - Web Dashboard</h1>
        <p style={{ color: "#94a3b8", margin: 0 }}>
          Ví dụ ứng dụng Web (Next.js) tái sử dụng chung type và hàm format từ <code>@example/shared</code>.
        </p>
      </header>

      <section style={{ backgroundColor: "#1e293b", borderRadius: 12, padding: 24, border: "1px solid #334155" }}>
        <h2 style={{ fontSize: 18, marginTop: 0, marginBottom: 16 }}>Danh sách hội thoại đồng bộ:</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {sampleConversations.map((conv) => (
            <div
              key={conv.id}
              style={{
                backgroundColor: "#0f172a",
                padding: 16,
                borderRadius: 8,
                border: "1px solid #334155",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{conv.title}</div>
                <div style={{ color: "#94a3b8", fontSize: 14, marginTop: 4 }}>
                  {conv.lastMessage?.content}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: 12, color: "#64748b" }}>
                  {formatTimestamp(conv.updatedAt)}
                </span>
                {conv.unreadCount > 0 && (
                  <div style={{
                    marginTop: 4,
                    display: "inline-block",
                    backgroundColor: "#2563eb",
                    color: "#fff",
                    borderRadius: 10,
                    padding: "2px 8px",
                    fontSize: 12,
                    fontWeight: "bold",
                  }}>
                    {formatCompactNumber(conv.unreadCount)} mới
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
