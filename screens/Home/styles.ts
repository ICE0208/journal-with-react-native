import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
    backgroundColor: "slateblue",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginHorizontal: 46,
    marginTop: 30,
    marginBottom: 20,
  },
  screenTitle: {
    fontSize: 34,
    fontWeight: "900",
    color: "ghostwhite",
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  welcomeText: {
    fontSize: 16,
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
});

export default styles;
