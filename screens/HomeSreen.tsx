import React, { useContext, useEffect } from 'react';
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { FontAwesome5 } from '@expo/vector-icons';
import Spacing from '../constants/Spacing';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Font from '../constants/Font';
import FontSize from '../constants/FontSize';
import { FlatList } from 'react-native';
import ListScreen from './ListScreen';
import { Card, Title } from 'react-native-paper';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const navigateToScreen = (screenName: keyof RootStackParamList) => {
    navigation.navigate('Akun');
  };

  const { userData, isLoading, fetchUserDataByNIP } = useContext(AuthContext);
//import variabel data dari exportan file authcontext
  useEffect(() => {
    fetchUserDataByNIP();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
    <ImageBackground
      source={require('../assets/images/TPS-93.png')}
      style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.8)',
      justifyContent: 'flex-end', }}
    >
      <Spinner visible={isLoading} />
      <View style={styles.titleContainer}>
      <Text style={styles.teamTitle}>Team</Text>
    </View>
      {userData.length > 0 ? (
        <FlatList
          data={userData}
          keyExtractor={(item) => item.idTim.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ProjectsByTeam', { idTim: item.idTim });//yang dipanggil id yang ada pada api yang didapat
              }}
            >
              <Card style={styles.timBox}>
                <Card.Content>
                  <Title style={styles.timBoxText}>{item.namaTim}</Title>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noTimText}>Tidak ada tim yang ditemukan.</Text>
      )}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <FontAwesome5 name="home" style={styles.navbarIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Akun')}>
          <FontAwesome5 name="user" style={styles.navbarIcon} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
    </SafeAreaView> //area ini untuk tempat semua komponen agar sesuai dengan ukurann hp
      );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#51bbe3',
    padding: 16,
  },
  titleContainer: {
    backgroundColor: '#51bbe3', 
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
  navbarIcon: {
    color: 'white',
    fontSize: 24,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 16,
  },
  timBox: {
    marginBottom: 10,
    marginTop: 10,
    elevation: 4,
    marginLeft: 10,
    marginRight: 10,
  },
  timBoxText: {
    textAlign: 'left',
    fontSize: 18,
  },
  noTimText: {
    fontSize: FontSize.medium,
    textAlign: 'center',
    marginTop: 20,
  },
  teamTitle: {
    fontSize: 24,
    textAlign: 'left',
    marginVertical: 5,
    marginLeft: 10,
  },
});

export default HomeScreen;
