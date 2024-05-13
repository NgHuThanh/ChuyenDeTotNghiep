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
    const [userId, setUserId] = useState<string | null>(null); // Thêm state cho userId

    // Lấy userId từ AsyncStorage khi component được render
    useEffect(() => {
        const getUserId = async () => {
            const id = await AsyncStorage.getItem("userId");
            setUserId(id);
        };
        getUserId();
    }, []);

    // Fetch questionandanswer khi component được render
    useEffect(() => {
        fetchQaas();
    }, []);

    // Hàm fetch questionandanswer
    const fetchQaas = async () => {
        const allQaas = await getAllQaaDocuments();
        setQuestionAndAnswer(allQaas);
    };

    // Xử lý khi bấm vào "Your post"
    const handleYourPost = () => {
        if (!userId) return; // Nếu userId không tồn tại, không làm gì cả

        // Lọc các phần tử có user giống với userId và cập nhật state questionandanswer
        const filteredQaas = questionandanswer.filter(qa => qa.user == userId);
        setQuestionAndAnswer(filteredQaas);
    };

    // Xử lý khi bấm vào "Word"
    const handleWord = () => {
        fetchQaas(); // Gọi lại hàm fetchQaas để hiển thị tất cả các phần tử
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
        // Ghi dữ liệu lên Firestore
        writeToFirestore(form.title, form.content);

        // Reset lại giá trị của form
        setForm({
            title: "",
            content: "",
            error: '', // Thêm trạng thái lỗi
        });
        fetchQaas();
        // Ẩn modal
        hideModal();
    };

    return (
        <PaperProvider>
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={{ alignSelf: "flex-start" }} onPress={handlePressBack}><AntDesign name="arrowleft" size={30} color="black" /></TouchableOpacity>
                <View style={styles.header}>
                    <AvatarDetault />
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

                <ScrollView style={{ padding: 10 }}>
                    {questionandanswer.map((qa, index) => (
                        <QaaComponent key={index} qaa={qa} />
                    ))}
                </ScrollView>
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
                                style={styles.input} // Sửa đổi color thành màu đen
                            />
                            <TextInput
                                mode="outlined"
                                label="Content"
                                textColor="black"
                                placeholder="Enter what are you thinking?"
                                value={form.content}
                                onChangeText={(text) => setForm({ ...form, content: text })}
                                style={[styles.input2, { color: 'black' }]} // Sửa đổi color thành màu đen
                            />
                            <TouchableOpacity onPress={handlePost} style={styles.commentButton}>Post now</TouchableOpacity>
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
