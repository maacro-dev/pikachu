
// change underscores/dashes to spaces
// title case
export function sanitizeSlug(str: string): string {
  return str
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
