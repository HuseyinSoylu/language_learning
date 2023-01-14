// components/signup.js
import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import app from "../Firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { colors } from "../themes/Colors";
import { units } from "../themes/Units";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import SocialMediaCard from "../components/SocialMediaCard";

export default function Register({ navigation }) {
  const [name, setName] = React.useState("");
  const [mail, setMail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const auth = getAuth(app);

  const register = async (e) => {
    if (name.length == 0) {
      alert("Name cannot be empty");
    } else {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        mail,
        password
      );
      console.log(`User ${user.uid} created`);
      await updateProfile(user, {
        displayName: name,
      });
      console.log("User profile updated");
    }
  };

  const onClickLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.imageContainer}>
          <Image source={require("../../assets/svgs/circle.png")} />
          <Image source={require("../../assets/svgs/orangeCircle.png")} />
        </View>
        <View style={styles.bodyContainer}>
          <View>
            <>
              <Text style={styles.title}>Sign Up</Text>
              <View style={{ marginTop: units.height / 27 }}>
                <Text style={styles.emailText}>Name</Text>
                <CustomInput
                  placeHolder="Your Name"
                  type="name"
                  value={name}
                  onChangeText={(val) => setName(val)}
                />
              </View>
              <View style={{ marginTop: units.height / 27 }}>
                <Text style={styles.emailText}>E-mail</Text>
                <CustomInput
                  placeHolder="Your E-mail"
                  type="email-address"
                  value={mail}
                  onChangeText={(val) => setMail(val)}
                />
              </View>
              <View style={{ marginTop: units.height / 32 }}>
                <Text style={styles.emailText}>Password</Text>
                <CustomInput
                  placeHolder="Your password"
                  value={password}
                  onChangeText={(val) => setPassword(val)}
                  secure
                />
              </View>
              <View style={styles.buttonContainer}>
                <CustomButton title="Sign Up" onPress={() => register()} />
                <View style={styles.loginContainer}>
                  <Text>Already have an account? </Text>
                  <TouchableOpacity onPress={onClickLogin}>
                    <Text style={{ color: colors.ORANGE }}>Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>

            <View style={styles.signUpContainer}>
              <View style={styles.line} />
              <Text style={{ marginHorizontal: units.width / 16 }}>
                Sign up with
              </Text>
              <View style={styles.line} />
            </View>
            <View style={{ marginVertical: units.height / 55 }}>
              <SocialMediaCard />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  title: {
    color: colors.BLACK,
    fontSize: 36,
    fontWeight: "600",
  },
  bodyContainer: {
    paddingHorizontal: units.width / 14,
    marginTop: units.height / 40,
  },
  emailText: {
    color: colors.DARKGRAY,
    fontSize: 16,
    marginBottom: units.height / 67,
  },
  buttonContainer: {
    marginHorizontal: units.width / 9,
    marginVertical: units.height / 25,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: units.height / 25,
  },
  line: {
    height: 1,
    width: units.width / 3.5,
    backgroundColor: colors.GRAY,
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: units.height / 35,
  },
  errorText: {
    color: colors.ORANGE,
    marginTop: units.height / 101,
  },
});
