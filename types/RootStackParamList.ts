import { JournalData, JournalDatas } from "./JournalDatas";

export type RootStackParamList = {
  SignIn: { signUpSuccess: boolean };
  SignUp: undefined;
  Home: { userName: string };
  New: undefined;
  Edit: {
    journalId: string;
    editTextData: string;
    editImageData: JournalData["image"] | null;
  };
  User: { userName: string; journalDatas: JournalDatas };
  Image: { imageURL: string };
};
