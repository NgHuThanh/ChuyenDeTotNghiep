import CustomButton from '@/component/CustomButton';
import { AntDesign, Feather } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View,Image, Button, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import useSWR from 'swr';
import GrammarComponent from './grammarComponent';
import { grammar } from '@/model/grammar';
import { getGrammarList } from '../firebase/config';

const url="https://api.mymemory.translated.net/get?q=Hello World!&langpair=en|it";
const fetcher = async (url:string) => {
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
  if (loading) {
    return <View>Loading...</View>; // Hiển thị thông báo tải dữ liệu
  }
  return (
    <SafeAreaView style={{backgroundColor:"#364175",height:"100%",padding:10}}>
        <ScrollView>
          {grammars.map((grammar) => (
            <GrammarComponent key={grammar.id} grammar={grammar} />
          ))}
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    
      
});
