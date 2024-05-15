import React from 'react';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GrammarComponent from './grammarComponent';
import { grammar } from '@/model/grammar';
import { getGrammarList } from '../firebase/config';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

const url = "https://api.mymemory.translated.net/get?q=Hello World!&langpair=en|it";
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

export default function GrammarHome() {
  const [grammars, setGrammars] = useState<grammar[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const grammarListData = await getGrammarList();
        setGrammars(grammarListData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data: ", error);
      }
    }
    fetchData();
  }, []);
  const handlePressBack=()=>{
    router.push("/(tabs)/home");
  }
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity style={{alignSelf:"flex-start"}} onPress={handlePressBack}><AntDesign name="arrowleft" size={30} color="black" /></TouchableOpacity>

        <Text style={styles.text}>Loading...</Text>
        
      </View>
    );
  }
  
  return (
    <SafeAreaView style={{ backgroundColor: "#FFF", height: "100%" }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handlePressBack}>
          <AntDesign name="arrowleft" size={30} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>GRAMMAR & QUIZ</Text>
      </View>

      <ScrollView style={{padding:10}}>
        {grammars.map((grammar) => (
          <GrammarComponent key={grammar.id} grammar={grammar} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#410fa3', // Màu trắng cho văn bản
    fontSize: 20, // Kích thước văn bản
    marginTop: 20, // Khoảng cách giữa hình ảnh và văn bản
    fontWeight:"bold",
    marginBottom:20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding:10,
    backgroundColor:"#410fa3",

  },
  backButton: {
    alignSelf: 'flex-start',
  },
  headerText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
