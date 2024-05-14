import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Modal, PaperProvider, Portal, ProgressBar, Surface, TextInput } from 'react-native-paper';
import SetComponent from '../bookMarkComponent/setComponent';
import { AntDesign } from '@expo/vector-icons';
import AddSetComponent from '../bookMarkComponent/addSet';
import { SetModel, getAllSets } from '@/model/word';
import { exportData } from '@/model/asyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImportSet from '../bookMarkComponent/import';

const BookMark = () => {
  const [text, setText] = useState('');
  const [sets, setSets] = useState<SetModel[] | null>(null);
  const [filteredSets, setFilteredSets] = useState<SetModel[] | null>(null);
  const [username, setUsername] = useState('');
  
  useEffect(() => {
    // Lấy giá trị của 'username' từ AsyncStorage khi component được render
    const getUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername !== null) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.error('Error retrieving username from AsyncStorage:', error);
      }
    };
    
    getUsername();
  }, []);
  const fetchSets = async () => {
    const allSets  = await getAllSets();
    setSets(allSets);
    setFilteredSets(allSets);
  };
  useEffect(() => {
    fetchSets();
  }, []);
  const handleInputChange = (inputText: string) => {
    // Cập nhật giá trị của text
    setText(inputText);
    // Lọc các set từ sets dựa trên text và cập nhật filteredSets
    const filteredSets = sets?.filter(set => set.name.toLowerCase().includes(inputText.toLowerCase()));
    setFilteredSets(filteredSets as SetModel[]);
  };
  
  const [visible, setVisible] = React.useState(false);
  const [visibleImport, setvisibleImport] = React.useState(false);
  const showSetvisibleImport = () => setvisibleImport(true);
  const showModal = () => setVisible(true);
  const hideModal = () => {
    fetchSets();
    setFilteredSets(sets as SetModel[]);
    setVisible(false)
    
  };
  const hideModal2 = () => {
    fetchSets();
    setFilteredSets(sets as SetModel[]);
    setvisibleImport(false)
    
  };
  const containerStyle: ViewStyle = {
    backgroundColor: 'white',
    padding: 0,
    width: 300,
    height: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius:10,
  };
  return (
    <PaperProvider >
    <SafeAreaView style={styles.container}>
      
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <AddSetComponent fetchSets={fetchSets} />
        </Modal>
        <Modal visible={visibleImport} onDismiss={hideModal2} contentContainerStyle={containerStyle}>
          <ImportSet fetchSets={fetchSets} />
        </Modal>
      </Portal>
      
      
      <View style={styles.headContainer}>
        <Text style={styles.text}>Your words {username}</Text>    
        <TouchableOpacity onPress={showSetvisibleImport} style={styles.button2}>
        <Text><Text style={styles.text3}>Import by ID</Text></Text>
        </TouchableOpacity>      
      </View>
      <View style={{padding:10,}}>
      <TextInput
        label="Find your name set vocab"
        value={text}
        onChangeText={handleInputChange}
        mode="outlined"
        textColor="black"
        style={styles.input}
      />
      </View>
      
      <ScrollView style={{ padding: 10 }}>
        {filteredSets?.map((set) => (
          <SetComponent setVocab={set} key={set.name} fetchSets={fetchSets}></SetComponent>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={showModal}>
        <AntDesign name="addfolder" size={24} color="#FFF" />
      </TouchableOpacity>
      
    </SafeAreaView>
    </PaperProvider>
  )
}

export default BookMark

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input:{
    backgroundColor:"#FFF"
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
  button2: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    height:40,
    position: 'absolute',
    
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding:5,
  },
  text: {
    marginTop:20,
    color: '#faf9fd',
    fontWeight:"bold",
    fontSize: 18,
  },
  text3: {
    
    color: '#410fa3',
    fontWeight:"bold",
    fontSize: 14,
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
