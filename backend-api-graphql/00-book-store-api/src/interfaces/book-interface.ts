export interface IBook {
  id: string;
  title: string;
  isbn: string;
  pageCount: number;
  publishedDate?: string;
  thumbnailUrl?: string;
  shortDescription?: string;
  longDescription?: string;
  status: string;
  authors: Array<string>;
}
