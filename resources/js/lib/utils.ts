import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Mengubah nama menjadi format terproteksi (contoh: WAHYU WIJAYA CAHYA → W**U W**A C**A)
 * @param fullName Nama lengkap yang akan dimasking
 * @returns Nama yang sudah dimasking
 */
export const maskName = (fullName: string): string => {
  return fullName
    .split(' ')
    .map(word => {
      if (word.length <= 2) return word; // Tidak masking kata pendek
      
      const firstChar = word[0];
      const lastChar = word[word.length - 1];
      const maskedPart = '*'.repeat(Math.max(0, word.length - 2));
      
      return `${firstChar}${maskedPart}${lastChar}`;
    })
    .join(' ');
};

/**
 * Mengubah nomor telepon menjadi format terproteksi (contoh: 12345678 → 12***78)
 * @param phoneNumber Nomor telepon yang akan dimasking
 * @param visibleDigits Jumlah digit yang terlihat di awal dan akhir (default: 2)
 * @returns Nomor telepon yang sudah dimasking
 */
export const maskPhoneNumber = (phoneNumber: string, visibleDigits: number = 2): string => {
  if (phoneNumber.length <= visibleDigits * 2) {
    return phoneNumber; // Tidak masking jika terlalu pendek
  }

  const firstPart = phoneNumber.substring(0, 4);
  const lastPart = phoneNumber.substring(phoneNumber.length - visibleDigits);
  const maskedPart = '*'.repeat(phoneNumber.length - (visibleDigits * 2));

  return `${firstPart}${maskedPart}${lastPart}`;
};
