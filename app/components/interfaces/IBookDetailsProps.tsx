export interface BookDetailsProps {
  image: string;
  title: string;
  authors: string | string[];
  publishedDate: string;
  description: string;
  pageCount: number;
  categories: string;
  language: string;
  addToWishList: (title: string) => void;
}
