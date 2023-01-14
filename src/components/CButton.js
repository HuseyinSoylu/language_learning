import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CButton = ({ text = "Button", onClick }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onClick}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // backgroundColor: "#f4717f",
    backgroundColor: "white",
    padding: 18,
    width: "46%",
    height: 60,
    borderRadius: 10,
    // borderColor: "black",
    borderWith: 5,    
  },
  text: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
  },
});

export default CButton;
