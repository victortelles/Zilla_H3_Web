export interface ToSListGroup {
  title?: string;
  type: "bullet" | "checked" | "crossed" | "numbered";
  items: string[];
}

export interface ToSTableData {
  headers: string[];
  rows: string[][];
}

export interface ToSSection {
  id: string;
  title: string;
  paragraphs?: string[];
  listGroups?: ToSListGroup[];
  tableData?: ToSTableData;
  paragraphsAfter?: string[];
}
