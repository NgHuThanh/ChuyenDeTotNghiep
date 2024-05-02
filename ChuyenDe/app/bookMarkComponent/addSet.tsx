import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { TextInput, useTheme } from 'react-native-paper'; // Sử dụng useTheme để truy cập theme của Paper
import { SetModel, addSet } from '../../model/word';
import { router } from 'expo-router';

const AddSetComponent = () => {
    const [text, setText] = React.useState("");
    const theme = useTheme(); // Lấy theme từ PaperProvider
    const handleAddSet = async () => {
        const newSet: SetModel = {
            vocabs: [],
            create: new Date(),
            name: text,
        };
        await addSet(newSet); // Gọi hàm addSet để thêm set mới
        setText(''); // Xóa nội dung của TextInput sau khi thêm set thành công
    };
    return (
        <View style={styles.container}>
            <View>
            <Text style={styles.title}>Add new set vocabulary</Text>
            </View>
            <TextInput
                label="Name"
                value={text}
                onChangeText={text => setText(text)}
                theme={{ colors: { background: '#5b7bfe' } }} // Thiết lập màu nền cho TextInput
                style={[styles.textInput, { color: 'black' }]} // Thêm kiểu cho TextInput và đặt màu chữ là đen
            />
            <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={handleAddSet}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddSetComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding:20,
    },
    title: {
        fontSize: 16,
        fontWeight:"bold",
        marginBottom: 20,
        textAlign: 'center', // Text nằm giữa
    },
    textInput: {
        width: '100%', // TextInput chiếm toàn bộ chiều rộng của parent
        backgroundColor: '#410fa3',
        color:'black', // Màu nền của TextInput
        borderWidth:1,
    },
    button: {
        backgroundColor: '#410fa3',
        borderRadius: 8,
        height: 50,
        width: '48%', // Chiếm 48% chiều rộng của parent
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
