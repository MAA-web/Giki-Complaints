import { GeistSans } from "geist/font/sans";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import RoleButton from "@/components/RoleButton";
import AuthButton from "@/components/AuthButton";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={GeistSans.className}>
      <body className="bg-background text-foreground">
        {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > */}
            <div className="w-full">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                  <RoleButton />
                  <AuthButton />
                </div>
              </nav>
            </div>
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
          {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
