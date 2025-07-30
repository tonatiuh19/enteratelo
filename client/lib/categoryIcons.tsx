import React from "react";
import {
  FaLaptopCode,
  FaFilm,
  FaHeartbeat,
  FaFlask,
  FaTheaterMasks,
  FaGlobe,
  FaFlag,
  FaMapMarkerAlt,
  FaFutbol,
  FaNewspaper,
  FaMicrochip,
  FaGamepad,
  FaMusic,
  FaCamera,
  FaCar,
  FaHome,
  FaUtensils,
  FaGraduationCap,
  FaDollarSign,
} from "react-icons/fa";

/**
 * Get React Icon component based on category icon
 * @param iconClass - The icon class or category name
 * @param className - CSS classes to apply to the icon
 * @returns JSX.Element - React Icon component
 */
export const getCategoryIcon = (
  iconClass: string,
  className: string = "w-5 h-5",
): JSX.Element => {
  const iconMap: { [key: string]: JSX.Element } = {
    // Font Awesome class mappings
    "fa-microchip": <FaMicrochip className={className} />,
    "fa-laptop-code": <FaLaptopCode className={className} />,
    "fa-film": <FaFilm className={className} />,
    "fa-heartbeat": <FaHeartbeat className={className} />,
    "fa-flask": <FaFlask className={className} />,
    "fa-theater-masks": <FaTheaterMasks className={className} />,
    "fa-globe": <FaGlobe className={className} />,
    "fa-flag": <FaFlag className={className} />,
    "fa-map-marker-alt": <FaMapMarkerAlt className={className} />,
    "fa-futbol": <FaFutbol className={className} />,
    "fa-gamepad": <FaGamepad className={className} />,
    "fa-music": <FaMusic className={className} />,
    "fa-camera": <FaCamera className={className} />,
    "fa-car": <FaCar className={className} />,
    "fa-home": <FaHome className={className} />,
    "fa-utensils": <FaUtensils className={className} />,
    "fa-graduation-cap": <FaGraduationCap className={className} />,
    "fa-dollar-sign": <FaDollarSign className={className} />,

    // Category name mappings (English and Spanish)
    Tecnología: <FaLaptopCode className={className} />,
    Technology: <FaLaptopCode className={className} />,
    Tech: <FaLaptopCode className={className} />,
    Entretenimiento: <FaFilm className={className} />,
    Entertainment: <FaFilm className={className} />,
    Salud: <FaHeartbeat className={className} />,
    Health: <FaHeartbeat className={className} />,
    Ciencia: <FaFlask className={className} />,
    Science: <FaFlask className={className} />,
    Cultura: <FaTheaterMasks className={className} />,
    Culture: <FaTheaterMasks className={className} />,
    Internacional: <FaGlobe className={className} />,
    International: <FaGlobe className={className} />,
    Nacional: <FaFlag className={className} />,
    National: <FaFlag className={className} />,
    Local: <FaMapMarkerAlt className={className} />,
    Deportes: <FaFutbol className={className} />,
    Sports: <FaFutbol className={className} />,
    Gaming: <FaGamepad className={className} />,
    Juegos: <FaGamepad className={className} />,
    Música: <FaMusic className={className} />,
    Music: <FaMusic className={className} />,
    Fotografía: <FaCamera className={className} />,
    Photography: <FaCamera className={className} />,
    Automóviles: <FaCar className={className} />,
    Cars: <FaCar className={className} />,
    Hogar: <FaHome className={className} />,
    Home: <FaHome className={className} />,
    Comida: <FaUtensils className={className} />,
    Food: <FaUtensils className={className} />,
    Educación: <FaGraduationCap className={className} />,
    Education: <FaGraduationCap className={className} />,
    Finanzas: <FaDollarSign className={className} />,
    Finance: <FaDollarSign className={className} />,
  };

  // If it's a Font Awesome class or category name, use the mapping
  if (iconClass && iconMap[iconClass]) {
    return iconMap[iconClass];
  }

  // Default fallback icon
  return <FaNewspaper className={className} />;
};

/**
 * Get category icon as emoji (fallback for places that need string icons)
 * @param iconClass - The icon class or category name
 * @returns string - Emoji representation
 */
export const getCategoryEmoji = (iconClass: string): string => {
  const emojiMap: { [key: string]: string } = {
    "fa-microchip": "💻",
    "fa-laptop-code": "💻",
    "fa-film": "🎬",
    "fa-heartbeat": "❤️",
    "fa-flask": "🔬",
    "fa-theater-masks": "🎭",
    "fa-globe": "🌍",
    "fa-flag": "🚩",
    "fa-map-marker-alt": "📍",
    "fa-futbol": "⚽",
    "fa-gamepad": "🎮",
    "fa-music": "🎵",
    "fa-camera": "📷",
    "fa-car": "🚗",
    "fa-home": "🏠",
    "fa-utensils": "🍽️",
    "fa-graduation-cap": "🎓",
    "fa-dollar-sign": "💰",

    Tecnología: "💻",
    Technology: "💻",
    Tech: "💻",
    Entretenimiento: "🎬",
    Entertainment: "🎬",
    Salud: "❤️",
    Health: "❤️",
    Ciencia: "🔬",
    Science: "🔬",
    Cultura: "🎭",
    Culture: "🎭",
    Internacional: "🌍",
    International: "🌍",
    Nacional: "🚩",
    National: "🚩",
    Local: "📍",
    Deportes: "⚽",
    Sports: "⚽",
    Gaming: "🎮",
    Juegos: "🎮",
    Música: "🎵",
    Music: "🎵",
    Fotografía: "📷",
    Photography: "📷",
    Automóviles: "🚗",
    Cars: "🚗",
    Hogar: "🏠",
    Home: "🏠",
    Comida: "🍽️",
    Food: "🍽️",
    Educación: "🎓",
    Education: "🎓",
    Finanzas: "💰",
    Finance: "💰",
  };

  return emojiMap[iconClass] || "📰";
};
