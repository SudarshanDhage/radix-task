import type { Metadata } from "next";
import { Poppins, Rubik } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["700", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "TaskMan - Task Management And Lists Tool",
    template: "%s | TaskMan",
  },
  description: "Streamline your workflow with TaskMan. Manage tasks, collaborate with your team, and boost productivity with our powerful task management software.",
  keywords: ["task management", "productivity", "project management", "team collaboration", "task tracking"],
  authors: [{ name: "TaskMan" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "TaskMan - Task Management And Lists Tool",
    description: "Streamline your workflow with TaskMan. Manage tasks, collaborate with your team, and boost productivity.",
    siteName: "TaskMan",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskMan - Task Management",
    description: "Streamline your workflow with TaskMan. Manage tasks, collaborate with your team, and boost productivity.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${rubik.variable}`}>
      <body className="antialiased">
        {children}
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#1E1C24',
              borderRadius: '8px',
              padding: '16px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
            },
            success: {
              iconTheme: {
                primary: '#0634FF',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
