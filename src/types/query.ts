export type Query = {
  sortOrder: "asc" | "desc";
  page: number;
  limit: number;
  search: string;
};
