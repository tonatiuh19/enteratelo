import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts relative image URLs to absolute URLs using the backend domain
 * @param imageUrl - The image URL to process
 * @returns The absolute URL for the image
 */
export function getImageUrl(imageUrl: string | null | undefined): string {
  if (!imageUrl || imageUrl === "/placeholder.svg") {
    return "/placeholder.svg";
  }

  // If it's already an absolute URL, return as is
  if (imageUrl.startsWith("http")) {
    return imageUrl;
  }

  // Convert relative URL to absolute URL
  return `https://garbrix.com/enteratelo${imageUrl}`;
}

export function formatSpanishDate(dateString: string) {
  if (!dateString) return "";
  // Replace space with T for ISO compatibility
  const isoString = dateString.replace(" ", "T");
  const date = new Date(isoString);

  if (isNaN(date.getTime())) return "";

  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const day = date.getDate();
  const monthName = meses[date.getMonth()];
  const year = date.getFullYear();

  // Pad hours, minutes, seconds
  const pad = (n: number) => n.toString().padStart(2, "0");
  const time = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

  return `${day} de ${monthName} ${year}, ${time}`;
}

export function getLatestFormattedDate(dateStr1?: string, dateStr2?: string) {
  // If both are missing, return empty string
  if (!dateStr1 && !dateStr2) return "";

  // If only one is present, return its formatted value
  if (dateStr1 && !dateStr2) return formatSpanishDate(dateStr1);
  if (!dateStr1 && dateStr2) return formatSpanishDate(dateStr2);

  // Both present, compare
  const d1 = new Date(dateStr1.replace(" ", "T"));
  const d2 = new Date(dateStr2.replace(" ", "T"));
  const latest = d1 > d2 ? dateStr1 : dateStr2;
  return formatSpanishDate(latest);
}
