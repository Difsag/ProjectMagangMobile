import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity, // Impor TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Impor useNavigation
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { FontAwesome5 } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "List">;

const ListScreen: React.FC<Props> = () => {
  const navigation = useNavigation(); // Inisialisasi useNavigation

  const [listItems, setListItems] = useState<string[]>([]); // Daftar item list
  const [newItem, setNewItem] = useState<string>(""); // Item baru yang akan ditambahkan

  // Fungsi untuk menambahkan item ke daftar
  const addItemToList = () => {
    if (newItem) {
      setListItems([...listItems, newItem]);
      setNewItem(""); // Mengosongkan input setelah ditambahkan
    }
  };

  // Fungsi untuk menavigasi ke halaman yang sesuai
  const navigateToScreen = (screenName: keyof RootStackParamList) => {
    navigation.navigate(screenName);
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.headerText}>Daftar Project</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="nama project"
            value={newItem}
            onChangeText={(text) => setNewItem(text)}
          />
          <Text style={styles.addButton} onPress={addItemToList}>
            Tambah
          </Text>
        </View>
        {listItems.map((item, index) => (
          <View style={styles.listItem} key={index}>
            <Text style={styles.listItemText}>{item}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigateToScreen("Home")}>
          <FontAwesome5 name="home" style={styles.navbarIcon} />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigateToScreen("List")}>
          <FontAwesome5 name="list" style={styles.navbarIcon} />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => navigateToScreen("Akun")}>
          <FontAwesome5 name="user" style={styles.navbarIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({


  navbarIcon: {
    color: "white", // Ganti dengan warna ikon yang sesuai
    fontSize: 24, // Sesuaikan ukuran ikon sesuai kebutuhan
  },
  container: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    flex: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  addButton: {
    marginLeft: 8,
    backgroundColor: "#51bbe3",
    color: "white",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    fontWeight: "bold",
    fontSize: 16,
  },
  listItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  listItemText: {
    fontSize: 16,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    alignItems: "center",
    backgroundColor: "#51bbe3", // Ganti dengan warna latar belakang navbar yang Anda inginkan
    paddingVertical: 10,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default ListScreen;
