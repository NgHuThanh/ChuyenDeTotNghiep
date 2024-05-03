import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Modal, PaperProvider, Portal, Surface, TextInput } from 'react-native-paper';
import SetComponent from '../bookMarkComponent/setComponent';
import { AntDesign } from '@expo/vector-icons';
import AddSetComponent from '../bookMarkComponent/addSet';
import { SetModel, getAllSets } from '@/model/word';

const BookMark = () => {
  const [text, setText] = useState('');
  const [sets, setSets] = useState<SetModel[] | null>(null);
  const [filteredSets, setFilteredSets] = useState<SetModel[] | null>(null);
  const fetchSets = async () => {
    const allSets  = await getAllSets();
    setSets(allSets);
  };
  useEffect(() => {
    fetchSets();
  }, []);
  const handleInputChange = (inputText: string) => {
    setText(inputText);
    fetchSets();
    const filteredSets = sets?.filter(set => set.name.toLowerCase().includes(inputText.toLowerCase()));
    setFilteredSets(filteredSets as SetModel[]);
  };
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => {
    fetchSets();
    setFilteredSets(sets as SetModel[]);
    setVisible(false)
    
  };
  const containerStyle: ViewStyle = {
    backgroundColor: 'white',
    padding: 0,
    width: 300,
    height: 200,
    alignSelf: 'center',
    justifyContent: 'center',
  };
  return (
    <SafeAreaView style={styles.container}>
      <PaperProvider >
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <AddSetComponent fetchSets={fetchSets} />
        </Modal>
      </Portal>
      
      
      <View style={styles.headContainer}>
        <Text style={styles.text}>Your words</Text>    
      </View>
      <TextInput
        label="Find your name set vocab"
        value={text}
        onChangeText={handleInputChange}
      />
      <ScrollView style={{padding:10}}>
        {filteredSets?.map((set, index) => (
          <SetComponent setVocab={set} key={index} fetchSets={fetchSets}></SetComponent>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={showModal}>
        <AntDesign name="addfolder" size={24} color="#FFF" />
      </TouchableOpacity>
      </PaperProvider>
    </SafeAreaView>
  )
}

export default BookMark

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  headContainer: {
    backgroundColor:'#410fa3',
    padding:20,
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
  text: {
    marginTop:20,
    color: '#faf9fd',
    fontWeight:"bold",
    fontSize: 18,
  },
  text2: {
    marginTop:5,
    color: 'black',
    fontWeight:"bold",
    fontSize: 18,
    marginBottom:20,
  },
  textSmall: {
    marginTop:10,
    color: '#888',
    fontWeight:"bold",
    fontSize: 12,
  },
})
