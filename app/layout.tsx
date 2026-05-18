import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotBubble from "@/components/ChatbotBubble";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Mark Manalo — Software Engineer",
  description:
    "Portfolio of a software engineer passionate about building beautiful digital experiences.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{localStorage.setItem('theme','light');document.documentElement.setAttribute('data-theme','light');}catch(e){}})();`,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            touchAction: "none",
            userSelect: "none",
            WebkitUserSelect: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "120px",
            opacity: 0.15,
          }}
        />
        <ThemeProvider>
          <Navbar />
          <main style={{ minHeight: "100vh", paddingTop: "68px" }}>
            {children}
          </main>
          <Footer />
          <ChatbotBubble />
        </ThemeProvider>
      </body>
    </html>
  );
}
