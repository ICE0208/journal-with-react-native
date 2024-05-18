import { Timestamp } from "firebase/firestore";

interface JournalData {
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp | undefined;
  id: string;
}

export type JournalDatas = JournalData[];
