import { Text, View } from "react-native";
import React, { Component } from "react";

export default function Dashboard({ navigation }) {
  return navigation.navigate("WordList", { isLoggedIn: true });
}
