import { VolumeInfo } from "./IVolumeInfo";

export interface BookCardProps {
  id: string;
  image: string;
  title: string;
  authors: string;
  publishedDate: string;
  volumeInfo: VolumeInfo;
}
