export type ToolCategoryData = Array<string>;

export type Category = "chart" | "arc" | "timing"

export type CategoryWithNew = Category | "new"

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
