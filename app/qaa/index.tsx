import { AntDesign, Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ViewStyle } from 'react-native';
import { Modal, PaperProvider, Portal, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import QaaComponent from './qaaComponent';
import { router } from 'expo-router';
import React from 'react';
import AvatarDetault from './avatarComponent';
import { getAllQaaDocuments, writeToFirestore } from '../firebase/config';
import { qaa } from '../../model/qaa'; // Đường dẫn này có thể đã trùng với đường dẫn của một tên khác trong index.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const url = "https://api.mymemory.translated.net/get?q=Hello World!&langpair=en|it";
const fetcher = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return response.json();
};

export default function qaaa() {
    const [questionandanswer, setQuestionAndAnswer] = useState<qaa[]>([]);
    const [form, setForm] = useState({
        title: "",
        content: "",
        error: '',
    });
    const [userId, setUserId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Biến trạng thái loading
    const [avatar, setAvatar] = useState<string>();
    useEffect(() => {
        const getUserId = async () => {
            const id = await AsyncStorage.getItem("userId");
            const storedAvatar = await AsyncStorage.getItem('avatar');
            setAvatar(storedAvatar as string);
            setUserId(id);
        };
        getUserId();
    }, []);

    useEffect(() => {
        fetchQaas();
    }, []);
    useEffect(() => {
        const getUsername = async () => {
          try {
            const storedUsername = await AsyncStorage.getItem('username');
            const storedEmail = await AsyncStorage.getItem('email');
            if (storedUsername !== null) {
              
            } else {
              router.push("/(auth)/sign-in"); // Chuyển hướng đến trang đăng nhập nếu không tồn tại username
            }
          } catch (error) {
            console.error('Error retrieving username from AsyncStorage:', error);
          }
        };
    
        getUsername();
      }, []);
    const fetchQaas = async () => {
        setIsLoading(true); // Bắt đầu loading
        const allQaas = await getAllQaaDocuments();
        const sortedQaas = allQaas.sort((a, b) => new Date(b.timecreate).getTime() - new Date(a.timecreate).getTime());
        setQuestionAndAnswer(sortedQaas);
        setIsLoading(false); // Kết thúc loading sau khi fetch dữ liệu
    };

    // Xử lý khi bấm vào "Your post"
    const handleYourPost = () => {
        if (!userId) return;
        const filteredQaas = questionandanswer.filter(qa => qa.user == userId);
        setQuestionAndAnswer(filteredQaas);
    };

    const handleWord = () => {
        fetchQaas();
    };

    const handlePressBack = () => {
        router.push("/(tabs)/home");
    };

    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle: ViewStyle = {
        position: 'absolute',
        top: 30,
        left: 0,
        right: 0,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 0,
        alignSelf: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    };
    const handlePost = () => {
        writeToFirestore(form.title, form.content);
        setForm({
            title: "",
            content: "",
            error: '',
        });
        fetchQaas();
        hideModal();
    };

    return (
        <PaperProvider>
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={{ alignSelf: "flex-start" }} onPress={handlePressBack}><AntDesign name="arrowleft" size={30} color="black" /></TouchableOpacity>
                <View style={styles.header}>
                    <AvatarDetault src={avatar} />
                    <TouchableOpacity onPress={showModal} style={styles.boxQaa}>
                        <Text style={styles.text}>What are you thinking now?</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleWord}>
                        <Ionicons name="earth" size={24} color="black" />
                        <Text>Word</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleYourPost}>
                        <Entypo name="paper-plane" size={24} color="black" />
                        <Text>Your post</Text>
                    </TouchableOpacity>
                </View>

                {isLoading ? ( // Kiểm tra nếu đang loading, hiển thị văn bản loading
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Loading...</Text>
                    </View>
                ) : (
                    <ScrollView style={{ padding: 10 }}>
                        {questionandanswer.map((qa, index) => (
                            <QaaComponent key={index} qaa={qa} />
                        ))}
                    </ScrollView>
                )}

                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 10 }}>
                            <TextInput
                                mode="outlined"
                                label="Title"
                                textColor="black"
                                placeholder="Enter your post title"
                                value={form.title}
                                onChangeText={(text) => setForm({ ...form, title: text })}
                                style={styles.input}
                            />
                            <TextInput
                                mode="outlined"
                                label="Content"
                                textColor='black'
                                multiline={true}
                                numberOfLines={4}
                                placeholder="Enter what are you thinking?"
                                value={form.content}
                                onChangeText={(text) => setForm({ ...form, content: text })}
                                style={[styles.input2, { color: 'black' }]}
                            />
                            <TouchableOpacity onPress={handlePost} style={styles.commentButton}><Text style={{fontWeight:"bold",fontSize:18,color:"#FFF"}}>Post</Text></TouchableOpacity>
                        </View>
                    </Modal>
                </Portal>
            </SafeAreaView>
        </PaperProvider>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    input: {
        width: "100%",
        margin: 10,
        backgroundColor: "#FFF",
        color: "primary"

    },
    commentButton: {
        flexDirection: 'row', // Sắp xếp các phần tử theo hàng ngang
        alignItems: 'center', // Canh chỉnh các phần tử theo trục dọc
        backgroundColor:"#2596be",
        padding:10,
        borderRadius:10,
        color:"#FFF",
    },
    input2: {
        width: "100%",
        margin: 10,
        backgroundColor: "#FFF",
        minHeight: 300,

    },
    buttonsContainer: {
        flexDirection: 'row', // Hiển thị các phần tử ngang hàng
        justifyContent: 'space-between', // Canh các phần tử theo chiều ngang
        marginBottom: 10, // Khoảng cách dưới cùng
        overflow: 'hidden', // Ẩn bớt nội dung tràn ra ngoài container
    },
    button: {
        backgroundColor: '#FFF', // Màu nền trắng
        width: "50%",
        padding: 10,
        borderWidth: 1, // Độ dày của viền
        borderColor: 'gray', // Màu viền xám
        alignItems: "center",
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    boxQaa: {
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000', // Màu của shadow
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27, // Độ mờ của shadow
        shadowRadius: 4.65,
        width: "80%",
        marginLeft: 10,
    },
    text: {
        color: "gray",
    },
});
