import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ViewStyle } from 'react-native';
import { Button, Menu, Modal, PaperProvider, Portal, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import WordComponent from './wordComponent';
import React from 'react';
import AddVocabComponent from './addVocab';
import { DifficultType, getVocabsInSet, getVocabsInSet2, vocab } from '@/model/word';
import { useLocalSearchParams } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

export default function SetDetail() {
  const [visibleOrder, setVisibleOrder] = useState(false);
  const [vocabs, setVocabs] = useState<vocab[] | null>(null);
  const [filteredVocabs, setFilteredVocabs] = useState<vocab[] | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [visible, setVisible] = useState(false);
  
  const { id } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    fetchVocabs();
  }, []);

  const fetchVocabs = async () => {
    const allVocabs = await getVocabsInSet(id as string);
    setVocabs(allVocabs);
    setFilteredVocabs(allVocabs);
  };
  
  const handleInputChange = (inputText: string) => {
    setText(inputText);
    const filteredVocabs = vocabs?.filter(vocab => vocab.word.toLowerCase().includes(inputText.toLowerCase()));
    setFilteredVocabs(filteredVocabs as vocab[]);
  };

  const handlePressBack = () => {
    router.push("/(tabs)/bookmark")
  };

  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    fetchVocabs();
  };
  
  const handleSort = (type: string) => {
    
    setSortBy(type);
    let sortedVocabs = [...filteredVocabs!];
  
    switch (type) {
      case 'ABC':
        sortedVocabs.sort((a, b) => a.word.localeCompare(b.word));
        break;
      case 'Difficult':
        sortedVocabs.sort((a, b) => {
          const difficultOrder: Record<DifficultType, number> = {
            'hard': 3,
            'good': 2,
            'easy': 1,
            'skip': 0,
          };
          return difficultOrder[b.difficult] - difficultOrder[a.difficult]; // Đảo ngược thứ tự
        });
        break;
        
        
    }
  
    setFilteredVocabs(sortedVocabs);
    setVisibleOrder(false); // Đóng menu sau khi sắp xếp
  };
  
  
  return (
    <SafeAreaView style={styles.container}>
      <PaperProvider>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
            <AddVocabComponent nameSet={id as string} />
          </Modal>
        </Portal>

        <View style={styles.headContainer}>
          <TouchableOpacity onPress={handlePressBack}>
            <AntDesign name="arrowleft" size={30} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.text}>{id}</Text>
          <View style={styles.menuContainer}>
            <Menu
              visible={visibleOrder}
              onDismiss={() => setVisibleOrder(false)}
              anchor={<Button onPress={() => setVisibleOrder(true)}><AntDesign name="filter" size={24} color="#FFF" /></Button>}
            >
              <Menu.Item onPress={() => handleSort('ABC')} title="ABC" />
              <Menu.Item onPress={() => handleSort('Difficult')} title="Difficult" />
              
            </Menu>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            label="Find word"
            value={text}
            onChangeText={handleInputChange}
            mode="outlined"
            textColor="black"
            style={styles.input}
          />
        </View>

        <ScrollView style={styles.scrollView}>
          {filteredVocabs?.map((vocab, index) => (
            <WordComponent nameSet={id as string} key={index} vocab={vocab} fetchVocabs={fetchVocabs} />
          ))}
        </ScrollView>

      </PaperProvider>

      <TouchableOpacity style={styles.addButton} activeOpacity={0.7} onPress={showModal}>
        <FontAwesome6 name="add" size={24} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headContainer: {
    backgroundColor: '#410fa3',
    padding: 5,
    flexDirection: "row",
    alignItems: 'center',
  },
  text: {
    color: '#faf9fd',
    fontWeight: "bold",
    fontSize: 28,
    textAlign: "center",
    marginLeft: 20,
  },
  menuContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  inputContainer: {
    padding: 10,
  },
  input: {
    backgroundColor: "#FFF",
  },
  scrollView: {
    padding: 10,
  },
  addButton: {
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
  modalContainer: {
    backgroundColor: 'white',
    padding: 5,
    height: "60%",
    width: "70%",
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
