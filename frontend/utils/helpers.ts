export function emptyStringToUndef(value: string, originalValue: string) {
  if (typeof originalValue === "string" && originalValue === "") {
    return undefined;
  }
  return value;
}
