import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native"; // Impor useNavigation

const LupaPasswordScreen = () => {
  const { forgotPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleKirimEmail = () => {
    if (email) {
      forgotPassword(email); //mengirim sesaui fetching logik yang ada di authcontext
    } else {
      // Tampilkan pesan kesalahan jika email kosong
      alert("Mohon isi alamat email Anda.");
    }
  };

  const handleKembali = () => {
    // Navigasi kembali ke LoginScreen
    navigation.navigate("Login");
  };

  return (
    <ImageBackground
      resizeMode="cover"
      source={require("../assets/images/bg.png")}
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center", // Center the content verticall
      }}
    >
      <View style={styles.container}>
        <View style={styles.whiteBox}>
          <Image
            style={{
              width: "100%", // Lebar gambar tetap 100% dari parent container
              height: undefined, // Tinggi akan disesuaikan agar tidak terpotong
              aspectRatio: 250 / 75, // Menentukan aspek rasio gambar asli
              alignItems: "center",
              marginBottom: 20,
            }}
            resizeMode="contain" // Menggunakan 'contain' untuk menampilkan seluruh gambar
            source={require("../assets/images/logo.png")}
          />

          {/* <Text style={styles.headerText}>Lupa Password</Text>
          <Text style={styles.descriptionText}>
            Masukkan alamat email Anda:
          </Text> */}
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          />
          <TouchableOpacity
            style={styles.kirimEmailButton}
            onPress={handleKirimEmail}
          >
            <Text style={styles.buttonText}>Send Email</Text>
          </TouchableOpacity>
          <Text style={styles.kembaliText} onPress={handleKembali}>
            Kembali ke Login
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },

  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  kembaliText: {
    color: "#006ca2",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right",
    marginTop: 20,
  },
  kirimEmailButton: {
    backgroundColor: "#006ca2",
    paddingVertical: 12,
    paddingHorizontal: 12,
    width: 280,
    borderRadius: 8,
    alignSelf: "center",
  },
  kembaliButton: {
    backgroundColor: "#51bbe3",
    paddingVertical: 12,
    paddingHorizontal: 54,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
  whiteBox: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#006ca2",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default LupaPasswordScreen;
