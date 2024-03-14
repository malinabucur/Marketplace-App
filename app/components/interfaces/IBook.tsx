import { SaleInfo } from "./ISaleInfo";
import { VolumeInfo } from "./IVolumeInfo";

export interface Book {
  id: string;
  volumeInfo: VolumeInfo;
  title: string;
  authors: string | string[];
  publishedDate: string;
  saleInfo: SaleInfo;
  amount: string;
  currencyCode: string;
}
