import { useMemo } from "react";
import { getLocale } from "@/lib/locale";
import type { Locale } from "date-fns";

/**
 * Хук для получения локали пользователя
 * @returns Локаль для date-fns
 */
export function useLocale(): Locale {
  return useMemo(() => getLocale(), []);
}
