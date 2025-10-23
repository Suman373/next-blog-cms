import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandomHexColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor.padStart(6, '0')}`;
}

export function generateRandomRgbaColor(alpha: number = 0.15): { solid: string, background: string } {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const solidColor = `rgb(${r}, ${g}, ${b})`;
  const lightBackground = `rgba(${r}, ${g}, ${b}, ${alpha})`;
  return { solid: solidColor, background: lightBackground };
}

export function getBaseUrl(){
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (base) return base;
  return "http://localhost:3000"; // fallback to localhost
};