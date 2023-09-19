export type ToolCategoryData = Array<string>;

export type Category = "chart" | "arc" | "timing" | "other";

export type CategoryWithNew = Category | "new";

export interface ArcToolMetadata {
  id: string;
  category: Category;
  path: string;
  endpoint: string;
}

export interface ArcToolResult {
  code: number;
  result: string;
}

export interface HistoryItemData {
  value: string;
  tool: string;
  time: number;
}

export interface ResponseJson<T = any> {
  code: number;
  result: T;
}

export enum StatusCode {
  SUCCESS = 0,
  UNKNOWN_ERR = -1,
  REQUEST_VALIDATION_ERR = 100,
  NOTE_PARSE_ERR = 101,
  NETWORK_ERR = 200,
}
