export interface BookDetailsProps {
  id: string;
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
  addToWishList: (id: string, title: string, authors: string | string[], image: string) => void;
  addToCart: (id: string, title: string, image: string, authors: string | string[], amount: string, currencyCode: string) => void;
  isInWishList: boolean;
}
