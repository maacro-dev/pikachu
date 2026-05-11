
// change underscores/dashes to spaces
// title case
export function sanitizeSlug(str: string): string {
  return str
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function pathToSingularLabel(path: string): string {
  const last = path.split("/").filter(Boolean).pop() ?? "";

  let singular = last;

  if (singular.endsWith("ies")) {
    singular = singular.replace(/ies$/, "y");
  } else if (singular.endsWith("s")) {
    singular = singular.replace(/s$/, "");
  }

  return singular.charAt(0).toUpperCase() + singular.slice(1);
}




