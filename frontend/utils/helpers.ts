import { boolean } from "yup";
import { ThemeMode } from "./slices/layout";

export function emptyStringToUndef(value: string, originalValue: string) {
  if (typeof originalValue === "string" && originalValue === "") {
    return undefined;
  }
  return value;
}

export function computeDarkMode(conf: ThemeMode, pref: boolean): boolean {
  if (conf === "auto") {
    return pref;
  } else if (conf === "dark") {
    return true;
  } else {
    return false;
  }
}
