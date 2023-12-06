import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, Text, View, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { FlatList } from 'react-native';
import { Card, Title, Appbar } from 'react-native-paper';

type Props = NativeStackScreenProps<RootStackParamList, 'MembersByTeam'>;

type MemberData = {
  idMember: number;
  teamId: number;
  user: {
    nip: string;
    name: string; // Ambil name dari user
    email: string;
    nohp: string;
    password: string;
    role: string;
    status: string;
    resetPasswordExpires: string | null;
    createdAt: string;
    updatedAt: string;
  };
  // ... other member propertie data isi body sesuai yang ada pada database

};

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const MembersByTeam: React.FC<Props> = ({ route, navigation }) => {
  const { idTim } = route.params;
  const { getMembersByTeam } = useContext(AuthContext);
  const [members, setMembers] = useState<MemberData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      const membersData = await getMembersByTeam(idTim);
      setMembers(membersData);
      setIsLoading(false);
    };

    fetchMembers();
  }, [idTim]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/images/TPS-93.png')} // Gantilah dengan path yang sesuai ke gambar latar belakang Anda
        style={styles.backgroundImage}
      >
        <Appbar.Header style={styles.appBar}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Members" />
        </Appbar.Header>
        <Spinner visible={isLoading} />
        {isLoading ? (
          <Text>Loading members...</Text>
        ) : (
          <FlatList
            data={members}
            keyExtractor={(item) => item.idMember.toString()}
            renderItem={({ item }) => (
              <Card style={styles.memberCard}>
                <Card.Content>
                  <Title style={styles.memberTitle}>{item.user.email}</Title> 
                  {/* Add more member details as needed */}
                </Card.Content>
              </Card>
            )}
          />
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingBottom: 5,
  },
  backgroundImage: {
    flex: 1,
    // Opacity (Ketebalan gambar latar belakang)
  },
  memberCard: {
    marginBottom: 10,
    elevation: 4,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  memberTitle: {
    fontSize: 18,
    textAlign: 'left',
  },
  appBar: {
    marginTop: -50,
  },
});

export default MembersByTeam;
