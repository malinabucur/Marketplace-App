import { VolumeInfo } from "./IVolumeInfo";

export interface Book {
  id: string;
  volumeInfo: VolumeInfo;
  title: string;
  authors: string;
  publishedDate: string;
}
