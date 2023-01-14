import React from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Root, Popup } from "popup-ui";
import { db } from "../Firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import Snow from "react-native-snow-bg";
import Modal from "react-native-modal";
import { Form, FormItem } from "react-native-form-component";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";

// TO-DO: Write username on top of the page
// TO-DO: Duplicate words forbidden, but should I check every word for every user?

const WordList = ({ navigation, route }) => {
  const [addedWord, setAddedWord] = React.useState("");
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isWordModalVisible, setWordsModalVisible] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [filteredWord, setFilteredWord] = React.useState([]);
  const [words, setWords] = React.useState([]);
  const [selectedId, setSelectedId] = React.useState(null);
  const [wordData, setWordData] = React.useState({});
  const [name, setName] = React.useState("");
  const [turkishInput, setTurkishInput] = React.useState("");
  const [englishInput, setEnglishInput] = React.useState("");
  const [isUpdateModalVisible, setUpdateModalVisible] = React.useState(false);

  const wordsCollectionRef = collection(db, "words");

  const auth = getAuth();

  React.useEffect(() => {
    const setAuth = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setName(user.displayName);

          // ...
        } else {
          setName("XXX");
        }
      });
    };
    setAuth();
  });

  React.useEffect(() => {
    const getWords = async () => {
      const data = await getDocs(wordsCollectionRef);

      setWords(
        data.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((word) => word.uid == auth.currentUser.uid)
      );
    };
    getWords();
  }, []);

  React.useEffect(() => {
    setFilteredWord(
      words.filter(
        (word) =>
          word.turkish.toLowerCase().includes(search.toLowerCase()) ||
          word.english.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, words]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const wordsModal = () => {
    setWordsModalVisible(!isWordModalVisible);
  };

  const updateModal = () => {
    setWordsModalVisible(false);
    setUpdateModalVisible(!isUpdateModalVisible);
  };

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.wordTouchlables, backgroundColor]}
    >
      <Text style={[styles.turkishWord, textColor]}>🇹🇷 {item.turkish}</Text>
      <Text style={[styles.englishWord, textColor]}>🇬🇧 {item.english}</Text>
    </TouchableOpacity>
  );

  function checkWords() {
    toggleModal();
    setEnglishInput("");
    setTurkishInput("");
    if (turkishInput.length == 0 || englishInput.length == 0) {
      Popup.show({
        type: "Danger",
        title: "Invalid words",
        button: true,
        textBody: "One or two words are empty. Please enter correctly",
        buttontext: "Ok",

        callback: () => Popup.hide(),
      });
      return false;
    }
    if (turkishInput.length > 0 && englishInput.length > 0) {
      addDoc(wordsCollectionRef, {
        turkish: turkishInput,
        english: englishInput,
        uid: auth.currentUser.uid,
      }).then(() => {
        Popup.show({
          type: "Success",
          title: "Word added successfully",
          button: true,
          textBody: "Congrats! Your word added to list",
          buttontext: "Ok",

          callback: () => Popup.hide(),
        });
      });
    }
  }

  function checkUpdateWord() {
    wordsModal();
    setUpdateModalVisible(false);
    if (wordData.turkish.length > 0 && wordData.english.length > 0) {
      updateDoc(doc(db, "words", selectedId), {
        turkish: wordData.turkish,
        english: wordData.english,
      }).then(() => {
        Popup.show({
          type: "Warning",
          title: "Word updated successfully",
          button: true,
          textBody: "Your word updated, please refresh list",
          buttontext: "Ok",

          callback: () => Popup.hide(),
        });
      });
    }
  }

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#3BB894" : "#fff";
    const color = item.id === selectedId ? "black" : "black";
    return (
      <Item
        item={item}
        onPress={() => {
          setUpdateModalVisible(false);
          setWordsModalVisible(!isWordModalVisible);
          setSelectedId(item.id);
          setWordData({ english: item.english, turkish: item.turkish });
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <Root>
      <View style={styles.firstContainer}>
        <Snow fullScreen snowflakesCount={100} fallSpeed="medium" />

        <View style={styles.greenBg}>
          <TouchableOpacity
            onPress={() => {
              signOut(auth)
                .then(() => {
                  console.log("Signed out successfully");
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            <Image
              source={require("../images/log-out.png")}
              style={styles.images1Bg}
            />
          </TouchableOpacity>

          <View style={styles.viewStyles}>
            <View style={{ width: "50%" }}>
              <Text
                style={{
                  fontSize: 28,
                  color: "#FFF",
                  fontWeight: "bold",
                }}
              >
                Hello {name}
              </Text>
            </View>
            <View style={{ width: "50%", alignItems: "flex-end" }}>
              <Image
                source={require("../images/g.png")}
                style={{ height: 60, width: 60, elevation: 3 }}
              />
            </View>
          </View>
        </View>
        <LinearGradient
          colors={["rgba(0,164,109,0.4)", "transparent"]}
          style={{
            left: 0,
            right: 0,
            height: 100,
            marginTop: -45,
            elevation: 3,
          }}
        >
          <View
            style={{
              backgroundColor: "#FFF",
              paddingVertical: 8,
              paddingHorizontal: 20,
              marginHorizontal: 20,
              borderRadius: 15,
              marginTop: 25,
              flexDirection: "row",
              alignItems: "center",
              elevation: 1,
            }}
          >
            <TextInput
              placeholder="Search"
              placeholderTextColor="#b1e5d3"
              style={{
                fontWeight: "bold",
                fontSize: 18,
                width: 300,
              }}
              value={filteredWord}
              onChangeText={(e) => setSearch(e)}
            />
            <Image
              source={require("../images/3.png")}
              style={{ height: 20, width: 20 }}
            />
          </View>
        </LinearGradient>

        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            width: "100%",
            alignItems: "center",
          }}
        >
          <View style={{ width: "50%" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 17,
                color: "#585a61",
              }}
            >
              Your Favourites
            </Text>
            <View
              style={{
                height: 4,
                backgroundColor: "#b1e5d3",
                width: 122,
                marginTop: -5,
              }}
            ></View>
          </View>
          <View style={{ width: "50%", alignItems: "flex-end", elevation: 1 }}>
            <View
              style={{
                backgroundColor: "#00a46c",
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 15,
                elevation: 1,
              }}
            >
              <View style={{ elevation: 1 }}>
                <TouchableOpacity
                  onPress={toggleModal}
                  style={{ elevation: 1 }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 13,
                      elevation: 1,
                    }}
                  >
                    Add Word
                  </Text>
                </TouchableOpacity>
                <Modal
                  isVisible={isModalVisible}
                  style={{
                    flex: 1,
                    // flexDirection: "row",
                    paddingHorizontal: 20,
                    marginLeft: 20,
                    marginRight: 20,
                    alignItems: "center",
                  }}
                >
                  <LinearGradient
                    style={[
                      {
                        display: "flex",
                        height: 500,
                        width: 300,
                        // justifyContent: "center",
                        borderRadius: 15,
                        alignItems: "center",
                      },
                    ]}
                    colors={["#92dc7e", "#459031"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <View>
                      <TouchableOpacity
                        style={{
                          width: 60,
                          height: 45,
                          // paddingVertical: ,
                          // marginHorizontal: 24,
                        }}
                        onPress={() => {
                          toggleModal();
                        }}
                      >
                        <Image
                          source={require("../images/x-mark.png")}
                          style={{
                            height: 40,
                            width: 40,
                            marginTop: 10,
                            left: 130,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        // flexDirection: "row",
                        paddingHorizontal: 20,
                        marginLeft: 20,
                        marginRight: 20,
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={require("../images/demo.png")}
                        style={{
                          height: 150,
                          width: 200,
                          marginTop: -20,
                          marginBottom: 10,
                        }}
                      />
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          textShadowColor: "black",
                          fontSize: 19,
                          textAlign: "center",
                          marginBottom: 10,
                        }}
                      >
                        Add a word to your dictionary
                      </Text>

                      <Form
                        onButtonPress={() => {
                          checkWords();
                        }}
                        buttonStyle={styles.formButton}
                      >
                        <FormItem
                          style={styles.formItem}
                          label="English Word"
                          labelStyle={styles.formLabel}
                          isRequired
                          value={englishInput}
                          onChangeText={(word) => setEnglishInput(word)}
                          showErrorIcon
                        />
                        <FormItem
                          style={styles.formItem}
                          label="Turkish Word"
                          isRequired
                          value={turkishInput}
                          labelStyle={styles.formLabel}
                          onChangeText={(word) => setTurkishInput(word)}
                        />
                      </Form>
                    </View>
                  </LinearGradient>
                </Modal>
              </View>
            </View>
          </View>
        </View>

        <FlatList
          data={filteredWord}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />

        <Modal
          /* BOTTOM MODAL  */
          isVisible={isWordModalVisible}
          style={{
            flex: 1,
          }}
          onSwipeComplete={() => setWordsModalVisible(false)}
          swipeDirection={"down"}
        >
          <View style={styles.modal}>
            <TouchableOpacity
              style={{
                width: 60,
                height: 45,
                alignSelf: "center",
                justifyContent: "center",
                // alignItems: "center",
                marginBottom: 20,
              }}
              onPress={() => {
                setWordsModalVisible(false);
              }}
            >
              <Image
                source={require("../images/x-mark.png")}
                style={{
                  height: 40,
                  width: 40,
                  marginTop: 10,
                  // left: 130,
                  alignSelf: "center",
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textShadowColor: "black",
                fontSize: 19,
                textAlign: "center",
                marginBottom: 10,
                marginTop: 20,
              }}
            >
              Word Details
            </Text>
            <View style={styles.wordTouchables}>
              <Text style={styles.turkishWord}>🇹🇷 {wordData.turkish}</Text>
              <Text style={styles.englishWord}>🇬🇧 {wordData.english}</Text>
            </View>
            <Modal
              isVisible={isUpdateModalVisible}
              style={{
                flex: 1,
                paddingHorizontal: 20,
                marginLeft: 20,
                marginRight: 20,
                alignItems: "center",
              }}
              onSwipeComplete={() => setUpdateModalVisible(false)}
              swipeDirection={"right"}
            >
              <View
                style={{
                  // flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 60,
                    height: 45,
                  }}
                  onPress={() => {
                    updateModal();
                  }}
                >
                  <Image
                    source={require("../images/x-mark.png")}
                    style={{
                      position: "absolute",
                      height: 40,
                      width: 40,
                      marginTop: 10,
                      left: 130,
                      zIndex: 1,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ zIndex: 3 }}>
                <LinearGradient
                  style={[
                    {
                      display: "flex",
                      height: 500,
                      width: 300,
                      borderRadius: 15,
                      alignItems: "center",
                      zIndex: 99,
                    },
                  ]}
                  colors={["#7B54B1", "#9982BB"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <View
                    style={{
                      // flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        width: 60,
                        height: 45,
                        zIndex: 1,
                      }}
                      onPress={() => updateModal()}
                    >
                      <Image
                        source={require("../images/x-mark.png")}
                        style={{
                          position: "absolute",
                          height: 40,
                          width: 40,
                          marginTop: 10,
                          left: 130,
                        }}
                      />
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      // flexDirection: "row",
                      paddingHorizontal: 20,
                      marginLeft: 20,
                      marginRight: 20,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("../images/update.png")}
                      style={{
                        height: 150,
                        width: 200,
                        marginTop: -10,
                        marginBottom: 10,
                      }}
                    />
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        textShadowColor: "black",
                        fontSize: 19,
                        textAlign: "center",
                        marginBottom: 10,
                      }}
                    >
                      Update words translation
                    </Text>

                    <Form
                      onButtonPress={() => {
                        checkUpdateWord();
                      }}
                      buttonStyle={styles.formButton}
                    >
                      <FormItem
                        style={styles.formItem}
                        label="English Word"
                        labelStyle={styles.formLabel}
                        isRequired
                        value={wordData.english}
                        onChangeText={(word) =>
                          setWordData({ ...wordData, english: word })
                        }
                        showErrorIcon
                      />
                      <FormItem
                        style={styles.formItem}
                        label="Turkish Word"
                        isRequired
                        value={wordData.turkish}
                        labelStyle={styles.formLabel}
                        onChangeText={(word) =>
                          setWordData({ ...wordData, turkish: word })
                        }
                      />
                    </Form>
                  </View>
                </LinearGradient>
              </View>
            </Modal>
            <TouchableOpacity
              style={{
                width: 60,
                height: 45,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
              }}
              onPress={() => {
                // wordsModal();

                // setWordsModalVisible(false);

                setUpdateModalVisible(true);

                // updateModal();
              }}
            >
              <LinearGradient
                style={[
                  {
                    flex: 1,
                    borderRadius: 10,
                    width: 100,
                    alignItems: "center",
                    justifyContent: "center",
                    // paddingTop: 10,
                  },
                ]}
                colors={["#FF5858", "#ff9494"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text
                  style={{
                    display: "flex",
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                >
                  Update translation
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              // DELETE WORD ACTION
              style={{
                width: 60,
                height: 45,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
              }}
              onPress={() => {
                deleteDoc(doc(db, "words", selectedId));
                wordsModal();
                Popup.show({
                  type: "Danger",
                  title: "Word removed",
                  button: true,
                  textBody: "Word removed from your list successfully",
                  buttontext: "Ok",

                  callback: () => Popup.hide(),
                });
              }}
            >
              <LinearGradient
                style={[
                  {
                    flex: 1,
                    borderRadius: 10,
                    width: 100,
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ]}
                colors={["#FF5858", "#ff9494"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text
                  style={{
                    display: "flex",
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                >
                  Delete word from my list
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </Root>
  );
};
export default WordList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 3,
  },
  firstContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    elevation: 3,
  },
  greenBg: {
    backgroundColor: "#00a46c",
    height: "35%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    elevation: 3,
  },
  images1Bg: {
    height: 20,
    width: 20,
    marginTop: 50,
    elevation: 3,
  },
  viewStyles: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    width: "100%",
    elevation: 3,
  },
  turkishWord: {
    flexDirection: "row",
    paddingTop: 10,
    paddingHorizontal: 10,
    fontWeight: "normal",
    fontSize: 20,
  },
  englishWord: {
    paddingHorizontal: 10,
    fontWeight: "normal",
    paddingTop: 3,
    fontSize: 20,
  },
  wordTouchlables: {
    height: 80,
    elevation: 2,
    backgroundColor: "#FFF",
    marginLeft: 20,
    marginTop: 20,
    borderRadius: 15,
    marginBottom: 10,
    width: "90%",
  },
  wordTouchables: {
    height: 100,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    marginTop: 20,
    borderRadius: 15,
    marginBottom: 10,
    width: "90%",
  },
  modal: {
    flexGrow: 1,
    padding: 20,
    margin: 0,
    flex: 1,
    justifyContent: "flex-end",
    height: 30,
    top: 400,
    backgroundColor: "grey",
    borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#3BB894",
  },
  formItem: {
    width: 200,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: "row",
    alignItems: "center",
  },
  formLabel: {
    flex: 1,
    color: "black",
    fontWeight: "bold",
    fontSize: 14,
    justifyContent: "center",
    textAlign: "center",
  },
  formButton: {
    backgroundColor: "tomato",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -5,
    borderRadius: 29,
    marginTop: 5,
  },
});
