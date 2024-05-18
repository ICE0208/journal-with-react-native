import { Timestamp } from "firebase/firestore";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Journal from "./Journal";

interface Props {
  isLoading: boolean;
  datas: {
    content: string;
    createdAt: Timestamp;
    id: string;
  }[];
  onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export default function Journals({ datas, isLoading, onScroll }: Props) {
  return (
    <>
      {isLoading ? (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Loading...</Text>
        </View>
      ) : datas.length > 0 ? (
        <ScrollView
          contentContainerStyle={styles.datasContainer}
          onScroll={onScroll}
          scrollEventThrottle={100}
        >
          {datas.map((data) => (
            <Journal
              key={data.id}
              textData={data.content}
              id={data.id}
              createdAt={data.createdAt?.toDate() ?? new Date()}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Nothing Here</Text>
          <Text style={styles.infoText2}>
            + 버튼을 눌러서 새 일기를 작성해주세요.
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  datasContainer: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 60,
    width: "100%",
    display: "flex",
    gap: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 120,
    gap: 16,
  },
  infoText: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
  },
  infoText2: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
});
