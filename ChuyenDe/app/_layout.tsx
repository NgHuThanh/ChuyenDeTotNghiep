import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Rootlayout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="(auth)" options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="(tabs)" options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="imagePractice" options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="grammar" options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="grammarDetail" options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="longstranslate" options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="match" options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="muitiplechoice" options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="qaa" options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="review" options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="vocabSet" options={{headerShown:false}}></Stack.Screen>

    </Stack>
  )
}

export default Rootlayout

const styles = StyleSheet.create({})