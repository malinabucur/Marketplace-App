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
  addToCart: (title: string) => void;
}
