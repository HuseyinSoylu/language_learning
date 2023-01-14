import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import React, { Component, useState } from "react";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { units } from "../themes/Units";
import { colors } from "../themes/Colors";
import ProfileCard from "../components/ProfileCard";
import { getAuth, updateProfile } from "firebase/auth";

export default function Profile({ navigation }) {
  const auth = getAuth();
  const user = auth.currentUser;

  const [name, setName] = useState(user.displayName);
  const [password, setPassword] = useState("password");
  const [email, setEmail] = useState(user.email);

  function _updateUserData() {
    updateProfile(user, {
      displayName: name,
    });
    console.log("User profile updated");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Image
            source={require("../../assets/images/profileBg.png")}
            style={styles.image}
          />
          <View style={styles.profie}>
            <ProfileCard />
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.editText}>Edit Profile</Text>
        </View>
        <View style={styles.bodyContainer}>
          <View>
            <Text style={styles.fieldTitle}>Full Name</Text>
            <View style={styles.fieldContainer}>
              <CustomInput
                value={name}
                style={styles.userName}
                onChangeText={(text) => setName(text)}
              />
            </View>
          </View>
          <View style={{ marginTop: units.height / 50 }}>
            <Text style={styles.fieldTitle}>E-mail</Text>
            <View style={styles.fieldContainer}>
              <CustomInput
                value={email}
                style={styles.userName}
                onChangeText={(text) => setEmail(text)}
                type="email"
              />
            </View>
          </View>
          <View style={{ marginTop: units.height / 50 }}>
            <Text style={styles.fieldTitle}>Password</Text>
            <View style={styles.fieldContainer}>
              <CustomInput
                value={password}
                style={styles.userName}
                onChangeText={(text) => setPassword(text)}
                type="password"
                secure
              />
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Save"
            onPress={() => {
              _updateUserData();
              navigation.navigate("Your List");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  image: {
    alignSelf: "center",
  },
  profie: {
    position: "absolute",
    bottom: units.height / 41,
    left: 0,
    right: 0,
  },
  userName: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.DARK,
  },
  titleContainer: {
    alignItems: "center",
    marginTop: units.height / -41,
  },
  editText: {
    color: colors.GRAY,
    marginTop: units.height / 81,
  },
  fieldContainer: {
    borderWidth: 1,
    borderColor: colors.ORANGE,
    borderRadius: 10,
    paddingVertical: units.height / 48,
    paddingLeft: units.width / 23,
    marginTop: units.height / 67,
  },
  bodyContainer: {
    marginHorizontal: units.width / 21,
    marginTop: units.height / 25,
  },
  fieldTitle: {
    fontSize: 16,
    color: colors.GRAY,
  },
  buttonContainer: {
    marginHorizontal: units.width / 12,
    marginTop: units.height / 38,
  },
});
