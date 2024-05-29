import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.85)",
  },
  modalContainer: {
    flex: 1,
    width: "100%",
    marginTop: 20,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 16,
    marginBottom: 16,
  },
  textInput: {
    width: "100%",
    color: "ghostwhite",
    fontSize: 16,
    flex: 1,
    textAlignVertical: "top",
  },
  imageButtonContainer: {
    width: 60,
    height: 60,
    backgroundColor: "rgb(86, 86, 86)",
    borderRadius: 30,
    position: "absolute",
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
