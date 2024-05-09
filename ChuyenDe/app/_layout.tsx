import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Rootlayout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="(auth)" options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="(tabs)" options={{headerShown:false}}></Stack.Screen>
        
    </Stack>
  )
}

export default Rootlayout

const styles = StyleSheet.create({})