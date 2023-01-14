import { Text, View, StyleSheet, Button, Image } from "react-native";
import FlipCard from "react-native-flip-card";
import { TouchableOpacity } from "react-native-gesture-handler";
import CButton from "./CButton";
import * as React from "react";
import { db } from "../Firebase";
import { addDoc, collection } from "firebase/firestore";
import { Root, Popup } from "popup-ui";
import { Shadow } from "react-native-shadow-2";
import { getAuth } from "firebase/auth";

export default function Card() {
  const auth = getAuth();

  const wordsCollectionRef = collection(db, "words");

  const [turkishWord, setTurkishWord] = React.useState("");
  const [englishWord, setEnglishWord] = React.useState("");

  let data = [
    {
      english: "abroad",
      turkish: "yurtdışı",
    },
    {
      english: "accept",
      turkish: "kabul etmek",
      V2: "accepted",
      V3: "accepted",
    },
    {
      english: "accident",
      turkish: "kaza,rastlantı",
      V2: ".",
      V3: ".",
    },
    {
      english: "according to",
      turkish: "göre",
      V2: "-",
      V3: "-",
    },
    {
      english: "account",
      turkish: "hesap, açıklamasını yapmak",
      V2: "accounted",
      V3: "accounted",
    },
    {
      english: "accustom",
      turkish: "alıştırmak",
      V2: "accustomed",
      V3: "accustomed",
    },
    {
      english: "ache",
      turkish: "ağrı, acı",
      V2: "-",
      V3: "-",
    },
    {
      english: "actually",
      turkish: "aslında",
      V2: "-",
      V3: "-",
    },
    {
      english: "almost",
      turkish: "neredeyse hemen hemen",
      V2: "-",
      V3: "-",
    },
    {
      english: "apply",
      turkish: "uygulamak, başvurmak",
      V2: "applied",
      V3: "applied",
    },
    {
      english: "argue",
      turkish: "tartışmak",
      V2: "argued",
      V3: "argued",
    },
    {
      english: "around",
      turkish: "sularında,çevrede",
      V2: "-",
      V3: "-",
    },
    {
      english: "as well",
      turkish: "ilave olarak hatta",
      V2: "-",
      V3: "-",
    },
    {
      english: "as/as",
      turkish: "kadar",
      V2: ".",
      V3: ".",
    },
    {
      english: "attire",
      turkish: "kıyafet",
      V2: ".",
      V3: ".",
    },
    {
      english: "award",
      turkish: "ödüllendirmek",
      V2: "awarded",
      V3: "awarded",
    },
    {
      english: "awareness",
      turkish: "farkındalık",
      V2: "-",
      V3: "-",
    },
    {
      english: "awful",
      turkish: "berbat",
      V2: "-",
      V3: "-",
    },
    {
      english: "back out of",
      turkish: "vazgeçmek",
      V2: " backed out of",
    },
    {
      english: "become",
      turkish: "haline gelmek, olmak",
      V2: "became",
      V3: "become",
    },
    {
      english: "bill",
      turkish: "fatura",
    },
    {
      english: "billion",
      turkish: "milyar",
      V2: "-",
      V3: "-",
    },
    {
      english: "boot",
      turkish: "bot, çizme",
      V2: "-",
      V3: "-",
    },
    {
      english: "borrow",
      turkish: "ödünç almak",
      V2: "borrowed",
      V3: "borrowed",
    },
    {
      english: "boss",
      turkish: "patron, patronluk yapmak",
      V2: "-",
      V3: "-",
    },
    {
      english: "both/and",
      turkish: "hem/hemde",
      V2: ".",
      V3: ".",
    },
    {
      english: "bridge",
      turkish: "köprü",
      V2: "-",
      V3: "-",
    },
    {
      english: "brochure",
      turkish: "broşür",
      V3: "-",
    },
    {
      english: "bushiness",
      turkish: "çalı gibi olma",
    },
    {
      english: "business",
      turkish: "işletme",
    },
    {
      english: "buzz",
      turkish: "vızıldamak, uğuldamak",
      V2: "buzzed",
      V3: "buzzed",
    },
    {
      english: "captivity",
      turkish: "tutsaklık",
      V2: "-",
      V3: "-",
    },
    {
      english: "carry",
      turkish: "taşımak",
      V2: "carried ",
      V3: "carried",
    },
    {
      english: "case",
      turkish: "kasa, dava",
    },
    {
      english: "chain",
      turkish: "zincir",
      V2: "-",
      V3: "-",
    },
    {
      english: "challenge",
      turkish: "meydan okumak",
      V2: "challenged",
      V3: "challenged",
    },
    {
      english: "chance",
      turkish: "olanak, şans",
      V2: ".",
      V3: ".",
    },
    {
      english: "cheek",
      turkish: "yanak",
    },
    {
      english: "chestnut",
      turkish: "kestane",
      V2: ".",
      V3: ".",
    },
    {
      english: "circulation",
      turkish: "sürüm, akıntı",
      V2: "-",
      V3: "-",
    },
    {
      english: "civilization",
      turkish: "uygarlık, medeniyet",
      V2: "-",
      V3: "-",
    },
    {
      english: "climb",
      turkish: "tırmanmak",
      V2: "climbed",
      V3: "climbed",
    },
    {
      english: "close",
      turkish: "kapatmak, yakın",
      V2: "closed",
      V3: "closed",
    },
    {
      english: "clothes",
      turkish: "giysi, kıyafet",
    },
    {
      english: "conclude",
      turkish: "sonuçlandırmak, karara bağlamak",
      V2: "concluded",
      V3: "concluded",
    },
    {
      english: "condition",
      turkish: "şart",
      V2: "-",
      V3: "-",
    },
    {
      english: "consequently",
      turkish: "haliyle, sonuç olarak",
      V2: "-",
      V3: "-",
    },
    {
      english: "consider",
      turkish: "durumu değerlendirmek",
      V2: "considered",
      V3: "considered",
    },
    {
      english: "conversation",
      turkish: "konuşma, sohbet",
      V2: ".",
      V3: ".",
    },
    {
      english: "county",
      turkish: "ilçe",
      V2: "-",
      V3: "-",
    },
    {
      english: "couple",
      turkish: "eş,eşleştirmek,birleştirmek",
      V2: "-",
      V3: "-",
    },
    {
      english: "court",
      turkish: "mahkeme",
    },
    {
      english: "cow",
      turkish: "inek",
    },
    {
      english: "craft",
      turkish: "esnaf, zanaat",
      V2: "-",
      V3: "-",
    },
    {
      english: "cushion",
      turkish: "minder,yastık,gücünü azaltmak",
    },
    {
      english: "day by day",
      turkish: "günden güne",
      V2: "-",
      V3: "-",
    },
    {
      english: "decide ",
      turkish: "karar vermek",
      V2: "decided",
      V3: "decided",
    },
    {
      english: "defective",
      turkish: "hasarlı",
      V2: "-",
      V3: "-",
    },
    {
      english: "definitely",
      turkish: "kesinlikle",
      V2: ".",
      V3: ".",
    },
    {
      english: "demonstrate",
      turkish: "ispat etmek, göstermek",
      V2: "demonstreated",
    },
    {
      english: "describe",
      turkish: "betimlemek",
      V2: "described",
      V3: "described",
    },
    {
      english: "destroy",
      turkish: "yıkmak, imha etmek",
      V2: "destroyed",
      V3: "detroyed",
    },
    {
      english: "detective",
      turkish: "dedektif",
      V2: "-",
      V3: "-",
    },
    {
      english: "deteriorate",
      turkish: "bozulmak, kötüye gitmek",
      V2: "deteriorated",
      V3: "deteriorated",
    },
    {
      english: "develop",
      turkish: "geliştirmek",
      V2: "developed",
      V3: "developed",
    },
    {
      english: "development",
      turkish: "gelişim",
      V2: "-",
      V3: "-",
    },
    {
      english: "diet",
      turkish: "diyet",
      V2: "-",
      V3: "-",
    },
    {
      english: "discourage",
      turkish: "hevesini kırmak, cesaret kırmak",
    },
    {
      english: "disease",
      turkish: "hastalık",
      V2: "-",
      V3: "-",
    },
    {
      english: "disrespectfully",
      turkish: "saygısızca",
      V2: "-",
      V3: "-",
    },
    {
      english: "down of",
      turkish: "doğuş",
      V2: "-",
      V3: "-",
    },
    {
      english: "drop",
      turkish: "düşmek, düşüş, damla",
      V2: "dropped",
      V3: "dropped",
    },
    {
      english: "due to",
      turkish: "nedeniyle",
    },
    {
      english: "dustbin",
      turkish: "çöp kovası",
      V2: "-",
      V3: "-",
    },
    {
      english: "earn",
      turkish: "kazanmak",
      V2: ".",
      V3: ".",
    },
    {
      english: "either/or",
      turkish: "ya/ya da ",
      V2: ".",
      V3: ".",
    },
    {
      english: "encourage",
      turkish: "cesaretlendirmek",
    },
    {
      english: "engage",
      turkish: "nişanlanmak, bağlanmak",
      V2: "engaged",
      V3: "engaged",
    },
    {
      english: "engine",
      turkish: "motor",
      V2: "-",
      V3: "-",
    },
    {
      english: "equıp",
      turkish: "donatmak",
    },
    {
      english: "establish",
      turkish: "kurmak",
    },
    {
      english: "even",
      turkish: "hatta",
      V2: "-",
      V3: "-",
    },
    {
      english: "exhausted",
      turkish: "yorgun",
      V2: "-",
      V3: "-",
    },
    {
      english: "expert",
      turkish: "uzman",
      V2: ".",
      V3: ".",
    },
    {
      english: "explode",
      turkish: "patlamak",
      V2: "exploded",
      V3: "exploded",
    },
    {
      english: "extraordinary",
      turkish: "olağandışı, fevkalade",
      V2: ".",
      V3: ".",
    },
    {
      english: "facsimile",
      turkish: "kopya",
      V2: "-",
      V3: "-",
    },
    {
      english: "failure",
      turkish: "başarısızlık, yapmayış",
      V2: "-",
      V3: "-",
    },
    {
      english: "fancy",
      turkish: "süslü, istemek, bayılmak",
      V2: "fancied",
      V3: "fancied",
    },
    {
      english: "far",
      turkish: "uzak",
    },
    {
      english: "farm",
      turkish: "çiftlik",
      V2: "-",
      V3: "-",
    },
    {
      english: "fascinating",
      turkish: "büyüleyici",
    },
    {
      english: "field",
      turkish: "tarla,alan",
      V2: "-",
      V3: "-",
    },
    {
      english: "fix",
      turkish: "düzeltmek,onarmak",
      V2: "fixxed",
      V3: "fixxed",
    },
    {
      english: "flat",
      turkish: "daire",
    },
    {
      english: "flip",
      turkish: "fiske vurmak, çevirmek(sayfa )",
      V2: "flipped",
      V3: "flipped",
    },
    {
      english: "forbid ",
      turkish: "yasaklamak",
    },
    {
      english: "forbidden",
      turkish: "yasak, yasaklanmış",
      V2: ".",
      V3: ".",
    },
    {
      english: "foreign",
      turkish: "yabancı",
      V2: ".",
      V3: ".",
    },
    {
      english: "forgery",
      turkish: "sahte",
      V2: "-",
      V3: "-",
    },
    {
      english: "found",
      turkish: "kurmak",
      V2: "founded",
      V3: "founded",
    },
    {
      english: "fresh air",
      turkish: "temiz hava",
    },
    {
      english: "full of",
      turkish: "ile dolu olmak",
      V2: " fulled of",
    },
    {
      english: "gain",
      turkish: "kazanmak, elde etmek",
      V2: "gained",
      V3: "gained",
    },
    {
      english: "gift",
      turkish: "hediye, armağan ",
      V2: "-",
      V3: "-",
    },
    {
      english: "give up",
      turkish: "pes etmek",
      V2: "gave up ",
      V3: "given up",
    },
    {
      english: "go down",
      turkish: "inmek, batmak (güneş, gemi )",
      V2: "went down",
      V3: "gone down",
    },
    {
      english: "goat",
      turkish: "keçi",
    },
    {
      english: "goodness",
      turkish: "iyilik",
    },
    {
      english: "gossip",
      turkish: "dedikodu",
    },
    {
      english: "governor",
      turkish: "vali",
      V2: ".",
      V3: ".",
    },
    {
      english: "groom",
      turkish: "damat",
      V2: "-",
      V3: "-",
    },
    {
      english: "ground",
      turkish: "yer,zemin",
      V2: ".",
      V3: ".",
    },
    {
      english: "gun",
      turkish: "silah",
      V2: ".",
      V3: ".",
    },
    {
      english: "hall",
      turkish: "hol, salon",
      V2: "-",
      V3: "-",
    },
    {
      english: "helpful",
      turkish: "faydalı, yardımsever",
      V2: ".",
      V3: ".",
    },
    {
      english: "hike",
      turkish: "yürüyüşe çıkmak",
      V2: "hiked",
      V3: "hiked",
    },
    {
      english: "history/herstory",
      turkish: "geçmiş, tarih",
      V2: "-",
      V3: "-",
    },
    {
      english: "hold up",
      turkish: "tutmak",
      V2: "-",
      V3: "-",
    },
    {
      english: "hole",
      turkish: "delik, çukur",
      V2: ".",
      V3: ".",
    },
    {
      english: "husband",
      turkish: "koca, eş",
    },
    {
      english: "icy",
      turkish: "donmuş",
      V2: "-",
      V3: "-",
    },
    {
      english: "ideally",
      turkish: "ideal olarak",
      V2: ".",
      V3: ".",
    },
    {
      english: "improve",
      turkish: "geliştirmek",
      V2: "improved",
      V3: "improved",
    },
    {
      english: "in case ",
      turkish: "diye",
    },
    {
      english: "indicate",
      turkish: "belirtlisi olmak, göstergesi ol.",
      V2: "indicated",
      V3: "indicated",
    },
    {
      english: "influential",
      turkish: "etkili, etkileyici",
      V2: ".",
      V3: ".",
    },
    {
      english: "inform",
      turkish: "bilgilendirmek",
      V2: "informed",
      V3: "informed",
    },
    {
      english: "ingredient",
      turkish: "içerik",
      V2: "-",
      V3: "-",
    },
    {
      english: "insist",
      turkish: "ısrar etmek",
      V2: "insisted",
      V3: "insisted",
    },
    {
      english: "inspector",
      turkish: "müfettiş, denetmen",
      V2: "-",
      V3: "-",
    },
    {
      english: "interview",
      turkish: "görüşme, mülakat",
      V2: "-",
      V3: "-",
    },
    {
      english: "intimate",
      turkish: "sıkı fıkı, samimi",
      V2: ".",
      V3: ".",
    },
    {
      english: "jam",
      turkish: "sıkıştırmak, reçel",
    },
    {
      english: "jam",
      turkish: "reçel, sıkışılık",
    },
    {
      english: "keep",
      turkish: "tutmak saklamak",
      V2: "kept",
      V3: "kept",
    },
    {
      english: "keep in",
      turkish: "tutmak",
      V2: "kept in",
      V3: "kept in",
    },
    {
      english: "keep watch",
      turkish: "nöbet tutmak",
    },
    {
      english: "land",
      turkish: "arazi, arsa",
      V2: ".",
      V3: ".",
    },
    {
      english: "lend",
      turkish: "ödünç vermek",
      V2: "lent",
      V3: "lent",
    },
    {
      english: "letter",
      turkish: "mektup",
      V2: "-",
      V3: "-",
    },
    {
      english: "lighter",
      turkish: "çakmak",
      V2: ".",
      V3: ".",
    },
    {
      english: "lockdown",
      turkish: "karantina, sokağa çıkma yasağı",
    },
    {
      english: "look for",
      turkish: "aramak",
      V2: "-",
      V3: "-",
    },
    {
      english: "look forward to",
      turkish: "dört gözle beklemek",
      V2: "-",
      V3: "-",
    },
    {
      english: "lottery",
      turkish: "piyango",
    },
    {
      english: "machinery",
      turkish: "makinalar",
      V2: "-",
      V3: "-",
    },
    {
      english: "magazine",
      turkish: "dergi",
      V2: "-",
      V3: "-",
    },
    {
      english: "majority",
      turkish: "çoğunlukla,erginlik",
      V2: "-",
      V3: "-",
    },
    {
      english: "manage",
      turkish: "yönetmek, işletmek",
      V2: "managed",
      V3: "managed",
    },
    {
      english: "manner",
      turkish: "biçim, tutum, adap",
      V2: ".",
      V3: ".",
    },
    {
      english: "matchmaker",
      turkish: "çöpçatan",
      V2: ".",
      V3: ".",
    },
    {
      english: "measure",
      turkish: "önlem, ölçü",
    },
    {
      english: "midway",
      turkish: "ortayol",
      V2: "-",
      V3: "-",
    },
    {
      english: "miserable",
      turkish: "acınası, sefil",
      V2: "-",
      V3: "-",
    },
    {
      english: "most of the time",
      turkish: "çoğu zaman",
      V2: "-",
      V3: "-",
    },
    {
      english: "move",
      turkish: "taşınmak,hareket etmek",
      V2: "moved",
      V3: "moved",
    },
    {
      english: "mushroom",
      turkish: "mantar",
      V2: ".",
      V3: ".",
    },
    {
      english: "neither/nor",
      turkish: "ne /ne de",
      V2: ".",
      V3: ".",
    },
    {
      english: "noise",
      turkish: "gürültü, ses",
      V2: "-",
      V3: "-",
    },
    {
      english: "not only/but also",
      turkish: "sadece o değil /o da",
      V2: ".",
      V3: ".",
    },
    {
      english: "nowadays",
      turkish: "bugünlerde",
      V2: "-",
    },
    {
      english: "nut",
      turkish: "fındık",
      V2: ".",
      V3: ".",
    },
    {
      english: "occasion",
      turkish: "vesile, fırsat, sebebi olmak",
    },
    {
      english: "often",
      turkish: "sık sık",
      V2: "-",
      V3: "-",
    },
    {
      english: "option ",
      turkish: "seçenek",
      V2: ".",
      V3: ".",
    },
    {
      english: "ordinary ",
      turkish: "sıradan",
      V2: ".",
      V3: ".",
    },
    {
      english: "outing",
      turkish: "tur",
      V2: "-",
      V3: "-",
    },
    {
      english: "oven",
      turkish: "ocak, fırın",
      V2: ".",
      V3: ".",
    },
    {
      english: "overcharge",
      turkish: "fiyatı fazla yükseltmek,abartmak",
    },
    {
      english: "overhead",
      turkish: "havai, genel masraflar",
      V2: "-",
      V3: "-",
    },
    {
      english: "overwork",
      turkish: "fazla çalışmak, mesai",
      V2: ".",
      V3: ".",
    },
    {
      english: "parcel",
      turkish: "parçalara ayırmak, bölmek, parsel,koli",
      V2: "parcelled",
      V3: "parcelled",
    },
    {
      english: "pass away",
      turkish: "ölmek",
    },
    {
      english: "pass out",
      turkish: "kendinden geçmek, dağıtmak, dışarı çıkmak",
    },
    {
      english: "passion",
      turkish: "tutku,hırs",
      V2: "-",
      V3: "-",
    },
    {
      english: "peanut",
      turkish: "yer fıstığı",
    },
    {
      english: "penpal",
      turkish: "mektup arkadaşı",
      V2: "-",
      V3: "-",
    },
    {
      english: "percent",
      turkish: "hisse, yüzde",
      V2: ".",
      V3: ".",
    },
    {
      english: "perfectionist",
      turkish: "mükemmeliyetçi",
      V2: "-",
      V3: "-",
    },
    {
      english: "perhaps",
      turkish: "belki",
      V2: "-",
      V3: "-",
    },
    {
      english: "pick up",
      turkish: "toplamak, kaldırmak",
      V2: "picked up",
      V3: "picked up",
    },
    {
      english: "plate",
      turkish: "tabaka,tabak",
      V2: "-",
      V3: "-",
    },
    {
      english: "poison",
      turkish: "zehir",
    },
    {
      english: "poisonous",
      turkish: "zehirli",
      V2: "-",
      V3: "-",
    },
    {
      english: "polite",
      turkish: "nazik.kibar",
      V2: ".",
      V3: ".",
    },
    {
      english: "present",
      turkish: "sunmak, şimdiki zaman",
      V2: "presented",
      V3: "presented",
    },
    {
      english: "presently",
      turkish: "şimdi",
      V2: "-",
      V3: "-",
    },
    {
      english: "pretty",
      turkish: "oldukça, sevimli ",
      V2: "-",
      V3: "-",
    },
    {
      english: "previous",
      turkish: "önceki",
      V2: "-",
      V3: "-",
    },
    {
      english: "probably",
      turkish: "muhtemelen",
      V2: "-",
      V3: "-",
    },
    {
      english: "produce",
      turkish: "üretmek",
      V2: "produced",
      V3: "produced",
    },
    {
      english: "product",
      turkish: "ürün",
      V2: "-",
      V3: "-",
    },
    {
      english: "progress",
      turkish: "gelişmek, gelişim",
      V2: "progressed",
      V3: "progressed",
    },
    {
      english: "promote",
      turkish: "tanıtımını yapmak,terfi ettirmek",
      V2: "promoted",
      V3: "promoted",
    },
    {
      english: "properly",
      turkish: "düzgün, bir şekilde",
    },
    {
      english: "property",
      turkish: "mal,mülk,özellik",
    },
    {
      english: "public",
      turkish: "halk",
      V2: "-",
      V3: "-",
    },
    {
      english: "put on",
      turkish: "giyinmek, kilo almak",
      V2: " put on",
    },
    {
      english: "quite",
      turkish: "epey",
      V2: "-",
      V3: "-",
    },
    {
      english: "quitting",
      turkish: "istifa",
      V2: "-",
      V3: "-",
    },
    {
      english: "raise",
      turkish: "yükseltmek, artırmak",
      V2: "raised",
      V3: "raised",
    },
    {
      english: "rapid",
      turkish: "hızlı",
      V2: "-",
      V3: "-",
    },
    {
      english: "rare",
      turkish: "nadir",
    },
    {
      english: "rather",
      turkish: "oldukça, epey",
      V2: ".",
      V3: ".",
    },
    {
      english: "rather than",
      turkish: "yerine,tercihen",
      V2: "-",
      V3: "-",
    },
    {
      english: "receive",
      turkish: "teslim almak",
      V2: "received",
      V3: "received",
    },
    {
      english: "recently",
      turkish: "son zamanlarda",
      V2: "-",
      V3: "-",
    },
    {
      english: "recommend",
      turkish: "tavsiye etmek",
      V2: " recommended",
    },
    {
      english: "reflect",
      turkish: "yansıtmak",
      V2: "reflected",
      V3: "reflected",
    },
    {
      english: "refuse",
      turkish: "geri çevirmek, reddetmek",
      V2: "refused",
      V3: "refused",
    },
    {
      english: "request",
      turkish: "rice etmek, talep etmek",
      V2: "requested",
      V3: "requested",
    },
    {
      english: "research",
      turkish: "incelemek, araştırmak",
      V2: "researched",
      V3: "researched",
    },
    {
      english: "reserve",
      turkish: "ayırmak,rezerve etmek",
    },
    {
      english: "resistance",
      turkish: "direnç",
    },
    {
      english: "response",
      turkish: "cevap",
      V2: "-",
      V3: "-",
    },
    {
      english: "rice",
      turkish: "pirinç",
    },
    {
      english: "rice to ones feet",
      turkish: "ayağa kalkmak",
      V2: "-",
      V3: "-",
    },
    {
      english: "rise",
      turkish: "doğmak, yükselmek,artış",
      V2: "-",
      V3: "-",
    },
    {
      english: "rocky",
      turkish: "kayalık",
      V2: "-",
      V3: "-",
    },
    {
      english: "rope",
      turkish: "halat, ip",
      V2: ".",
      V3: ".",
    },
    {
      english: "safer",
      turkish: "emniyetli",
      V2: "-",
      V3: "-",
    },
    {
      english: "salty",
      turkish: "tuzlu",
      V2: "-",
      V3: "-",
    },
    {
      english: "scheduled",
      turkish: "planlanmış",
      V2: "-",
      V3: "-",
    },
    {
      english: "several",
      turkish: "birçok, çeşitli",
      V2: "-",
      V3: "-",
    },
    {
      english: "severe",
      turkish: "sert, keskin",
      V2: "-",
      V3: "-",
    },
    {
      english: "sheep",
      turkish: "kuzu,koyun",
    },
    {
      english: "shine",
      turkish: "parlamak",
      V2: "shone",
      V3: "shone",
    },
    {
      english: "ship",
      turkish: "gemi",
    },
    {
      english: "showcase",
      turkish: "gösterge",
      V2: "-",
      V3: "-",
    },
    {
      english: "significantly",
      turkish: "önemli ölçüde",
      V2: ".",
      V3: ".",
    },
    {
      english: "slip",
      turkish: "kaymak",
      V2: "slipped",
      V3: "slipped",
    },
    {
      english: "so far",
      turkish: "şimdiye kadar",
      V2: "-",
      V3: "-",
    },
    {
      english: "souvenir",
      turkish: "hediyelik eşya",
      V2: "-",
      V3: "-",
    },
    {
      english: "spare",
      turkish: "yedek, ayırmak",
    },
    {
      english: "spike",
      turkish: "sivri uçlu demir",
      V2: "-",
      V3: "-",
    },
    {
      english: "stand by",
      turkish: "seyirci kalmak, hazırda beklemek",
      V2: "stood by",
      V3: "stood by",
    },
    {
      english: "standstill",
      turkish: "durma, paydos",
      V2: "-",
      V3: "-",
    },
    {
      english: "statement",
      turkish: "ifade, söz",
      V2: "-",
      V3: "-",
    },
    {
      english: "steal",
      turkish: "çalmak",
      V2: "stole",
      V3: "stolen",
    },
    {
      english: "strange",
      turkish: "tuhaf, garip",
    },
    {
      english: "stressful",
      turkish: "stresli, gergin",
      V2: "-",
      V3: "-",
    },
    {
      english: "strict",
      turkish: "sıkı,katı,kurallara bağlı",
      V2: "-",
      V3: "-",
    },
    {
      english: "stubborn",
      turkish: "inatçı",
      V2: "-",
      V3: "-",
    },
    {
      english: "stupid",
      turkish: "aptal",
    },
    {
      english: "suddenly",
      turkish: "aniden",
      V2: "-",
      V3: "-",
    },
    {
      english: "suffer",
      turkish: "acı çekmek",
      V2: "suffered",
      V3: "suffered",
    },
    {
      english: "suggestion",
      turkish: "öneri, teklif",
      V2: "-",
      V3: "-",
    },
    {
      english: "supplier",
      turkish: "tedarikçi,ihtiyacı karşılayan",
    },
    {
      english: "surprıse",
      turkish: "şaşırtmak,sürpriz",
      V2: "surprısed",
      V3: "surprısed",
    },
    {
      english: "survey",
      turkish: "araştırma, anket",
      V2: ".",
      V3: ".",
    },
    {
      english: "survive",
      turkish: "hayatta kalmak",
      V2: "survived",
      V3: "survived",
    },
    {
      english: "take a bus",
      turkish: "otobüse binmek",
      V2: "-",
      V3: "-",
    },
    {
      english: "tell",
      turkish: "haber vermek, söylemek",
      V2: "told",
      V3: "told",
    },
    {
      english: "temperature",
      turkish: "sıcaklık, ateş",
    },
    {
      english: "term",
      turkish: "isimlendirmek,terim,dönem",
      V2: "-",
      V3: "-",
    },
    {
      english: "the fact that",
      turkish: "gerçek şu ki ",
    },
    {
      english: "thing",
      turkish: "şey,nesne , olay",
    },
    {
      english: "though",
      turkish: "diği halde",
      V2: "-",
      V3: "-",
    },
    {
      english: "tiring",
      turkish: "yorucu",
      V2: ".",
      V3: ".",
    },
    {
      english: "tough",
      turkish: "zorlu,çetin, sabretmek",
    },
    {
      english: "treat",
      turkish: "davranmak,tedavi etmek",
      V2: "treated",
    },
    {
      english: "trust",
      turkish: "güvenmek, güven",
    },
    {
      english: "unbearable",
      turkish: "katlanılmaz",
      V2: "-",
      V3: "-",
    },
    {
      english: "understandably",
      turkish: "anlaşılır şekilde",
      V2: "-",
      V3: "-",
    },
    {
      english: "undoubtedly",
      turkish: "kesinlikle",
    },
    {
      english: "unfortunately",
      turkish: "ne yazıkki",
      V2: ".",
      V3: ".",
    },
    {
      english: "universe",
      turkish: "evren, alem",
      V2: ".",
      V3: ".",
    },
    {
      english: "useful",
      turkish: "faydalı",
      V2: ".",
      V3: ".",
    },
    {
      english: "vaccine",
      turkish: "aşı",
      V2: "-",
      V3: "-",
    },
    {
      english: "valley",
      turkish: "vadi",
      V2: "-",
      V3: "-",
    },
    {
      english: "village",
      turkish: "köy",
      V2: "-",
      V3: "-",
    },
    {
      english: "violence",
      turkish: "şiddet,zorlama",
      V2: "-",
      V3: "-",
    },
    {
      english: "volue",
      turkish: "değer vermek, değer ",
      V2: "valued",
      V3: "valued",
    },
    {
      english: "volunteer",
      turkish: "gönüllü",
      V2: ".",
      V3: ".",
    },
    {
      english: "vote",
      turkish: "oy vermek",
      V2: "voted",
      V3: "voted",
    },
    {
      english: "waiter",
      turkish: "garson",
    },
    {
      english: "wallet",
      turkish: "cüzdan",
      V2: ".",
      V3: ".",
    },
    {
      english: "walnut",
      turkish: "ceviz",
    },
    {
      english: "waste",
      turkish: "boşa harcamak, israf etmek",
      V2: "wasted",
      V3: "wasted",
    },
    {
      english: "weekend",
      turkish: "haftasonu",
    },
    {
      english: "wild",
      turkish: "vahşi",
      V2: "-",
      V3: "-",
    },
    {
      english: "worse",
      turkish: "daha da kötüsü",
      V2: ".",
      V3: ".",
    },
    {
      english: "shout",
      turkish: "bağırmak,haykırmak",
      V2: "shouted",
      V3: "shouted",
    },
    {
      english: "swear",
      turkish: "sövmek",
      V2: "swore",
      V3: "sworn",
    },
    {
      english: "from birth",
      turkish: "doğuştan",
      V2: "-",
      V3: "-",
    },
    {
      english: "impression",
      turkish: "etki, baskı, izlenim",
      V2: "-",
      V3: "-",
    },
    {
      english: "attractive",
      turkish: "cazibeli, çekici",
      V2: "-",
      V3: "-",
    },
    {
      english: "laugh",
      turkish: "gülme, gülmek",
      V2: "laughed",
      V3: "laughed",
    },
    {
      english: "nervous",
      turkish: "sinirli, gergin",
      V2: "-",
      V3: "-",
    },
    {
      english: "indeed",
      turkish: "doğrusu, aslında, gerçekten",
      V2: "-",
      V3: "-",
    },
    {
      english: "fortunately",
      turkish: "neyse ki , şükür ki ",
      V2: "-",
      V3: "-",
    },
    {
      english: "act",
      turkish: "davranmak, hareket etmek, oynamak",
      V2: "acted",
      V3: "acted",
    },
    {
      english: "charity",
      turkish: "bağış, hayır",
      V2: "-",
      V3: "-",
    },
    {
      english: "decide",
      turkish: "karar vermek",
      V2: "decided",
      V3: "decided",
    },
    {
      english: "greet",
      turkish: "selamlaşmak",
      V2: "greeted",
      V3: "greeted",
    },
    {
      english: "shake hand",
      turkish: "tokalaşmak",
      V2: "-",
      V3: "-",
    },
    {
      english: "hug",
      turkish: "sarılmak",
      V2: "hugged",
      V3: "hugged",
    },
    {
      english: "embarrassing",
      turkish: "utandırıcı, can sıkıcı",
      V2: "-",
      V3: "-",
    },
    {
      english: "embarrass",
      turkish: "mahcup etmek, utandırmak",
      V2: "-",
      V3: "-",
    },
    {
      english: "behave",
      turkish: "davranmak",
      V2: "behaved",
      V3: "behaved",
    },
    {
      english: "force",
      turkish: "zorlamak, baskı yapmak",
      V2: "forced",
      V3: "forced",
    },
    {
      english: "woodcutter",
      turkish: "oduncu",
      V2: "-",
      V3: "-",
    },
    {
      english: "breastfeed",
      turkish: "emzirmek",
    },
    {
      english: "feed",
      turkish: "beslemek",
      V2: "fed",
      V3: "fed",
    },
    {
      english: "own",
      turkish: "sahip olmak, kendi",
      V2: "-",
      V3: "-",
    },
    {
      english: "garlic",
      turkish: "sarımsak",
      V2: "-",
      V3: "-",
    },
    {
      english: "breast",
      turkish: "meme",
    },
    {
      english: "onion ",
      turkish: "soğan",
      V2: "-",
      V3: "-",
    },
    {
      english: "type",
      turkish: "tür",
      V2: "-",
      V3: "-",
    },
    {
      english: "impress ",
      turkish: "etkilemek, hayran bırakmak",
      V2: "impressed",
      V3: "impressed",
    },
    {
      english: "interested in",
      turkish: "ile ilgili olmak",
    },
    {
      english: "square",
      turkish: "kare, meydan",
      V2: "-",
      V3: "-",
    },
    {
      english: "sign",
      turkish: "imzalamak, işaret, burç",
      V2: "signed",
      V3: "signed",
    },
    {
      english: "signature",
      turkish: "imza, imzalama",
      V2: "-",
      V3: "-",
    },
    {
      english: "sing",
      turkish: "şarkı söylemek",
      V2: "sang",
      V3: "sung",
    },
    {
      english: "mark",
      turkish: "işaretlemek",
      V2: "marked",
      V3: "marked",
    },
    {
      english: "swap ",
      turkish: "değiş tokuş, takas",
      V2: "-",
      V3: "-",
    },
    {
      english: "barter",
      turkish: "takas (ilkel )",
      V2: "-",
      V3: "-",
    },
    {
      english: "called",
      turkish: "diye adlandırılan",
    },
    {
      english: "smart",
      turkish: "akıllı",
    },
    {
      english: "trade",
      turkish: "ticaret, alım satım yapmak",
    },
    {
      english: "malpractise",
      turkish: "yanlış tedavi ,yasa dışı eylem",
    },
    {
      english: "wood",
      turkish: "odun,tahta",
    },
    {
      english: "forest",
      turkish: "orman, ağaçlandırmak",
    },
    {
      english: "deep",
      turkish: "derin",
    },
    {
      english: "spend",
      turkish: "geçirmek(geceyi ), harcamak",
      V2: "spent",
      V3: "spent",
    },
    {
      english: "get worse",
      turkish: "kötüleşmek",
      V2: "got worse",
      V3: "got worse",
    },
    {
      english: "fever",
      turkish: "ateş, ateşlenmek",
    },
    {
      english: "above",
      turkish: "üzerinde, üstünde, yukarısında",
    },
    {
      english: "below",
      turkish: "aşağıdaki, altındaki, alttaki",
    },
    {
      english: "cage ",
      turkish: "kafes",
    },
    {
      english: "out of",
      turkish: "den dolayı, dışında, den yapılmış",
      V2: "outed of",
      V3: "outed of",
    },
    {
      english: "one by one",
      turkish: "birer birer, tek tek",
    },
    {
      english: "feather",
      turkish: "tüy, kuş tüyü",
    },
    {
      english: "tail",
      turkish: "kuyruk, kuyruk yapmak",
    },
    {
      english: "smooth out",
      turkish: "düzleştimek, pürüzsüzleştirmek",
    },
    {
      english: "wing",
      turkish: "kanat ,hızlandırmak",
    },
    {
      english: "sharp",
      turkish: "keskin, sivri",
    },
    {
      english: "needle",
      turkish: "iğne, iğnelemek, sinirlendirmek",
    },
    {
      english: "thread",
      turkish: "iplik, iğneye iplik geçirmek",
    },
    {
      english: "sew",
      turkish: "dikiş dikmek",
      V2: "sewed",
      V3: "sewn",
    },
    {
      english: "tie",
      turkish: "bağlamak, bağ, bağlantı",
    },
    {
      english: "hung",
      turkish: "asma, asılı duran",
    },
    {
      english: "asleep",
      turkish: "uyuyan tembel, uyuşuk",
    },
    {
      english: "stand back",
      turkish: "çekilmek, kenara çekilmek",
      V2: "stood back",
      V3: "stood back",
    },
    {
      english: "find out",
      turkish: "anlamaki bulmak, ortaya çıkarmak",
      V2: "found out",
      V3: "found out",
    },
    {
      english: "reply",
      turkish: "yanıtlamak",
      V2: "replied",
      V3: "replied",
    },
    {
      english: "kneeling",
      turkish: "diz çökme",
    },
    {
      english: "knee",
      turkish: "diz",
    },
    {
      english: "go round",
      turkish: "dönmek, kurcalamak",
      V2: "went round",
      V3: "gone round",
    },
    {
      english: "stage",
      turkish: "sahneye koymak, sahnelemek",
    },
    {
      english: "singing",
      turkish: "uğultu",
    },
    {
      english: "migrate",
      turkish: "göç etmek",
      V2: "migrated",
      V3: "migrated",
    },
    {
      english: "high",
      turkish: "yüksek",
    },
    {
      english: "ceiling ",
      turkish: "tavan",
    },
    {
      english: "contact",
      turkish: "ilişki kurmak, iletişim kurmak",
      V2: "contacted",
      V3: "contacted",
    },
    {
      english: "contract",
      turkish: "yakalanmak(hastalığa), sözleşme",
      V2: "contracted",
      V3: "contracted",
    },
    {
      english: "cultural",
      turkish: "kültürel",
    },
    {
      english: "pumpkin",
      turkish: "bal kabağı",
    },
    {
      english: "stomach",
      turkish: "mide, sindirmek",
    },
    {
      english: "stomachache",
      turkish: "karın ağrısı, mide ağrısı",
    },
    {
      english: "street",
      turkish: "cadde, sokak",
    },
    {
      english: "workaholic",
      turkish: "iş kolik",
    },
    {
      english: "prejudice",
      turkish: "ön yargı",
    },
    {
      english: "bias",
      turkish: "ön yargı",
    },
    {
      english: "academician",
      turkish: "öğretim görevlisi",
    },
    {
      english: "break",
      turkish: "kopmak, kırmak, mola, ara",
      V2: "broke",
      V3: "broken",
    },
    {
      english: "jogging",
      turkish: "hafif koşu",
    },
    {
      english: "grow",
      turkish: "yetişmek, büyümek",
      V2: "grew",
      V3: "grown",
    },
    {
      english: "search",
      turkish: "araştırmak",
      V2: "searched",
      V3: "searched",
    },
    {
      english: "side effect",
      turkish: "yan etki",
      V2: "-",
      V3: "-",
    },
    {
      english: "injection",
      turkish: "enjekte, iğne",
    },
    {
      english: "decrease",
      turkish: "küçültmek,azaltmak",
      V2: "decreased",
      V3: "decreased",
    },
    {
      english: "increase",
      turkish: "artırmak, çoğaltmak",
      V2: "increased",
      V3: "increased",
    },
    {
      english: "suicide",
      turkish: "intihar",
      V2: "-",
      V3: "-",
    },
    {
      english: "take to the court",
      turkish: "davayı mahkemeye götürmek",
    },
    {
      english: "gum",
      turkish: "diş eti, sakız",
    },
    {
      english: "heart",
      turkish: "kalp, merkez",
    },
    {
      english: "attack",
      turkish: "atak, saldırı",
      V2: "attacked",
      V3: "attacked",
    },
    {
      english: "responsibility",
      turkish: "sorumluluk",
      V2: "-",
      V3: "-",
    },
    {
      english: "necessity",
      turkish: "gereklilik",
      V2: "-",
      V3: "-",
    },
    {
      english: "require",
      turkish: "gerekmek, ihtiyacı olmak",
      V2: "required",
      V3: "required",
    },
    {
      english: "quick",
      turkish: "hızlı, çabuk",
      V2: "-",
      V3: "-",
    },
    {
      english: "luggage",
      turkish: "bagaj, valiz",
      V2: "-",
      V3: "-",
    },
    {
      english: "downstairs",
      turkish: "alt katta",
    },
    {
      english: "pull",
      turkish: "çekmek ",
      V2: "pulled",
      V3: "pulled",
    },
    {
      english: "push",
      turkish: "itmek",
      V2: "pushed",
      V3: "pushed",
    },
    {
      english: "butler",
      turkish: "uşak",
    },
    {
      english: "chick",
      turkish: "yavru, civciv",
      V2: "-",
      V3: "-",
    },
    {
      english: "even worse",
      turkish: "daha da kötüsü",
      V2: "-",
      V3: "-",
    },
    {
      english: "go out ",
      turkish: "çıkmak",
      V2: "went out",
      V3: "gone out",
    },
    {
      english: "decision ",
      turkish: "karar, yargı",
      V2: "-",
      V3: "-",
    },
    {
      english: "acting",
      turkish: "temsil, oyun",
      V2: "-",
      V3: "-",
    },
    {
      english: "agency",
      turkish: "ajans, acenta",
      V2: "-",
      V3: "-",
    },
    {
      english: "horrible",
      turkish: "berbat, kötü, dehşete düşüren",
      V2: "-",
      V3: "-",
    },
    {
      english: "spare",
      turkish: "ayırmak, yedek, boş(zaman )",
      V2: "-",
      V3: "-",
    },
    {
      english: "care",
      turkish: "önem vermek, umursamak",
      V2: "cared",
      V3: "cared",
    },
    {
      english: "go on",
      turkish: "devam etmek",
      V2: "went on",
      V3: "gone on",
    },
    {
      english: "continue",
      turkish: "devam etmek ",
      V2: "continued",
      V3: "continued",
    },
    {
      english: "hold",
      turkish: "sahip olmak,devam etmek, tutmak",
      V2: "held",
      V3: "held",
    },
    {
      english: "servant",
      turkish: "hizmetçi",
      V2: "-",
      V3: "-",
    },
    {
      english: "awful",
      turkish: "berbat, çok kötü",
      V2: "-",
      V3: "-",
    },
    {
      english: "keep a secret",
      turkish: "sır tutmak",
      V2: " kept a secret",
    },
    {
      english: "shut up",
      turkish: "susmak",
      V2: " shut up",
    },
    {
      english: "sort of",
      turkish: "tür",
      V2: "-",
      V3: "-",
    },
    {
      english: "get it",
      turkish: "anlamak, idrak etmek, kapıya bakmak",
      V2: " got it",
    },
    {
      english: "come up",
      turkish: "ortaya çıkmak, çıkagelmek",
      V2: "came up",
      V3: "come up",
    },
    {
      english: "landlady",
      turkish: "ev sahibi",
      V2: "-",
    },
    {
      english: "episode",
      turkish: "parça",
    },
    {
      english: "series",
      turkish: "dizi, seri",
    },
    {
      english: "womanizer",
      turkish: "çapkın",
    },
    {
      english: "jealous",
      turkish: "kıskanç",
    },
    {
      english: "precaution",
      turkish: "önlem, tedbir",
    },
    {
      english: "caution",
      turkish: "dikkat",
    },
    {
      english: "earthquake",
      turkish: "deprem",
    },
    {
      english: "landowner",
      turkish: "arazi sahibi",
    },
    {
      english: "death angel",
      turkish: "azrail, ölüm meleği",
    },
    {
      english: "first aid",
      turkish: "ilk yardım",
    },
    {
      english: "safe",
      turkish: "güvenilir",
    },
    {
      english: "take risk",
      turkish: "risk almak",
      V2: "took risk",
      V3: "taken risk",
    },
    {
      english: "psychologist",
      turkish: "psikolog",
    },
    {
      english: "overdose",
      turkish: "doz aşımı",
    },
    {
      english: "psychiatrist",
      turkish: "psikiyatrist",
    },
    {
      english: "tip",
      turkish: "bahşiş",
    },
    {
      english: "poem",
      turkish: "şiir",
    },
    {
      english: "poet",
      turkish: "şair",
    },
    {
      english: "gender",
      turkish: "cinsiyet",
    },
    {
      english: "search engine",
      turkish: "arama moturu",
    },
    {
      english: "wakey- wakey",
      turkish: "uyan uyan",
    },
    {
      english: "rise and shine",
      turkish: "çakı gibi sağlam uyanmak",
    },
    {
      english: "butcher",
      turkish: "kasap",
    },
    {
      english: "punish ",
      turkish: "ceza vermek",
      V2: "punished",
      V3: "punished",
    },
    {
      english: "accept",
      turkish: "kabul etmek",
      V2: "accepted",
      V3: "accepted",
    },
    {
      english: "dizzy",
      turkish: "başını döndürmek",
      V2: "dizzied",
      V3: "dizzied",
    },
    {
      english: "sore throat",
      turkish: "boğaz yangısı, farenjit",
    },
    {
      english: "sore",
      turkish: "acıyan, yaralı",
    },
    {
      english: "logical",
      turkish: "mantıklı",
    },
    {
      english: "isolation",
      turkish: "izolasyon",
    },
    {
      english: "symptom",
      turkish: "belirti ",
      V2: "-",
      V3: "-",
    },
    {
      english: "sweat",
      turkish: "terlemek ter",
    },
    {
      english: "task",
      turkish: "görev",
      V2: "-",
      V3: "-",
    },
    {
      english: "bill",
      turkish: "fatura",
    },
    {
      english: "suprised ",
      turkish: "şaşırmış",
      V2: "-",
      V3: "-",
    },
    {
      english: "stimulate",
      turkish: "uyarmak",
      V2: "-",
      V3: "-",
    },
    {
      english: "oppurtunity",
      turkish: "olanak",
      V2: "-",
      V3: "-",
    },
    {
      english: "pleasure",
      turkish: "haz,keyif",
      V2: "-",
      V3: "-",
    },
    {
      english: "enthusiastic",
      turkish: "çoşkulu",
      V2: "-",
      V3: "-",
    },
    {
      english: "grateful",
      turkish: "minettar",
      V2: "-",
      V3: "-",
    },
    {
      english: "appreciable",
      turkish: "farkedilir",
      V2: "-",
      V3: "-",
    },
    {
      english: "questionnare",
      turkish: "anket",
      V2: "-",
      V3: "-",
    },
    {
      english: "satisfaction",
      turkish: "memnuniyet, mutluluk duymak",
      V2: "-",
      V3: "-",
    },
    {
      english: "lose of taste",
      turkish: "tat duyusunu kaybetme",
      V2: "-",
      V3: "-",
    },
    {
      english: "on time ",
      turkish: "vaktinde",
      V2: "-",
      V3: "-",
    },
    {
      english: "packet",
      turkish: "paket",
      V2: "-",
      V3: "-",
    },
    {
      english: "graduate ",
      turkish: "mezun olmak",
      V2: "graduated",
      V3: "graduated",
    },
    {
      english: "show off",
      turkish: "hava atmak, gösteriş",
      V2: "-",
      V3: "-",
    },
    {
      english: "burn out",
      turkish: "içini yakmak, bozulmak, tükenmek",
    },
    {
      english: "climb",
      turkish: "tırmanmak",
      V2: "climbed",
      V3: "climbed",
    },
    {
      english: "mess up",
      turkish: "ortalığı dağıtmak,berbat etmek",
      V2: "messed up",
      V3: "messed up",
    },
    {
      english: "depend on",
      turkish: "bir şeye bağlı olmak, dayanmak",
      V2: "depended on ",
      V3: "depended on",
    },
    {
      english: "addiction",
      turkish: "bağımlılık",
      V2: "-",
      V3: "-",
    },
    {
      english: "fun",
      turkish: "eğlence",
      V2: "-",
      V3: "-",
    },
    {
      english: "experiment",
      turkish: "deney",
      V2: "-",
    },
    {
      english: "environment",
      turkish: "çevre, ortam",
    },
    {
      english: "addition",
      turkish: "ek,ilave",
    },
    {
      english: "morale",
      turkish: "moral,maneviyat",
    },
    {
      english: "remedy",
      turkish: "deva,çare",
    },
    {
      english: "cure",
      turkish: "iyileştirmek, tedavi etmek",
      V2: "cured",
      V3: "cured",
    },
    {
      english: "tear",
      turkish: "yırtık, gözyaşı, yırtılmak",
      V2: "tore",
      V3: "torn",
    },
    {
      english: "shoulder",
      turkish: "omuz",
      V2: "-",
      V3: "-",
    },
    {
      english: "complementary",
      turkish: "tamamlayıcı, bütünleyici",
      V2: "-",
      V3: "-",
    },
    {
      english: "in order ",
      turkish: "sırayla, düzenli",
      V2: "-",
      V3: "-",
    },
    {
      english: "put in order",
      turkish: "sıraya koymak",
      V2: "-",
      V3: "-",
    },
    {
      english: "rarely",
      turkish: "nadiren",
      V2: "-",
      V3: "-",
    },
    {
      english: "plant",
      turkish: "bitki, dikmek",
      V2: "planted",
      V3: "planted",
    },
    {
      english: "herb",
      turkish: "ot",
    },
    {
      english: "herbal",
      turkish: "bitkisel",
      V2: "-",
      V3: "-",
    },
    {
      english: "criteria",
      turkish: "kriterler",
      V2: "-",
      V3: "-",
    },
    {
      english: "confirm",
      turkish: "onaylamak",
      V2: "confirmed",
      V3: "confirmed",
    },
    {
      english: "agriculture",
      turkish: "ziraat,tarım",
      V2: "-",
      V3: "-",
    },
    {
      english: "expert ",
      turkish: "uzman",
      V2: "-",
      V3: "-",
    },
    {
      english: "argue",
      turkish: "tartışmak",
      V2: "-",
      V3: "-",
    },
    {
      english: "fight",
      turkish: "dövüşmek, kavga etmek",
      V2: "fought",
      V3: "fought",
    },
    {
      english: "wealthy",
      turkish: "varlıklı, zengin",
      V2: "-",
      V3: "-",
    },
    {
      english: "cottage",
      turkish: "kulübe",
      V2: "-",
      V3: "-",
    },
    {
      english: "annoying ",
      turkish: "gıcık, rahatsız edici",
      V2: "-",
      V3: "-",
    },
    {
      english: "sight",
      turkish: "görme, görünüş , görüş alanı",
    },
    {
      english: "visibility",
      turkish: "görünürlük, görüş alanu",
      V2: "-",
      V3: "-",
    },
    {
      english: "promise",
      turkish: "söz vermek",
      V2: "promised",
      V3: "promised",
    },
    {
      english: "star sign",
      turkish: "burç",
      V2: "-",
      V3: "-",
    },
    {
      english: "enemy",
      turkish: "düşman",
    },
    {
      english: "rival",
      turkish: "rakip",
    },
    {
      english: "match",
      turkish: "eşleşmek, eş, maç",
      V2: "matched",
      V3: "matched",
    },
    {
      english: "straightaway",
      turkish: "hemencecik, dosdoğru",
      V2: "-",
      V3: "-",
    },
    {
      english: "straight",
      turkish: "düzgün, doğru",
      V2: "-",
      V3: "-",
    },
    {
      english: "gig",
      turkish: "küçük konser, sahneye çıkmak",
      V2: "-",
      V3: "-",
    },
    {
      english: "folk",
      turkish: "halk",
      V2: "-",
      V3: "-",
    },
    {
      english: "relative",
      turkish: "akraba",
      V2: "-",
      V3: "-",
    },
    {
      english: "proper",
      turkish: "uygun, münasip",
      V2: "-",
      V3: "-",
    },
    {
      english: "abroad",
      turkish: "yurtdışı",
    },
    {
      english: "other than that",
      turkish: "bunun dışında",
    },
    {
      english: "tent",
      turkish: "çadır",
    },
    {
      english: "scout",
      turkish: "izci",
    },
    {
      english: "welly",
      turkish: "bot, çizme",
    },
    {
      english: "headway",
      turkish: "yol alma, gelişme, ilerleme",
    },
    {
      english: "establish",
      turkish: "kurmak",
      V2: "established",
      V3: "established",
    },
    {
      english: "speak to",
      turkish: "konuşmak, değinmek",
    },
    {
      english: "good at",
      turkish: "alanında iyi olmak",
    },
    {
      english: "go for",
      turkish: "almaya gitmek, tercih etmek, çıkmak",
    },
    {
      english: "agree with you",
      turkish: "aynı fikir de olmak",
      V2: "agreed",
      V3: "agreed",
    },
    {
      english: "afraid of",
      turkish: "den korkmak, den korkan",
    },
    {
      english: "fearful of",
      turkish: "den korkmak, den korkan",
    },
    {
      english: "fear",
      turkish: "korku",
    },
    {
      english: "mass",
      turkish: "kitle",
    },
    {
      english: "body mass index",
      turkish: "vücut kitle indeksi",
    },
    {
      english: "tangerine",
      turkish: "mandalina",
    },
    {
      english: "muscle ",
      turkish: "kas",
    },
    {
      english: "also",
      turkish: "ayrıca, aynı zamanda ",
    },
    {
      english: "significant",
      turkish: "önemli ölçüde",
    },
    {
      english: "refugee",
      turkish: "mülteci",
    },
    {
      english: "especially",
      turkish: "özellikle",
    },
    {
      english: "particularly",
      turkish: "özellikle",
    },
    {
      english: "wrestler",
      turkish: "güreşçi",
    },
    {
      english: "at least",
      turkish: "en azından",
    },
    {
      english: "lend",
      turkish: "ödünç vermek",
      V2: "lent",
      V3: "lent",
    },
    {
      english: "borrow",
      turkish: "ödünç almak",
      V2: "borrowed",
      V3: "borrowed",
    },
    {
      english: "view",
      turkish: "görüş, manzara",
    },
    {
      english: "scenery",
      turkish: "manzara",
    },
    {
      english: "hardly ever",
      turkish: "neredeyse hiç",
    },
    {
      english: "seldom",
      turkish: "nadiren ",
    },
    {
      english: "scarsely",
      turkish: "neredeyse hiç ",
    },
    {
      english: "cooker",
      turkish: "ocak, fırın",
    },
    {
      english: "from time to time",
      turkish: "zaman zaman",
    },
    {
      english: "currently",
      turkish: "halen, şuanda ",
    },
    {
      english: "belong",
      turkish: "ait olmak",
      V2: "belonged",
      V3: "belonged",
    },
    {
      english: "brick",
      turkish: "tuğla",
    },
    {
      english: "ancient",
      turkish: "antik, çok yaşlı kimse",
    },
    {
      english: "recently",
      turkish: "son zamanlarda",
    },
    {
      english: "lately",
      turkish: "son zamanlarda",
    },
    {
      english: "gain",
      turkish: "kilo almak, kazanmak, elde etmek",
      V2: "gained",
      V3: "gained",
    },
    {
      english: "already",
      turkish: "çoktan",
    },
    {
      english: "so far",
      turkish: "bugüne kadar",
    },
    {
      english: "notice",
      turkish: "fark etmek, duyuru, ilan",
      V2: "noticed",
      V3: "noticed",
    },
    {
      english: "deadline",
      turkish: "son teslim tarihi",
    },
    {
      english: "content",
      turkish: "içerik, memnun etmek",
      V2: "contented",
      V3: "contented",
    },
    {
      english: "acknowledgement",
      turkish: "kabul etme, onay, senet",
    },
    {
      english: "foreword",
      turkish: "önsöz",
    },
    {
      english: "contribute",
      turkish: "katkı yapmak",
      V2: "contributed",
      V3: "contributed",
    },
    {
      english: "contribution",
      turkish: "katkı",
    },
    {
      english: "owe",
      turkish: "minnettar olmak, borçlu olmak",
      V2: "owed",
      V3: "owed",
    },
    {
      english: "well-known",
      turkish: "ünlü",
    },
    {
      english: "record",
      turkish: "kaydetmek, plak ",
      V2: "recorded",
      V3: "recorded",
    },
    {
      english: "west",
      turkish: "batı",
    },
    {
      english: "east",
      turkish: "doğu",
    },
    {
      english: "between",
      turkish: "arasında",
    },
    {
      english: "through",
      turkish: "başından souna, yoluyla,vasıtasıyla",
    },
    {
      english: "near",
      turkish: "yakın, yakınlaşmak",
    },
    {
      english: "almost",
      turkish: "hemen hemen, neredeyse",
    },
    {
      english: "avenue",
      turkish: "bulvar, cadde",
    },
    {
      english: "founded ",
      turkish: "kurulan",
    },
    {
      english: "found",
      turkish: "kurmak",
      V2: "founded",
      V3: "founded",
    },
    {
      english: "excellent",
      turkish: "mükemmel",
    },
    {
      english: "all over",
      turkish: "bitik, her tarafta",
    },
    {
      english: "unemployed",
      turkish: "işsiz",
    },
    {
      english: "lunch",
      turkish: "öğle yemeği",
    },
    {
      english: "dinner",
      turkish: "akşam yemeği",
    },
    {
      english: "occasion",
      turkish: "fırsat, vesile,neden olmak",
    },
    {
      english: "statue",
      turkish: "heykel",
    },
    {
      english: "north",
      turkish: "kuzey",
    },
    {
      english: "south",
      turkish: "güney",
    },
    {
      english: "liberty",
      turkish: "özgürlük",
    },
    {
      english: "accountant",
      turkish: "muhasebeci",
    },
    {
      english: "hurry",
      turkish: "acele etmek, telaş",
      V2: "hurried",
      V3: "hurried",
    },
    {
      english: "miss",
      turkish: "kaçırmak, ıskalamak",
      V2: "missed",
      V3: "missed",
    },
    {
      english: "throw",
      turkish: "fırlatmak, atmak",
      V2: "threw",
      V3: "thrown",
    },
    {
      english: "protect",
      turkish: "korumak",
      V2: "protected",
      V3: "procted",
    },
    {
      english: "bark",
      turkish: "havlamak",
      V2: "barked",
      V3: "barked",
    },
    {
      english: "bite",
      turkish: "ısırmak",
      V2: "bit",
      V3: "bitten",
    },
    {
      english: "attend",
      turkish: "katılmak",
      V2: "attended",
      V3: "attended",
    },
    {
      english: "strictly",
      turkish: "tam anlamıyla, kati surette",
    },
    {
      english: "severe",
      turkish: "şiddetli, sert",
    },
    {
      english: "suffer from",
      turkish: "acı çekmek",
    },
    {
      english: "deteriorate",
      turkish: "fenalaşmak, kötüleşmek",
      V2: "deteriorated",
      V3: "deteriorated",
    },
    {
      english: "miserable",
      turkish: "sefil, perişan",
    },
    {
      english: "schedule",
      turkish: "plan, takvim belirlemek",
      V2: "scheduled",
      V3: "scheduled",
    },
    {
      english: "complain",
      turkish: "şikayet etmek, yakınmak",
      V2: "complained",
      V3: "complained",
    },
    {
      english: "tool",
      turkish: "araç, alet",
    },
    {
      english: "deliver",
      turkish: "teslim etmek",
      V2: "delivered",
      V3: "delivered",
    },
    {
      english: "postman",
      turkish: "postacı",
    },
    {
      english: "either",
      turkish: "her iki ",
    },
    {
      english: "stand",
      turkish: "ayakta durmak, geçerli olmak(teklif )",
      V2: "stood",
      V3: "stood ",
    },
    {
      english: "procovative",
      turkish: "kışkırtıcı, tahrik edici",
    },
    {
      english: "birthmark",
      turkish: "doğum lekesi",
    },
    {
      english: "morbid",
      turkish: "dehşet verici, korkutucu",
    },
    {
      english: "unnoticeable",
      turkish: "fark edilmeyen, göze çarpmayan",
    },
    {
      english: "permanent",
      turkish: "daimi, kalıcı",
    },
    {
      english: "by",
      turkish: "e kadar",
    },
    {
      english: "disorder",
      turkish: "rahatsızlık",
    },
    {
      english: "image",
      turkish: "şekil görüntü",
    },
    {
      english: "defect",
      turkish: "bozukluk, hasar",
    },
    {
      english: "cure",
      turkish: "iyileştirmek, tedavi etmek",
      V2: "cured",
      V3: "cured",
    },
    {
      english: "purpose",
      turkish: "amaç",
    },
    {
      english: "capacity",
      turkish: "kapasite, yeterlilik",
    },
    {
      english: "experience",
      turkish: "deneyim, tecrübe",
    },
    {
      english: "immense",
      turkish: "çok büyük, muazzam",
    },
    {
      english: "fear",
      turkish: "korkmak, korku",
      V2: "feared",
      V3: "feared",
    },
    {
      english: "frustration",
      turkish: "hayal kırıklığı, hüsran, engelleme",
    },
    {
      english: "independence",
      turkish: "özgürlük, bağımsızlık",
    },
    {
      english: "struggle",
      turkish: "çabalamak, mücadele etmek",
      V2: "struggled",
      V3: "struggled",
    },
    {
      english: "carry out",
      turkish: "yerine getirmek, uygulamak",
      V2: "carried out",
      V3: "carried out",
    },
    {
      english: "lead",
      turkish: "yol göstermek, rehberlik etmek",
      V2: "led",
      V3: "led",
    },
    {
      english: "relate",
      turkish: "bağlı olmak, ilgili olmak",
      V2: "related",
      V3: "related",
    },
    {
      english: "blindness",
      turkish: "körlük düşüncesizlik",
    },
    {
      english: "replace",
      turkish: "yer değiştimek, yerine geçmek",
      V2: "replaced",
      V3: "replaced",
    },
    {
      english: "remove",
      turkish: "kaldırmak, gidermek",
      V2: "removed",
      V3: "removed",
    },
    {
      english: "interview",
      turkish: "görüşme, mülakat",
    },
    {
      english: "recommend",
      turkish: "tavsiye etmek",
      V2: "recommended",
      V3: "recommended",
    },
    {
      english: "pull out",
      turkish: "çıkarmak, kaçmak, tüymek",
      V2: " pulled out",
      V3: "pulled out",
    },
    {
      english: "take off",
      turkish: "havalanmak, kalkmak(uçak), çıkarmak (elbise )",
      V2: "took off",
      V3: "taken off",
    },
    {
      english: "move on ",
      turkish: "ileriye gitmek, ilerlemek",
      V2: "moved on",
      V3: "moved on",
    },
    {
      english: "call of",
      turkish: "iptal etmek, yasaklamak",
      V2: "called of",
      V3: "called of",
    },
    {
      english: "put out",
      turkish: "söndürmek, ışığı kapatmak",
      V2: "put out",
      V3: "put out",
    },
    {
      english: "turn back",
      turkish: "geri dönmek",
      V2: "turned back",
      V3: "turned back",
    },
    {
      english: "arise",
      turkish: "kaynaklanmak, ortaya çıkmak, baş göstermek",
      V2: "arose",
      V3: "arisen",
    },
    {
      english: "immediately",
      turkish: "hemen , derhal ",
    },
    {
      english: "recently",
      turkish: "son zamanlarda",
    },
    {
      english: "formally",
      turkish: "usülen, resmi olarak",
    },
    {
      english: "community",
      turkish: "halk, topluluk",
    },
    {
      english: "sanitation",
      turkish: "sağlık önlemleri",
    },
    {
      english: "inventor",
      turkish: "mucit, yaratıcı",
    },
    {
      english: "receive",
      turkish: "teslim almak, almak",
      V2: "received ",
      V3: "received",
    },
    {
      english: "contribution",
      turkish: "katkı, bağış",
    },
    {
      english: "heal",
      turkish: "iyileştirmek",
      V2: "healed",
      V3: "healed",
    },
    {
      english: "indoor",
      turkish: "kapalı mekan, iç mekan",
    },
    {
      english: "suffer",
      turkish: "acı çekmek",
    },
    {
      english: "pleasureable",
      turkish: "zevkli",
    },
    {
      english: "throughout",
      turkish: "boyunca, baştan başa",
    },
    {
      english: "employ",
      turkish: "çalıştırmak, kullanmak",
      V2: "employed",
      V3: "employed",
    },
    {
      english: "defend",
      turkish: "savunmak , korumak",
      V2: "defended",
      V3: "defended",
    },
    {
      english: "play in",
      turkish: "de oynamak",
      V2: "played in",
      V3: "played in",
    },
    {
      english: "invade",
      turkish: "istila etmek, saldırmak",
      V2: "invaded",
      V3: "invaded",
    },
    {
      english: "crucial",
      turkish: "kritik, önemli",
      V2: "-",
      V3: "-",
    },
    {
      english: "calm",
      turkish: "sakinlik",
      V2: "-",
      V3: "-",
    },
    {
      english: "blind",
      turkish: "kör",
    },
    {
      english: "role in",
      turkish: "rol oynamak",
    },
    {
      english: "ankle",
      turkish: "yürümek, ayak bileği",
    },
    {
      english: "common",
      turkish: "yaygın, alışılmış",
    },
    {
      english: "mishap",
      turkish: "aksilik, ufak kaza",
    },
    {
      english: "uneven",
      turkish: "inişli çıkışlı, düz olmayan, eşitsiz",
    },
    {
      english: "surface ",
      turkish: "yüzey",
    },
    {
      english: "compete",
      turkish: "yarışmak",
      V2: "competed",
      V3: "competed",
    },
    {
      english: "occur",
      turkish: "meydana gelmek",
      V2: "occured",
      V3: "occured",
    },
    {
      english: "dislike",
      turkish: "hoşlanmamak",
    },
    {
      english: "allow ",
      turkish: "izin vermek",
      V2: "allowed",
      V3: "allowed",
    },
    {
      english: "concussion",
      turkish: "sarsıntı ",
    },
    {
      english: "lasting",
      turkish: "kalıcı, sürme",
    },
    {
      english: "wound ",
      turkish: "yara",
    },
    {
      english: "stitch",
      turkish: "dikiş",
    },
    {
      english: "likewise",
      turkish: "aynı biçimde, aynı şekilde",
    },
    {
      english: "entirely",
      turkish: "tamamıyla, bütünüyle",
    },
    {
      english: "as long as",
      turkish: " diği takdirde",
    },
    {
      english: "compound",
      turkish: "bileşim, bileşik, birleştirmek",
    },
    {
      english: "produce",
      turkish: "üretmek, çıkarmak",
      V2: "produced",
      V3: "produced",
    },
    {
      english: "drowsiness",
      turkish: "uyuklama, uyuşukluk",
    },
    {
      english: "blurred",
      turkish: "bulanık",
    },
    {
      english: "vision",
      turkish: "görme, görme kuvveti",
    },
    {
      english: "abundant",
      turkish: "bol, çok",
    },
    {
      english: "pattern",
      turkish: "model örnek",
    },
    {
      english: "nearly",
      turkish: "hemen hemen, neredeyse",
    },
    {
      english: "nearby",
      turkish: "yakında , civarı ",
    },
    {
      english: "backwash",
      turkish: "geri püskürtmek",
    },
    {
      english: "definitely",
      turkish: "kesinlikle",
    },
    {
      english: "indefinitely",
      turkish: "süresiz, belirsiz olarak ",
    },
    {
      english: "as a whole",
      turkish: "bütün olarak",
    },
    {
      english: "assume",
      turkish: "farz etmek, varsaymak, sanmak",
      V2: "assumed",
      V3: "assumed",
    },
    {
      english: "suppose",
      turkish: "farz etmek, varsaymak, sanmak",
      V2: "supposed",
      V3: "supposed",
    },
    {
      english: "account for",
      turkish: "kapsamak",
    },
    {
      english: "implied",
      turkish: "ima edilen, anlaşılan",
    },
    {
      english: "approve",
      turkish: "onaylamak, beğenmek",
      V2: "approved",
      V3: "approved",
    },
    {
      english: "disapprove",
      turkish: "uygun görmemek, kınamak",
      V2: "disapproved",
      V3: "disapproved",
    },
    {
      english: "reject",
      turkish: "geri çevirmek, reddetmek",
      V2: "rejected",
      V3: "rejected",
    },
    {
      english: "refuse",
      turkish: "geri çevirmek, reddetmek",
      V2: "refused",
      V3: "refused",
    },
    {
      english: "recognize",
      turkish: "tanımak, haklı bulmak",
      V2: "recognized",
      V3: "recognized",
    },
    {
      english: "confuse",
      turkish: "zihnini karıştırmak",
      V2: "confused",
      V3: "confused",
    },
    {
      english: "decline",
      turkish: "inişe geçmek, zayıflamak",
      V2: "declined",
      V3: "declined",
    },
    {
      english: "decrease",
      turkish: "küçültmek,azaltmak",
      V2: "decreased",
      V3: "decreased",
    },
    {
      english: "go down",
      turkish: "inmek, batmak (güneş, gemi )",
    },
    {
      english: "increase",
      turkish: "artırmak, artmak, çoğalmak",
      V2: "increased",
      V3: "increased ",
    },
    {
      english: "raise",
      turkish: "büyütmek(çocuk ), artırmak",
      V2: "raised",
      V3: "raised",
    },
    {
      english: "go up ",
      turkish: "yükseltmek, artırmak",
      V2: "went up",
      V3: "gone up",
    },
    {
      english: "pessimistic",
      turkish: "karamsar",
    },
    {
      english: "optimistic",
      turkish: "iyimser, optimist",
    },
    {
      english: "dishes",
      turkish: "tabak çanak",
    },
    {
      english: "invented",
      turkish: "icat edilmek",
    },
    {
      english: "pick",
      turkish: "seçmek, toplamak",
      V2: "picked",
      V3: "picked",
    },
  ];

  const changeValues = () => {
    let num = Math.floor(Math.random() * data.length);
    setTurkishWord(data[num].turkish);
    setEnglishWord(data[num].english);
  };

  const Create = async () => {
    const docData = {
      english: englishWord,
      turkish: turkishWord,
      uid: auth.currentUser.uid,
    };

    await addDoc(wordsCollectionRef, docData).then(() => {
      alert("Word added successfully");
    });
  };

  // SHADOW OLUNCA, WIDGHT VE LENGTHE BAKMIYOR WORDE GÖRE ALIYOR BOX-SIZE'I
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.imageContainer}>
        <Image source={require("../../assets/svgs/circle.png")} />
        <Image source={require("../../assets/svgs/orangeCircle.png")} />
      </View>
      <View style={styles.singleSlide}>
        <View style={styles.singleCardWrapper}>
          <FlipCard
            style={styles.singleCard}
            flipHorizontal={true}
            flipVertical={false}
          >
            <Shadow stretch={true}>
              <View style={styles.cardFrontAndBack}>
                <Text style={styles.slideText}>{turkishWord}</Text>
                {<View style={styles.cardMasteredIconContainer}></View>}
              </View>
            </Shadow>
            <Shadow stretch={true}>
              <View style={[styles.cardFrontAndBack, styles.cardBack]}>
                <Text style={styles.slideText}>{englishWord}</Text>
                {
                  <View
                    style={[
                      styles.cardMasteredIconContainer,
                      styles["cardMasteredIconContainer--Back"],
                    ]}
                  ></View>
                }
              </View>
            </Shadow>
          </FlipCard>
          <View style={styles.parent}>
            <CButton
              text={"🪄 Change"}
              onClick={() => {
                {
                  changeValues();
                }
              }}
            />

            <CButton
              text={"📝 Add to List"}
              onClick={() => {
                Create();
                console.log("-------------");
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  singleSlide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  singleCardWrapper: {
    height: 400,
    width: 320,
  },
  singleCardWrapper: {
    height: 400,
    width: 320,
  },
  singleCard: {},
  cardFrontAndBack: {
    backgroundColor: "#3BB894",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 10,
    padding: 20,
  },
  slideText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardMasteredIconContainer: {
    backgroundColor: "#3BB894",
    position: "absolute",

    bottom: 10,
    right: 10,
  },
  "cardMasteredIconContainer--Back": {
    backgroundColor: "#B83B5E",
  },
  cardFrontAndBack: {
    backgroundColor: "#3BB894",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 10,
    padding: 20,
  },
  cardBack: {
    backgroundColor: "#B83B5E",
  },
  parent: {
    // flex: 1,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
