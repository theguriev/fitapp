/**
 * Плавно прокручивает страницу в самый верх
 */
export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
