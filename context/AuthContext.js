import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';
import { TIM_URL } from '../config';
import { LP_URL } from '../config';
import { IMAGE_P } from '../config';
import { PROBYTEAM } from "../config";
import { MEMBERBYTEAM } from "../config";



export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [imageSrc, setUserImage] = useState('');



  const fetchUserImage = async () => {
    try {

      const nip = await AsyncStorage.getItem('nip');
      console.log('NIP yang diambil dari AsyncStorage:', nip);
      
  
    if (!nip) {
      console.error('NIP tidak ditemukan di AsyncStorage');
      return;
    }


      const response = await axios.get(`${IMAGE_P}/${nip}`);
      const { data } = response.data;
      //const base64Image = response.data.data; // Ganti dengan nama properti yang sesuai pada respons API
      const imageSrc = data;
      setUserImage(imageSrc);
    } catch (error) {
      console.error('Error fetching user image:', error);
    }
  };
  
  



  const forgotPassword = (email) => {

    setIsLoading(true);

    // Mengirim permintaan ke API untuk lupa password
    axios.post(`${LP_URL}`, {email})
      .then(() => {
        // Handle respons dari API jika diperlukan
        console.log('Permintaan lupa password berhasil dikirim');
        alert("Permintaan lupa password berhasil dikirim")
        // Tambahkan kode lain sesuai kebutuhan, seperti menampilkan pesan berhasil
      })
      .catch(error => {
        // Handle error jika permintaan gagal
        console.error('Error saat mengirim permintaan lupa password:', error);
        alert("Error saat mengirim permintaan lupa password")
        // Tambahkan kode lain sesuai kebutuhan, seperti menampilkan pesan error
      });
  };

    




  const login = async (username, password, navigation) => {
    setIsLoading(true);
  
    try {
      const response = await axios.post(`${BASE_URL}`, {
        username,
        password,
      });
      const userInfo = response.data;
  
      if (userInfo) {
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        AsyncStorage.setItem('nip', userInfo.user.nip);
        AsyncStorage.setItem('token', userInfo.token);
        setUserInfo(userInfo);
        setIsLoggedIn(true);
  
        // Navigasi ke halaman beranda jika login berhasil
        navigation.navigate("Home");
      } else {
        console.error('Respons API tidak berisi data pengguna yang valid');
        alert('Respons API tidak berisi data pengguna yang valid');
      }
  
      setIsLoading(false);
    } catch (error) {
      // Handle login error
      console.error('Error saat login:', error);
      alert('Terjadi kesalahan saat login. Pastikan data yang Anda masukkan benar.');
      setIsLoading(false);
    }
  };
  


  
  





  const logout = async () => {
    setIsLoading(true);

    try {
      // Ambil token dari AsyncStorage
      const storedUserInfo = await AsyncStorage.getItem('userInfo');
      const storedToken = storedUserInfo ? JSON.parse(storedUserInfo).access_token : null;
  
      // Hanya lanjutkan jika token tersedia
      if (storedToken) {
        // Kirim permintaan logout dengan token yang diambil dari AsyncStorage
        await axios.post(
          `${BASE_URL}`,
          {},
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
      }
  
      // Hapus data pengguna dari AsyncStorage
      await AsyncStorage.removeItem('userInfo');
  
      // Set ulang state userInfo dan isLoading
      setUserInfo({});
      setIsLoading(false);
    } catch (error) {
      console.error(`logout error: ${error}`);
      setIsLoading(false);
    }
  };

  const checkLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
        setIsLoggedIn(true); // Set isLoggedIn menjadi true jika pengguna telah login
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

// jika akun login akan di check informasi akunya benar apa tidak di database

  
  
  const checkLoginStatus = async () => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
  
    if (isLoggedIn === 'true') {
      // Pengguna sudah login, arahkan ke halaman utama atau beranda
    } else {
      // Pengguna belum login, arahkan ke halaman login
    }
  };
  
  checkLoginStatus();
  

  const fetchUserDataByNIP = async () => {
    try {
      // Ambil 'nip' dari AsyncStorage
      const nip = await AsyncStorage.getItem('nip');
      console.log('NIP yang diambil dari AsyncStorage:', nip);
    const token = await AsyncStorage.getItem('token');
    console.log('token yang diambil dari AsyncStorage:', token);

    if (!nip) {
      console.error('NIP tidak ditemukan di AsyncStorage');
      return null;
    }
// jika  token saat diambil tidak ditemukan storage maka 
    if (!token) {
      console.error('Access token tidak ditemukan di AsyncStorage');
      return null;
    }

    const accessToken = token;

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      // Buat permintaan ke API TIM_URL dengan 'nip'
      const response = await axios.get(
        TIM_URL.replace("{userNip}", nip),
        config
      );
  
      if (response.status === 200) {
        // Ambil data tim dari respons API
        const userData= response.data;
        setUserData(userData);
        // Simpan data tim dalam state atau variabel yang sesuai di AuthContext
        // Contoh: setDataTim(userTim);
        // setDataTim adalah state atau variabel yang akan Anda buat di AuthContext
      } else {
        console.error('Data tim tidak ditemukan dalam respons API');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user data by NIP:', error);
      throw error;
    }
  };
  

  const getProjectsByTeam = async (idTim) => {
    try {
      const accessToken = await AsyncStorage.getItem("token");

      if (!accessToken) {
        console.error("Token tidak ditemukan di AsyncStorage");
        return null;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.get(
        `${PROBYTEAM.replace("{idTim}", idTim)}`,
        config
      );

      if (response.status === 200) {
        const projectsData = response.data;
        return projectsData;
      } else {
        console.error("Data proyek tidak ditemukan dalam respons API");
        return null;
      }
    } catch (error) {
      console.error("Error fetching projects by team:", error);
      throw error;
    }
  };


  const getMembersByTeam = async (idTim) => {
    try {
      const accessToken = await AsyncStorage.getItem("token");
  
      if (!accessToken) {
        console.error("Token tidak ditemukan di AsyncStorage");
        return null;
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
  
      const response = await axios.get(
        `${MEMBERBYTEAM.replace("{idTim}", idTim)}`,
        config
      );
  
      if (response.status === 200) {
        const membersData = response.data;
        return membersData;
      } else {
        console.error("Data anggota tim tidak ditemukan dalam respons API");
        return null;
      }
    } catch (error) {
      console.error("Error fetching members by team:", error);
      throw error;
    }
  };
  
  
  useEffect(() => {
    checkLoggedIn(); // Panggil checkLoggedIn saat aplikasi dimuat
  }, []);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     fetchData(); // Panggil fetchData hanya jika pengguna sudah login
  //   }
    
  // }, [isLoggedIn]);

  


  
  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        forgotPassword,
        fetchUserImage,
        imageSrc,
        userData,
        login,
        logout,
        fetchUserDataByNIP,
        getProjectsByTeam,
        getMembersByTeam,
        isLoggedIn
      }}>
      {children}
    </AuthContext.Provider>
  );
};