// components/login.js
import React, { Component, useState, createContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import app from "../Firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { colors } from "../themes/Colors";
import { units } from "../themes/Units";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SocialMediaCard from "../components/SocialMediaCard";

export default function Login({ navigation }) {
  const [mail, setMail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const auth = getAuth(app);

  const handleSignIn = async () => {
    signInWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        console.log("Signed in successfully");
        const user = userCredential.user;
        // setUid(user.uid);
        // setObjectValue(user.uid);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClickSignUp = () => {
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.imageContainer}>
          <Image source={require("../../assets/svgs/circle.png")} />
          <Image source={require("../../assets/svgs/orangeCircle.png")} />
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.title}>Login</Text>
          <>
            <View style={{ marginTop: units.height / 27 }}>
              <Text style={styles.emailText}>Email</Text>
              <CustomInput
                placeHolder="Your Email address"
                type="email-address"
                value={mail}
                onChangeText={(val) => setMail(val)}
              />
            </View>
            <View style={{ marginTop: units.height / 27 }}>
              <Text style={styles.emailText}>Password</Text>
              <CustomInput
                placeHolder="Password"
                value={password}
                onChangeText={(val) => setPassword(val)}
                secure
              />
            </View>
            <View style={{ marginTop: units.height / 25 }}>
              <TouchableOpacity>
                <Text style={styles.forgotText}>Forgot Password ?</Text>
              </TouchableOpacity>
              <View style={styles.loginContainer}>
                <CustomButton title="LOGIN" onPress={handleSignIn} />
                <View style={styles.signUpContainer}>
                  <Text>Don’t have an account? </Text>
                  <TouchableOpacity onPress={onClickSignUp}>
                    <Text style={{ color: colors.ORANGE }}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.signInContainer}>
                  <View style={styles.line} />
                  <Text style={{ marginHorizontal: units.width / 16 }}>
                    Sign in with
                  </Text>
                  <View style={styles.line} />
                </View>
                <View style={{ marginVertical: units.height / 55 }}>
                  <SocialMediaCard />
                </View>
              </View>
            </View>
          </>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
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
  title: {
    color: colors.BLACK,
    fontSize: 36,
    fontWeight: "600",
  },
  forgotText: {
    color: colors.ORANGE,
    textAlign: "center",
  },
  loginContainer: {
    marginHorizontal: units.width / 9,
    marginVertical: units.height / 25,
  },
  signUpContainer: {
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
  signInContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: units.height / 18,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  errorText: {
    color: colors.ORANGE,
    marginTop: units.height / 101,
  },
});
