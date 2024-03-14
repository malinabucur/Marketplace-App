export interface VolumeInfo {
  imageLinks: {
    thumbnail: string;
  };
  title: string;
  authors: string | string[];
  publishedDate: string;
  description: string;
  pageCount: number;
  categories: string;
  language: string;
}
