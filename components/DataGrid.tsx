import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { Timestamp } from "firebase/firestore";

interface JournalData {
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp | undefined;
  id: string;
}

export type JournalDatas = JournalData[];

interface GridData {
  key: string;
  value: number;
  isHighlighted: boolean;
  isToday: boolean;
}

interface DateGridProps {
  journalData: JournalDatas;
}

const numRows = 4;
const numCols = 7;

const getDateKey = (date: Date): string => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const createGridData = (
  rows: number,
  cols: number,
  journalData: JournalDatas
): GridData[] => {
  let data: GridData[] = [];
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 27);

  const dateSet = new Set(
    journalData.map((entry) => getDateKey(entry.createdAt.toDate()))
  );

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + row + col * rows);
      const dateKey = getDateKey(date);

      data.push({
        key: dateKey,
        value: date.getDate(),
        isHighlighted: dateSet.has(dateKey),
        isToday: dateKey === getDateKey(today),
      });
    }
  }
  return data;
};

const GridItem: React.FC<{ item: GridData; itemHeight: number }> = ({
  item,
  itemHeight,
}) => (
  <View
    style={[
      styles.gridItem,
      item.isHighlighted && styles.highlightedItem,
      item.isToday && styles.todayItem,
      { height: itemHeight },
    ]}
  >
    <Text style={item.isToday ? styles.todayDateText : styles.otherDataText}>
      {item.value}
    </Text>
  </View>
);

const DateGrid: React.FC<DateGridProps> = ({ journalData }) => {
  const gridData = createGridData(numRows, numCols, journalData);
  const itemHeight = 40;

  return (
    <View style={{ width: "100%" }}>
      <FlatList
        data={gridData}
        renderItem={({ item }) => (
          <GridItem
            item={item}
            itemHeight={itemHeight}
          />
        )}
        keyExtractor={(item) => item.key}
        numColumns={numCols}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ffffffaa",
    margin: 1.6,
    borderRadius: 8,
  },
  highlightedItem: {
    backgroundColor: "#9470db",
  },
  todayItem: {
    borderWidth: 1.6, // 오늘 날짜의 border를 더 굵게 설정
    borderColor: "white", // 강조된 border 색상
  },
  otherDataText: {
    color: "#ffffffaa",
    fontSize: 12,
    fontWeight: "400",
  },
  todayDateText: {
    fontSize: 12,
    color: "white",
    fontWeight: "800", // 오늘 날짜의 글자를 bold로 설정
  },
});

export default DateGrid;
