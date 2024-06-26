import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

import FeatureCourse from '../homeComponent/featureCourse';
import FeatureCourseWord from '../homeComponent/featureCourseWord';
import PracticeCourse from '../homeComponent/practiceCourse';
import PracticeDay, { getPracticeDays } from '@/model/practiceDay';
import { exportData } from '@/model/asyncStorage';
import { setAsyncData } from '@/model/word';
import { AntDesign } from '@expo/vector-icons';

const Home = () => {
  const localImageUrl = require('../../assets/images/book.png');
  const [username, setUsername] = useState<string>();
  const [avatar, setAvatar] = useState<string>();
  
  useEffect(() => {
    
    // Lấy giá trị của 'username' từ sAsyncStorage khi component được render
    const getUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const storedAvatar = await AsyncStorage.getItem('avatar');
        if (storedUsername !== null) {
          setUsername(storedUsername);
        }
        if (storedAvatar !== null) {
          setAvatar(storedAvatar);
        }
      } catch (error) {
        console.error('Error retrieving username from AsyncStorage:', error);
      }
    };
    
    getUsername();
  }, []); // Chỉ chạy một lần khi componesnt được render

  return (
    <SafeAreaView style={{ backgroundColor: '#410fa3',height:"100%" }}>
      <ScrollView >
        <View style={{backgroundColor:"#FFF",minHeight:1000}}>
          <View style={styles.headContainer}>
            <View style={styles.imageContainer}>
            <Image 
                  source={avatar ? { uri: avatar } : localImageUrl} 
                  style={styles.image} 
                />
            </View>
            
            <Text style={styles.text}>Hello {username}</Text> 
            <Text style={styles.textSmall}>What would you like to learn today?</Text>
            
            
          </View>
          <View style={{ padding: 20 ,height:"100%"}}>
            <Text style={styles.text2}>Daily Course</Text>
            <PracticeCourse />
            <Text style={styles.text2}>Feature Course</Text>
            <FeatureCourse />
            <FeatureCourseWord />
          </View>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  imageContainer: {
    width: 50,
    height: 50,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 100,
    overflow: 'hidden',
    alignItems:"center",
    justifyContent:"center"
  },
  image: {
    width: 50,
    height: 50,
  },
  headContainer: {
    backgroundColor: '#410fa3',
    padding: 20,
  },
  
  text: {
    marginTop: 20,
    color: '#faf9fd',
    fontWeight: 'bold',
    fontSize: 18,
  },
  text2: {
    marginTop: 5,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,
  },
  textSmall: {
    marginTop: 10,
    color: '#888',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
