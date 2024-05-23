import { JournalDatas } from "@myTypes/JournalDatas";
import { RootStackParamList } from "@myTypes/RootStackParamList";
import { CommonActions, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import BackSvg from "assets/svgs/BackSvg";
import UserSvg from "assets/svgs/UserSvg";
import DateGrid from "components/DataGrid";
import SvgButton from "components/SvgButton";
import { StatusBar } from "expo-status-bar";
import { signOut } from "firebase/auth";
import { auth } from "firebaseConfig";
import { useFirestoreSub } from "hooks/useFirestoreSub";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import getDateKey from "utils/getDateKey";

type UserScreenNavigationProp = StackNavigationProp<RootStackParamList, "User">;
type UserScreenRouteProp = RouteProp<RootStackParamList, "User">;

type Props = {
  navigation: UserScreenNavigationProp;
  route: UserScreenRouteProp;
};

export default function UserScreen({ navigation, route }: Props) {
  const { userName, journalDatas } = route.params;
  const { unSubscribe } = useFirestoreSub();

  const handleLogoutBtn = async () => {
    try {
      // 일기 데이터 구독 해제
      unSubscribe();
      // 로그아웃 처리
      await signOut(auth);
      // 모든 네비게이션을 SignIn 페이지 하나로 초기화하기
      const targetScreenName: keyof RootStackParamList = "SignIn";
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: targetScreenName }],
        })
      );
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  // 일기 작성 연속일 구하기
  const calculateStreak = (journalDatas: JournalDatas): number => {
    const today = new Date();
    const dateSet = new Set(
      journalDatas.map((journalData) =>
        getDateKey(journalData.createdAt.toDate())
      )
    );

    let streak = 0;
    let currentDate = new Date(today);

    // 오늘을 포함한 연속 일기 작성 일수 계산
    while (dateSet.has(getDateKey(currentDate))) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }

    // 오늘 일기를 쓰지 않은 경우 어제까지의 연속 일기 작성 일수 계산
    if (streak === 0) {
      currentDate = new Date(today);
      currentDate.setDate(currentDate.getDate() - 1);
      while (dateSet.has(getDateKey(currentDate))) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      }
    }

    return streak;
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={{ backgroundColor: "slateblue", flex: 1 }}>
        <SafeAreaView
          style={{
            paddingTop: 30,
            paddingHorizontal: 16,
          }}
        >
          <View
            style={{
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 32, fontWeight: "700" }}>
              내 정보
            </Text>
            <View style={{ position: "absolute", left: 0 }}>
              <SvgButton
                hitSlop={16}
                SvgComponent={BackSvg}
                onPress={() => navigation.pop()}
              />
            </View>
          </View>
        </SafeAreaView>
        <View
          style={{
            paddingHorizontal: 50,
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          {/* 가상 프로필 이미지 */}
          <View
            style={{
              width: 80,
              height: 80,
              marginTop: 10,
              backgroundColor: "#f3f3f345",
              borderRadius: 40,
              overflow: "hidden",
            }}
          >
            <View style={{ top: 14 }}>{UserSvg}</View>
          </View>
          {/* 유저 네임 */}
          <Text
            style={{
              padding: 14,
              color: "white",
              fontSize: 28,
              fontWeight: "600",
              fontStyle: "italic",
            }}
          >
            {userName}
          </Text>
          {/* 작성한 일기 */}
          <View
            style={{
              marginTop: 16,
              width: "100%",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
              {`작성한 일기 : ${journalDatas.length}개`}
            </Text>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
              {`연속 작성 일수 : ${calculateStreak(journalDatas)}일`}
            </Text>
          </View>
          {/* 일기 잔디 */}
          <View style={{ marginVertical: 8 }} />
          <DateGrid journalData={journalDatas} />
          {/* 공백 */}
          <View style={{ flexGrow: 1 }} />
          {/* 로그아웃 버튼 */}
          <SafeAreaView
            style={{
              paddingBottom: 20,
              width: "100%",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <Pressable
                onPress={handleLogoutBtn}
                hitSlop={8}
                style={({ pressed }) => [
                  { opacity: pressed ? 0.8 : 1 },
                  {
                    width: "50%",
                    backgroundColor: "white",
                    borderRadius: 20,
                    margin: 12,
                  },
                ]}
              >
                <Text
                  style={{
                    color: "slateblue",
                    paddingVertical: 12,
                    paddingHorizontal: 30,
                    textAlign: "center",
                    fontStyle: "italic",
                    fontWeight: "700",
                    fontSize: 16,
                  }}
                >
                  LogOut
                </Text>
              </Pressable>
            </View>
          </SafeAreaView>
        </View>
      </View>
    </>
  );
}
