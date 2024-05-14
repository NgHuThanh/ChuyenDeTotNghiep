
import CustomButton from '@/component/CustomButton';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View,Image, Button, Touchable, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { updateUserSource } from './firebase/config';
import { clearAll } from '@/model/asyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function App() {
  const localImageUrl = require('../assets/images/illustrations.png');
  
  const handleExport=()=>{
    updateUserSource()
  }
  const [ex,setEx]=useState(false);
  const check=async ()=>{
    const userId=await AsyncStorage.getItem("username");
    if(userId!=null){
      router.push("/(tabs)/home");
    }
    else{
      setEx(true);
        }
  }
  useEffect(() => {
    check();
  }, []);
  if(ex==false){
    return (<SafeAreaView style={{backgroundColor:"#410fa3",height:"100%",alignItems:"center",justifyContent:"center"}}>
       <Text style={styles.text}>Loading...</Text>
    </SafeAreaView>);
  }
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{backgroundColor:"#410fa3",height:"100%"}}>
      
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imageContainer}>
        {/* <Image
          source={localImageUrl} // source là một prop để truyền đường dẫn của hình ảnh
          style={styles.image} // style để tùy chỉnh kích thước, vị trí, và các thuộc tính khác của hình ảnh
          resizeMode="cover" // resizeMode để chỉ định cách ảnh sẽ được căn chỉnh khi hiển thị (cover, contain, stretch, ...)
            /> */}
        <Text style={styles.text}>English App</Text>
        <CustomButton
        title={"Login now"}
        
        ></CustomButton>
        <TouchableOpacity style={styles.button}onPress={()=>router.push("/(tabs)/home")}>
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={handleExport}>
        updateUserSource
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClear}>
        Clear
        </TouchableOpacity> */}
        
        </View>
        {/* <StatusBar backgroundColor='' style='light'></StatusBar> */}
      </ScrollView>
    </SafeAreaView>
    </GestureHandlerRootView>
    
    // <View style={styles.container}>
    //   <Text>WELCOME TO MY WORLD</Text>
    //   <StatusBar style="auto" />
    //   <Link href="/profile" style={{color:"blue"}}>Go to profile</Link>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0 // Đặt khoảng cách trên 100px
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200, // Chiều rộng của hình ảnh
    height: 200, // Chiều cao của hình ảnh
    borderRadius: 10, // Bo góc của hình ảnh
  },
  text: {
    color: 'white', // Màu trắng cho văn bản
    fontSize: 50, // Kích thước văn bản
    marginTop: 20, // Khoảng cách giữa hình ảnh và văn bản
    fontWeight:"bold",
  },
  button: {
    marginTop:40,
    backgroundColor: 'white', // Màu nền của button
    borderRadius: 8, // Bo góc của button
    
    justifyContent: 'center', // Căn chỉnh theo chiều dọc
    alignItems: 'center', // Căn chỉnh theo chiều ngang
    padding:20,
    width:200,

  },
  buttonText: {
    color: '#410fa3',
    fontWeight:"bold", // Màu chữ của button
    fontSize: 24, // Kích thước chữ của button
  },
});
