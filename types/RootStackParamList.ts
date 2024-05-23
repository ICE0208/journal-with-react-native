import { JournalDatas } from "./JournalDatas";

export type RootStackParamList = {
  SignIn: { signUpSuccess: boolean };
  SignUp: undefined;
  Home: { userName: string };
  New: undefined;
  Edit: { journalId: string };
  User: { userName: string; journalDatas: JournalDatas };
};
