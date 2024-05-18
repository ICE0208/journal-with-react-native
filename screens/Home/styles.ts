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
    marginHorizontal: 50,
    marginTop: 10,
    marginBottom: 6,
  },
  welcomeText: {
    marginHorizontal: 50,
    fontSize: 16,
    marginBottom: 16,
    color: "ghostwhite",
    fontWeight: "light",
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
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 60,
    width: "100%",
    display: "flex",
    gap: 10,
  },
  nothingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 120,
    gap: 16,
  },
  nothingText: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
  },
  nothingText2: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
});

export default styles;
