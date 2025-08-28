import "./globals.css";

export const metadata = {
  title: "Feydey AI",
  description: "AI-powered video and content generation suite",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
