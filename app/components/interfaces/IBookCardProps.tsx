import { SaleInfo } from "./ISaleInfo";
import { VolumeInfo } from "./IVolumeInfo";

export interface BookCardProps {
  id: string;
  image: string;
  title: string;
  authors: string | string[];
  publishedDate: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  amount: string;
  currencyCode: string;
  addToCart: (id: string, title: string, image: string, authors: string | string[], amount: string, currencyCode: string) => void;
}
