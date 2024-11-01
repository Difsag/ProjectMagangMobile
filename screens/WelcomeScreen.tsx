import React from "react";
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity, // Mengimpor Button dari react-native
} from "react-native";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
const { height } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

const WelcomeScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={require("../assets/images/bg.png")} // Ganti dengan path gambar latar belakang yang Anda inginkan
        style={{
          flex: 1,
          position: "absolute",
          width: "100%",
          height: "100%",
          justifyContent: "flex-end",
        }}
      />
      {/* Background container */}
      <View style={styles.backgroundContainer}>
        <Image
          style={{
            width: 300, // Lebar gambar yang diinginkan
            height: 300, // Tinggi gambar yang diinginkan
            marginHorizontal: 40,
            alignItems: "center",
            
          }}
          resizeMode="contain"
          source={require("../assets/images/logo.png")}
        />
      </View>


      <View style={styles.contentContainer}>
        <Text
          style={{
            fontSize: FontSize.xxLarge,
            color: Colors.onPrimary,
            fontFamily: Font["poppins-bold"],
            textAlign: "center",
          }}
        >
          Aplikasi TPS PLAN
        </Text>

        <Text
          style={{
            fontSize: FontSize.small,
            color: Colors.onPrimary,
            fontFamily: Font["poppins-regular"],
            textAlign: "center",
            marginTop: Spacing * 2,
          }}
        >
          Aplikasi Dimana Untuk Planning Sebuah Project Yang Sedang berjalan
        </Text>

        <View
          style={{
            paddingHorizontal: Spacing * 1,
            paddingTop: Spacing * 10,
            flexDirection: "column",
          justifyContent: "center", // Menempatkan tombol di tengah secara horizontal
          alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => navigate("Login")}
            style={{
              backgroundColor: Colors.primary,
              paddingVertical: Spacing * 2,
              paddingHorizontal: Spacing * 2,
              width: "115%",
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
                fontSize: FontSize.large,
                textAlign: "center",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
         
        </View>


      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    flex: 0.75,
    backgroundColor: Colors.onBackground, // Ganti dengan warna latar belakang container yang Anda inginkan
  },
  contentContainer: {
    flex: 1.5,
    paddingHorizontal: Spacing * 4,
    paddingTop: Spacing * 4,
  },
});

export default WelcomeScreen;
// when you insect a chat respones in the accesible videw you can use now the code block
// custom editor supprot in floating windows