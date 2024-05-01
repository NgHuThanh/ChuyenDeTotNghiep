import { ScrollView, StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FeatureCourse from '../homeComponent/featureCourse';
import FeatureCourseWord from '../homeComponent/featureCourseWord';
import PracticeCourse from '../homeComponent/practiceCourse';

const Home = () => {
  const localImageUrl = require('../../assets/images/defaultAvatat.png');
  return (
    <SafeAreaView style={{backgroundColor:"#FFF"}}>
      <ScrollView>
        <View style={styles.headContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={localImageUrl}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.text}>Hello, Thanh</Text>
          <Text style={styles.textSmall} >What would you like to learn to day ?</Text>
        </View>
        <View style={{padding:20}}>
        <Text style={styles.text2}>Daily Course</Text>
        <PracticeCourse/>
        <Text style={styles.text2}>Feature Course</Text>
        <FeatureCourse/>
        <FeatureCourseWord/>
        
        </View>
        
      </ScrollView>
      
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  imageContainer: {
    width:50,
    height:50,
    borderWidth: 3, // Độ dày của viền
    borderColor: 'white', // Màu của viền
    borderRadius: 100, // Độ cong của viền để tạo border tròn
    overflow: 'hidden', // Ẩn bất kỳ phần nào của hình ảnh vượt ra ngoài viền
  },
  headContainer: {
    backgroundColor:'#410fa3',
    padding:20// Độ cong của viền để tạo border tròn
     // Ẩn bất kỳ phần nào của hình ảnh vượt ra ngoài viền
  },
  image: {
    width: 50, // Chiều rộng của hình ảnh
    height: 50, // Chiều cao của hình ảnh
  },
  text: {
    marginTop:20,
    color: '#faf9fd',
    fontWeight:"bold", // Màu chữ của button
    fontSize: 18, // Kích thước chữ của button
  },
  text2: {
    marginTop:5,
    color: 'black',
    fontWeight:"bold", // Màu chữ của button
    fontSize: 18,
    marginBottom:20, // Kích thước chữ của button
  },
  textSmall: {
    marginTop:10,
    color: '#888',
    fontWeight:"bold", // Màu chữ của button
    fontSize: 12, // Kích thước chữ của button
  },
})