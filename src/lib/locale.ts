import { uk, enUS, ru } from "date-fns/locale";
import type { Locale } from "date-fns";

/**
 * Автоматически определяет локаль на основе настроек браузера
 * @returns Локаль для date-fns
 */
export function getLocale(): Locale {
  const userLang = navigator.language || navigator.languages?.[0] || "en-US";

  if (userLang.startsWith("uk")) return uk;
  if (userLang.startsWith("ru")) return ru;
  return enUS; // по умолчанию английский
}
