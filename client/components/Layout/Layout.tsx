import React, { useState, useEffect } from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Zap } from "lucide-react";
import { breakingNews } from "@/services/data.service";
import "./Layout.css";

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
    <div className="layout bg-background">
      {/* Breaking News Ticker */}
      {showBreakingNews && (
        <div className="layout__breaking-news">
          <div className="layout__breaking-news-container">
            <div className="layout__breaking-news-content">
              <div className="layout__breaking-news-label">
                <Zap className="h-4 w-4" />
                <span className="layout__breaking-news-label-text">
                  ÚLTIMA HORA
                </span>
              </div>
              <div className="layout__breaking-news-text">
                <span className="layout__breaking-news-message">
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
