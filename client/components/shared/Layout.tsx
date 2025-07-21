import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Zap } from "lucide-react";
import { breakingNews } from "@/services/data.service";

interface LayoutProps {
  children: React.ReactNode;
  showBreakingNews?: boolean;
}

export function Layout({ children, showBreakingNews = true }: LayoutProps) {
  const [currentBreaking, setCurrentBreaking] = useState(0);

  useEffect(() => {
    if (showBreakingNews) {
      const timer = setInterval(() => {
        setCurrentBreaking((prev) => (prev + 1) % breakingNews.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [showBreakingNews]);

  return (
    <div className="min-h-screen bg-background">
      {/* Breaking News Ticker */}
      {showBreakingNews && (
        <div className="bg-red-600 text-white py-2 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex items-center">
              <div className="flex items-center space-x-2 mr-4 min-w-max">
                <Zap className="h-4 w-4" />
                <span className="font-bold text-sm">ÚLTIMA HORA</span>
              </div>
              <div className="flex animate-pulse">
                <span className="text-sm whitespace-nowrap">
                  {breakingNews[currentBreaking]}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
