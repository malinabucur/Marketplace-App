export interface BookDetailsProps {
  image: string;
  title: string;
  authors: string | string[];
  publishedDate: string;
  description: string;
  pageCount: number;
  categories: string;
  language: string;
  amount: string;
  currencyCode: string;
  addToWishList: (title: string, authors: string | string[], image: string) => void;
  addToCart: (title: string, image: string, authors: string | string[], amount: string, currencyCode: string) => void;
}
