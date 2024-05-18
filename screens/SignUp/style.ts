import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 50,
    paddingTop: 100,
  },
  signUpButton: {
    width: "50%",
    backgroundColor: "slateblue",
    borderRadius: 20,
    margin: 12,
  },
  signUpButtonText: {
    color: "white",
    paddingVertical: 12,
    paddingHorizontal: 30,
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "700",
    fontSize: 16,
  },
  backButton: {
    marginBottom: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1.2,
  },
  backButtonText: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    color: "black",
    paddingTop: 12,
    textAlign: "center",
    fontWeight: "400",
    fontSize: 16,
  },
});

export default styles;
