export function quickFactsToArray(record: Record<string, string>) {
  return Object.entries(record).map(([key, value]) => {
    const colon = key.indexOf(":");
    return {
      icon: colon === -1 ? "map-pin" : key.slice(0, colon),
      label: colon === -1 ? key : key.slice(colon + 1),
      value,
    };
  });
}

export function quickFactsToRecord(arr: { icon: string; label: string; value: string }[]) {
  return Object.fromEntries(arr.map(f => [`${f.icon}:${f.label}`, f.value]));
}
