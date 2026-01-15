/**
 * Type-safe helper function to get CSS module class names
 * Prevents runtime errors from invalid class names
 */
export function getClassName<T extends Record<string, string>>(
  styles: T,
  className: string
): string {
  return styles[className as keyof T] || '';
}
