export interface ToolListItemData {
  new: boolean,
  type: string,
  id: string,
  form: Array<FieldData>
}

export type ToolCategoryData = Array<string>

export type FormatOption = 'withArcTap' | 'positive' | 'nonNegative' | 'int' | 'float'

export interface FieldData {
  type: 'aff' | 'arc' | 'number' | 'bezier' | 'easing',
  id: string,
  format?: Array<FormatOption>,
  required: boolean
}

export interface ArcToolModule {
  id: string,
  type: string,
  form: Array<FieldData>
  action?: (input: Object) => ArcToolResult
}

export interface ArcToolCategory {
  [categoryId: string]: Array<string>
}

export interface ArcToolPageData extends ArcToolModule {
  category: ArcToolCategory
  pagePath: string
}

export interface ArcToolResult {
  code: number,
  result: string
}

export interface HistoryItemData {
  value: string,
  tool: string,
  time: number
}