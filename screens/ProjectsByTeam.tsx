import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'; // Perhatikan penggunaan ImageBackground
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { FlatList } from 'react-native';
import { Card, Title, Paragraph, Appbar, Menu } from 'react-native-paper';

type Props = NativeStackScreenProps<RootStackParamList, 'ProjectsByTeam'>;

type ProjectData = {
  idProject: number;
  projectName: string;
  dueDate: string;
  taskDesc: string;
  status: string;
  // ... other properties
};

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const ProjectsByTeam: React.FC<Props> = ({ route, navigation }) => {
  const { idTim } = route.params;
  const [isMenuVisible, setMenuVisible] = useState(false); // Add state for menu visibility
  const { getProjectsByTeam } = useContext(AuthContext);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsData = await getProjectsByTeam(idTim);
      setProjects(projectsData);
      setIsLoading(false);
    };

    fetchProjects();
  }, [idTim]);

  return (
    
      <SafeAreaView style={styles.container}>

      
        <Appbar.Header style={styles.appBar}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Projects" />
          <Appbar.Action
            icon={MORE_ICON}
            onPress={() => {
              // Tambahkan aksi lebih lanjut di sini
              navigation.navigate('MembersByTeam', { idTim });
            }}
          />
        </Appbar.Header>

        <ImageBackground
      source={require('../assets/images/TPS-93.png')}
      style={styles.backgroundImage}
    >

        <Spinner visible={isLoading} />
        {isLoading ? (
          <Text>Loading projects...</Text>
        ) : (
          <FlatList
            data={projects}
            keyExtractor={(item) => item.idProject.toString()}
            renderItem={({ item }) => (
              <Card style={styles.projectCard}>
                <Card.Content>
                  <Title style={styles.projectTitle}>{item.projectName}</Title>
                  <Paragraph>Due Date: {item.dueDate}</Paragraph>
                  {/* <Paragraph>Task Description: {item.taskDesc}</Paragraph> */}
                  <Paragraph>Status: {item.status}</Paragraph>
                  {/* Add more project details as needed */}
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
  teamTitle: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 16,
  },
  projectCard: {
    marginBottom: 10,
    elevation: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  projectTitle: {
    fontSize: 18,
    textAlign: 'left',
  },
  appBar: {
    position: 'absolute', // Menggeser Appbar.Header ke atas
    left: 0,
    right: 0,
    backgroundColor: 'transparent', // Gunakan latar belakang transparan atau sesuaikan dengan kebutuhan Anda
  },
});

export default ProjectsByTeam;

