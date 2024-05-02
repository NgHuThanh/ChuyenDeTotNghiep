import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper';
import SetComponent from '../bookMarkComponent/setComponent';

const BookMark = () => {
  const [text, setText] = useState('');

  const handleInputChange = (inputText:string) => {
    setText(inputText);
  };
  return (
    <SafeAreaView >
      <View style={styles.headContainer}>
          <Text style={styles.text}>Your words</Text>    
      </View>
      <TextInput
        label="Find you name set vocab"
        value={text}
        onChangeText={handleInputChange}
      />
      <ScrollView style={{padding:10}}>
        <SetComponent></SetComponent>
        <SetComponent></SetComponent>
        <SetComponent></SetComponent>
      </ScrollView>
    </SafeAreaView>
      
  )
}

export default BookMark

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