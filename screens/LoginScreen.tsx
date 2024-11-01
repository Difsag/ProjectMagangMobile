import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Image
} from "react-native";
import React, { useState, useContext } from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
// import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import AppTextInput from "../components/AppTextInput";
import { AuthContext } from "../context/AuthContext";
// import Spinner from 'react-native-loading-spinner-overlay';
import { AuthProvider } from "../context/AuthContext";


type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {login} = useContext(AuthContext);


  
 

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Mohon diisi Email dan password.");
      return;
    }
  
    try {
      // Panggil fungsi login dengan username dan password serta navigation
      await login(username, password, navigation);
    } catch (error) {
      console.log("Login error:", error);
      alert("Terjadi kesalahan saat login. Pastikan data yang Anda masukkan benar.");
    }
  };
  
  
  const handleForgotPassword = () => {

    navigation.navigate("LupaPassword");
    
  };
  
  

  return (

<ImageBackground
      resizeMode="cover"
      source={require("../assets/images/bg.png")}
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center", // Center the content vertically
      }}
    >


    <SafeAreaView>
      {/* <Spinner visible={isLoading} /> */}
      <View
          style={{
            backgroundColor: "white", // Background color of the white box
            margin: 20, // Margin around the white box
            padding: 20, // Padding inside the white box
            borderRadius: 10, // Border radius to round the edges of the box
            shadowColor: Colors.primary,
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.3,
            shadowRadius: 5,
          }}
        >
      <View
        style={{
          padding: Spacing * 1,
        }}
      >




        
        <View
          style={{
            alignItems: "center",
          }}
        >

<Image
  style={{
    width: "100%", // Lebar gambar tetap 100% dari parent container
    height: undefined, // Tinggi akan disesuaikan agar tidak terpotong
    aspectRatio: 250 / 75, // Menentukan aspek rasio gambar asli
    marginHorizontal: 40,
    alignItems: "center",
  }}
  resizeMode="contain" // Menggunakan 'contain' untuk menampilkan seluruh gambar
  source={require("../assets/images/logo.png")}
/>


          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.primary,
              fontFamily: Font["poppins-bold"],
              marginBottom: Spacing * 0.1,
              marginTop: 10
            }}
          >
            TPS PLAN
          </Text>
          {/* <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              fontSize: FontSize.large,
              maxWidth: "60%",
              textAlign: "center",
              lineHeight: FontSize.medium 4,
              paddingBottom: 10,
            }}
          >
            Isi Sesuai
          </Text> */}
        </View>
        <View
          style={{
            marginVertical: Spacing * 1,
          }}
        >
          <AppTextInput placeholder="Email"
           onChangeText={(text) => setUsername(text)}
          
          
          
          />
          <AppTextInput placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          
          
          />
        </View>

        <View>
        <TouchableOpacity
          onPress={handleForgotPassword} // Panggil fungsi saat tombol ditekan
          style={{
            // Tambahkan gaya tombol sesuai kebutuhan
          }}
        >
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              fontSize: FontSize.small,
              color: Colors.primary,
              alignSelf: "flex-end",
            }}
          >
            Lupa Password ?
          </Text>
        </TouchableOpacity>
        </View>

        <TouchableOpacity
        onPress={handleLogin}
            
          style={{
            padding: Spacing * 2,
            backgroundColor: Colors.primary,
            marginVertical: Spacing * 2,
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
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>
        

        {/* <View
          permintaan lupa password 
          berhasil dikirim saat mengirim permintaan lupa password mengirim 
          tambahkan kode lain sesuai kebutuhan, sepertii menampilkan pesan respon apii tidak berisi
          kirim permintaan logout dengan token
          
        </View> */}

        <TouchableOpacity
          onPress={() => navigation.goBack()} // Menggunakan navigation.goBack() untuk kembali ke layar sebelumnya
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
            }}
          >
            Kembali
          </Text>
        </TouchableOpacity>

</View>
      </View>
    </SafeAreaView>
    </ImageBackground>
  );

};

export default LoginScreen;

const styles = StyleSheet.create({});
