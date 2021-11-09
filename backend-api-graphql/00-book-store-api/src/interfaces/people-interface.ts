export interface IPeople {
  id: string;
  name: string;
  email: string;
  website?: string;
  github?: string;
  twitter?: string;
  books: Array<string>;
}
