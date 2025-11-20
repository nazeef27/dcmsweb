import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { GradientBackground } from "@/components/GradientBackground";
import { VideoThemeManager, VideoThemeProvider } from "@/components/VideoThemeManager";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Deccan College of Medical Sciences | DCMS",
  description: "One of the oldest and most sought-after medical colleges in Telangana, producing high-caliber medical graduates.",
  keywords: "medical college, DCMS, Deccan College, medical education, Telangana, Hyderabad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <ThemeProvider>
          <VideoThemeProvider>
            <SmoothScroll>
              <VideoThemeManager />
              {/* Lazy load backgrounds for better performance */}
              <div className="fixed inset-0 -z-10 opacity-20" style={{ willChange: 'auto' }}>
                <GradientBackground />
              </div>
              <div className="fixed inset-0 -z-10 opacity-10" style={{ willChange: 'auto' }}>
                <AnimatedBackground />
              </div>
              {children}
            </SmoothScroll>
          </VideoThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

