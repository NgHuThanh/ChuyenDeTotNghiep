import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import * as Speech from 'expo-speech';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
export default function Speak(props:{thingToSay:string}) {
  const speak = () => {
    const thingToSay = '1';
    Speech.speak(props.thingToSay);
  };
  
  return<>
    <TouchableOpacity onPress={speak}><Feather name="volume-2" size={24} color="black" /></TouchableOpacity>
  </>
}


