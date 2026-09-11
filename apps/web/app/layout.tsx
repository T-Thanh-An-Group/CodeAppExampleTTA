import React from "react";

export const metadata = {
  title: "CodeAppExampleTTA - Web",
  description: "Web client consuming shared contracts from @example/shared",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body style={{
        margin: 0,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        backgroundColor: "#0f172a",
        color: "#f8fafc"
      }}>
        {children}
      </body>
    </html>
  );
}
