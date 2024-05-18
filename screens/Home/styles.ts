import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
    backgroundColor: "slateblue",
  },
  screenTitle: {
    fontSize: 34,
    fontWeight: "900",
    color: "ghostwhite",
    alignSelf: "flex-start",
    marginHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    width: "100%",
    paddingHorizontal: 8,
  },
  memosContainer: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 60,
    width: "100%",
    display: "flex",
    gap: 10,
  },
  memoContainer: {
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  memoText: {
    color: "ghostwhite",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default styles;
