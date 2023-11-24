import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export const handleApiCall = async (endpoint: string, data: any) => {
  const resp = await fetch(`api/${endpoint}`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(data)
  });
  return resp;
}

export function cleanAndUppercase(input: string) {
  // Remove spaces and special characters
  const cleaned = input.replace(/[^a-zA-Z0-9]/g, '');

  // Uppercase all letters
  const uppercased = cleaned.toUpperCase();

  return uppercased;
}