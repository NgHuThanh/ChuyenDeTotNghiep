import CustomButton from '@/component/CustomButton';
import { Feather } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View,Image, Button, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import useSWR from 'swr';
import WordComponent from './wordComponent';

const url="https://api.mymemory.translated.net/get?q=Hello World!&langpair=en|it";
const fetcher = async (url:string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

export default function LongApp() {
    const [text, setText] = useState('');
    const handleInputChange = (inputText: string) => {
        setText(inputText);
        
      };
  return (
    <>
        <SafeAreaView>
            <View style={styles.headContainer}>
                <Text style={styles.text}>Your set</Text>    
            </View>
            <TextInput
            label="Find your vocablary"
            value={text}
            onChangeText={handleInputChange}
            />
            <ScrollView style={{padding:10}}>
                <WordComponent></WordComponent>
            </ScrollView>
        </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
    headContainer: {
        backgroundColor:'#410fa3',
        padding:5,
      },
    text: {
    marginTop:20,
    color: '#faf9fd',
    fontWeight:"bold",
    fontSize: 18,
    },
});
