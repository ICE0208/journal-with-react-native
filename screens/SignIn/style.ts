import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 50,
  },
  inputView: {
    display: "flex",
    width: "100%",
    marginBottom: 16,
  },
  inputLabel: {
    fontWeight: "600",
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 1,
    width: "100%",
  },
  loginButton: {
    width: "50%",
    backgroundColor: "slateblue",
    borderRadius: 20,
    margin: 12,
  },
  loginButtonText: {
    color: "white",
    paddingVertical: 12,
    paddingHorizontal: 30,
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "700",
    fontSize: 16,
  },
  signUpButton: {
    marginBottom: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1.2,
  },
  signUpButtonText: {
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
