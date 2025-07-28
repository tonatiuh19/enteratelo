import React from "react";
import { useAppSelector } from "@/store";
import { selectAuthLoading } from "@/store/selectors/authSelectors";
import { selectArticlesLoading } from "@/store/selectors/articlesSelectors";
import { selectUILoading } from "@/store/selectors/uiSelectors";
import "./LoadingProgressBar.css";

export const LoadingProgressBar: React.FC = () => {
  const authLoading = useAppSelector(selectAuthLoading);
  const articlesLoading = useAppSelector(selectArticlesLoading);
  const uiLoading = useAppSelector(selectUILoading);

  // Show loader if any section is loading
  const isLoading = authLoading || articlesLoading || uiLoading;

  if (!isLoading) {
    return null;
  }

  return (
    <div className="loading-progress-bar">
      <div className="loading-progress-bar__fill"></div>
    </div>
  );
};
