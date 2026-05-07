
export function normalizeDate(val: unknown) {
  if (val instanceof Date) return val.toISOString().slice(0, 10);
  if (typeof val === "string") return val.replace(/^"|"$/g, "");
  return val;
};

export function formatDate(dateInput: string | Date) {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }

  return date.toLocaleDateString("en-PH", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
