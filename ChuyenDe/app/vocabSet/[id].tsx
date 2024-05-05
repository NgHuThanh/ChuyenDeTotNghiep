import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View,TouchableOpacity, ViewStyle } from 'react-native';
import { Modal, PaperProvider, Portal, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import WordComponent from './wordComponent';
import React from 'react';
import AddVocabComponent from './addVocab';
import { getVocabsInSet, vocab } from '@/model/word';
import { useLocalSearchParams } from 'expo-router';

const url="https://api.mymemory.translated.net/get?q=Hello World!&langpair=en|it";
const fetcher = async (url:string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

    
export default function SetDetail() {
  const {id}=useLocalSearchParams();
  const [vocabs, setVocabs] = useState<vocab[] | null>(null);
  const fetchVocabs = async () => {
    const allVocabs = await getVocabsInSet(id as string);
    setVocabs(allVocabs);
  };
  useEffect(() => {
    fetchVocabs();
  }, []);
  const router = useRouter();
  
    
    const [text, setText] = useState('');
    const handleInputChange = (inputText: string) => {
        setText(inputText);
      };
      const [visible, setVisible] = React.useState(false);
      const showModal = () => setVisible(true);
      const hideModal = () => {
        
        setVisible(false)
        fetchVocabs();
      };
      const containerStyle: ViewStyle = {
        backgroundColor: 'white',
        padding: 0,
        width: 300,
       
        alignSelf: 'center',
        justifyContent: 'center',
      };
  return (
    <>
        <SafeAreaView style={styles.container}>
        <PaperProvider >
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <AddVocabComponent nameSet={id as string}/>
                </Modal>
            </Portal>
        
            <View style={styles.headContainer}>
                <Text style={styles.text}>{id}</Text>    
            </View>
            <TextInput
            label="Find your vocablary"
            value={text}
            onChangeText={handleInputChange}
            />
            <ScrollView style={{padding:10}}>
            {vocabs?.map((vocab, index,key) => (
              <WordComponent nameSet={id as string} key={vocab.word}vocab={vocab} fetchVocabs={fetchVocabs}></WordComponent>
            ))}
                
            </ScrollView>
            </PaperProvider>
            <TouchableOpacity style={styles.button} activeOpacity={0.7} >
            <FontAwesome6 name="add" size={24} color="black"onPress={showModal}/>
            </TouchableOpacity>
            
        </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
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
    button: {
        backgroundColor: '#5b7bfe',
        borderRadius: 150,
        height: 50,
        width: 50,
        position: 'absolute',
        bottom: 20,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
});
