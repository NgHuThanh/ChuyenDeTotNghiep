import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const CustomButton = (props: {
    title:String,
    
  }) => {
  return (
    <TouchableOpacity onPress={()=>router.push('/(auth)/sign-in')} style={styles.button} activeOpacity={0.7}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  button: {
    marginTop:40,
    backgroundColor: 'white', // Màu nền của button
    borderRadius: 8, // Bo góc của button
    height: 80, // Chiều cao của button
    justifyContent: 'center', // Căn chỉnh theo chiều dọc
    alignItems: 'center', // Căn chỉnh theo chiều ngang
    padding:20,
    width:200,

  },
  buttonText: {
    color: '#410fa3',
    fontWeight:"bold", // Màu chữ của button
    fontSize: 18, // Kích thước chữ của button
  },
})
