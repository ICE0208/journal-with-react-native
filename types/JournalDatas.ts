import { Timestamp } from "firebase/firestore";

export interface ImageInfo {
  imageId: string;
  imageURL: string;
}

export interface JournalData {
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp | undefined;
  id: string;
  image: ImageInfo | undefined;
}

export type JournalDatas = JournalData[];
