import { AntDesign, Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, View,TouchableOpacity, ScrollView, ViewStyle } from 'react-native';
import { Modal, PaperProvider, Portal, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import QaaComponent from './qaaComponent';
import { router } from 'expo-router';
import React from 'react';
import AvatarDetault from './avatarComponent';

const url="https://api.mymemory.translated.net/get?q=Hello World!&langpair=en|it";
const fetcher = async (url:string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

export default function qaa() {
    const [form, setForm] = useState({
        title: "",
        content: "",
        error: '', // Thêm trạng thái lỗi
        
      });
  const handlePressBack=()=>{
    router.push("/(tabs)/home");
  }
  const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
const containerStyle: ViewStyle = {
        position: 'absolute',
        top: 30,
        left: 0,
        right: 0,
        
        backgroundColor: 'white',
        padding: 0,
        alignSelf: 'center',
        justifyContent: 'center',
        marginHorizontal:10,
    };
  return (
    <PaperProvider>
    <SafeAreaView style={styles.container}>
    <TouchableOpacity style={{alignSelf:"flex-start"}} onPress={handlePressBack}><AntDesign name="arrowleft" size={30} color="black" /></TouchableOpacity>
    <View style={styles.header}>
        <AvatarDetault/>
        <TouchableOpacity onPress={showModal} style={styles.boxQaa}>
            <Text style={styles.text}>What are you thinking now?</Text>
        </TouchableOpacity>
    </View>

        <ScrollView style={{padding:10}}>
            <QaaComponent/>
            <QaaComponent/>
            <QaaComponent/>
            <QaaComponent/>
        </ScrollView>
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',padding:10,borderRadius:10 }}>
                    <TextInput
                            mode="outlined"
                            label="Title"
                            placeholder="Enter your post title"
                            value={form.title}
                            onChangeText={(text) => setForm({ ...form, title: text })}
                            style={styles.input}
                        />    
                    <TextInput
                            mode="outlined"
                            label="Content"
                            placeholder="Enter what are you thinking?"
                            value={form.title}
                            onChangeText={(text) => setForm({ ...form, content: text })}
                            style={styles.input2}
                        />         
                    <TouchableOpacity style={styles.commentButton}>Post now</TouchableOpacity>
                </View>
            </Modal>
        </Portal>
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
      input:{
        width:"100%",
        margin:10,
        backgroundColor:"#FFF"
        
    },
    input2:{
        width:"100%",
        margin:10,
        backgroundColor:"#FFF",
        minHeight:300,
        
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
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
        width:"80%",
        marginLeft:10,
    },
    container2: {
        backgroundColor: '#eeeee4', // Màu nền trắng
        borderRadius: 5, // Bo tròn góc
        marginBottom: 10, // Khoảng cách dưới cùng
        shadowColor: '#000', // Màu của shadow
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27, // Độ mờ của shadow
        shadowRadius: 4.65, // Độ đục của shadow
        elevation: 6, // Thêm elevation để hiển thị shadow trên Android
        padding: 10,
    },
    text:{
        color:"gray",
        
        
    },
    title: {
        fontWeight: 'bold', // In đậm
        fontSize: 20, // Kích thước phông chữ lớn hơn
        marginBottom: 10, // Khoảng cách dưới cùng của tiêu đề
    },
    userInfo: {
        flexDirection: 'row', // Sắp xếp các phần tử theo hàng ngang
        alignItems: 'center', // Canh chỉnh các phần tử theo trục dọc
        marginBottom: 10, // Khoảng cách dưới cùng của user info
    },
    userName: {
        fontSize: 16, // Kích thước phông chữ nhỏ hơn
        marginRight: 10, // Khoảng cách với thời gian
        fontWeight:"bold"
    },
    timeAgo: {
        color: '#888', // Màu chữ xám
    },
    content: {
        marginBottom: 10, // Khoảng cách dưới cùng của nội dung
    },
    commentContainer: {
        borderTopWidth: 1,
        borderTopColor: "gray",
        flexDirection: 'row', // Sắp xếp các phần tử theo hàng ngang
        alignItems: 'center', // Canh chỉnh các phần tử theo trục dọc
    },
    commentButton: {
        flexDirection: 'row', // Sắp xếp các phần tử theo hàng ngang
        alignItems: 'center', // Canh chỉnh các phần tử theo trục dọc
        backgroundColor:"#2596be",
        padding:10,
        borderRadius:10,
        color:"#FFF",
    },
    commentText: {
        marginLeft: 5, // Khoảng cách với icon comment
    },
});
