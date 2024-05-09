import { AntDesign, Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, View,TouchableOpacity, ScrollView } from 'react-native';
import { PaperProvider, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import QaaComponent from './qaaComponent';
import { router } from 'expo-router';

const url="https://api.mymemory.translated.net/get?q=Hello World!&langpair=en|it";
const fetcher = async (url:string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

export default function qaa() {
  const handlePressBack=()=>{
    router.push("/(tabs)/home");
  }
  return (
    <PaperProvider>
    <SafeAreaView style={styles.container}>
    <TouchableOpacity style={{alignSelf:"flex-start"}} onPress={handlePressBack}><AntDesign name="arrowleft" size={30} color="black" /></TouchableOpacity>

        <View style={styles.boxQaa}><TouchableOpacity><Text style={styles.text}>What are you thinking now?</Text></TouchableOpacity></View>
        <ScrollView style={{padding:10}}>
            <QaaComponent/>
            <QaaComponent/>
            <QaaComponent/>
            <QaaComponent/>
        </ScrollView>
    {/* <PaperProvider >
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <AddSetComponent fetchSets={fetchSets} />
      </Modal>
      <Modal visible={visibleImport} onDismiss={hideModal2} contentContainerStyle={containerStyle}>
        <ImportSet fetchSets={fetchSets} />
      </Modal>
    </Portal> */}
    
    
   
    {/* </PaperProvider> */}
  </SafeAreaView>
  </PaperProvider>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:10,
      },
    boxQaa:{
        backgroundColor:"#FFF",
        padding:15,
        borderRadius:10,
        marginBottom:10,
        shadowColor: '#000', // Màu của shadow
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27, // Độ mờ của shadow
        shadowRadius: 4.65,
    },
    text:{
        color:"gray"
    }
    
});
