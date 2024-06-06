import { Timestamp } from "firebase/firestore";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Journal from "./Journal";
import { JournalData, JournalDatas } from "@myTypes/JournalDatas";

interface Props {
  isLoading: boolean;
  datas: JournalDatas;
  onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export default function Journals({ datas, isLoading, onScroll }: Props) {
  const renderItem = ({ item }: { item: JournalData }) => {
    return (
      <Journal
        textData={item.content}
        imageInfo={item.image}
        id={item.id}
        createdAt={item.createdAt?.toDate() ?? new Date()}
      />
    );
  };

  return (
    <>
      {isLoading ? (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Loading...</Text>
        </View>
      ) : datas.length > 0 ? (
        <FlatList
          data={datas}
          renderItem={renderItem}
          keyExtractor={(item) =>
            `${item.id}-${item.updatedAt?.toMillis() ?? 0}`
          }
          contentContainerStyle={styles.memosContainer}
          onScroll={onScroll}
          scrollEventThrottle={100}
        />
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
  memosContainer: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 130,
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
