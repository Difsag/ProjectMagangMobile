import React, { useContext, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Impor useNavigation
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { FontAwesome5 } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../context/AuthContext";
import { Image } from 'react-native';
import { Colors } from "react-native/Libraries/NewAppScreen";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";

type Props = NativeStackScreenProps<RootStackParamList, "Akun">;

const AkunScreen: React.FC<Props> = () => {
  const navigation = useNavigation(); // Inisialisasi useNavigation

  const { userInfo, isLoading, logout, fetchUserImage, imageSrc} = useContext(AuthContext);


  useEffect(() => {
    if (userInfo && userInfo.user && userInfo.user.nip) {
      fetchUserImage(userInfo.user.nip);
    }
  }, [userInfo, fetchUserImage]);



  // Fungsi untuk menavigasi ke halaman yang sesuai
  const navigateToScreen = (screenName: keyof RootStackParamList) => {
    navigation.navigate("Home");
  };

  const saveChanges = () => {
    // Simpan perubahan informasi akun ke server atau penyimpanan lokal
    // Anda dapat menambahkan logika penyimpanan di sini

    alert("Perubahan disimpan!");
  };

  const handleLogout = () => {
    // Panggil fungsi logout dari AuthContext
    logout();

    // Navigate ke halaman Login
    navigation.navigate("Login");
  };

  
  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={isLoading} />
      
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.headerText}>Informasi Akun</Text>


        <View style={styles.imageContainer}>
        {imageSrc ? (
    <Image
    source={{ uri:imageSrc }} // Menggunakan URL gambar yang telah diubah dari base64
      style={styles.userImage}
    />
  ) 
  : (
    <Text>Gambar pengguna tidak tersedia</Text>
  )
  }
</View>
<View style={styles.fieldContainer}>
        
          <Text style={styles.label}>No.NIP:</Text>
  <Text style={styles.text}>{userInfo.user.nip}</Text>
          
        <View style={styles.fieldContainer}>
        <Text style={styles.label}>Nama:</Text>
  <Text style={styles.text}>{userInfo.user.name}</Text>
        </View>
        <View style={styles.fieldContainer}>
        <Text style={styles.label}>Nomor Telepon:</Text>
  <Text style={styles.text}>{userInfo.user.nohp}</Text>
        </View>

        <View style={styles.fieldContainer}>
        <Text style={styles.label}>Email:</Text>
  <Text style={styles.text}>{userInfo.user.email}</Text>
        </View>

      
        
</View>

      
      </ScrollView>


      <TouchableOpacity
        onPress={handleLogout}
        style={{
          padding: Spacing * 2,
          backgroundColor: Colors.secondary,
          marginVertical: Spacing * 0,
          borderRadius: Spacing,
          shadowColor: Colors.primary,
          shadowOffset: {
            width: 0,
            height: Spacing,
          },
          shadowOpacity: 0.3,
          shadowRadius: Spacing,
        }}
      >
        <Text
          style={{
            fontFamily: Font["poppins-bold"],
            color: Colors.onPrimary,
            textAlign: "center",
            fontSize: FontSize.large,
            marginBottom: 15,
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>


      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigateToScreen("Home")}>
          <FontAwesome5 name="home" style={styles.navbarIcon} />
        </TouchableOpacity>
      
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
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  text: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#51bbe3",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#51bbe3',
    paddingVertical: 20,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  userImage: {
    width: 100, // Sesuaikan lebar gambar sesuai kebutuhan
    height: 100, // Sesuaikan tinggi gambar sesuai kebutuhan
    borderRadius: 50, // Untuk membuat gambar bundar, setengah dari lebar atau tinggi
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 36,
  },
});

export default AkunScreen;

