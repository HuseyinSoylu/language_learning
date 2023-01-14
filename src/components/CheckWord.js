import { Text, Button, View, StyleSheet } from "react-native";
import { db } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";
import * as React from "react";

export default function CheckWord({ data }) {
  const wordsCollectionRef = collection(db, "words");
  const [words, setWords] = React.useState([]);
  const [alreadyAdded, setAlreadyAdded] = useState(null);

  React.useEffect(() => {
    const getWords = async () => {
      const data = await getDocs(wordsCollectionRef);

      setWords(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getWords();
  }, []);

  if (
    words.find(
      (word) => word.turkish.toLowerCase() === data.turkish.toLowerCase()
    ) ||
    words.find(
      (word) => word.english.toLowerCase() === data.english.toLowerCase()
    )
  ) {
    setAlreadyAdded(true);
  } else {
    setAlreadyAdded(false);
  }

  return(
    console.log(data))
}
