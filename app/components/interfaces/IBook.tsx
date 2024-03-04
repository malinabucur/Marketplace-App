import { VolumeInfo } from "./IVolumeInfo";

export interface Book {
  volumeInfo: VolumeInfo;
  title: string;
  authors: string;
  publishedDate: string;
}
