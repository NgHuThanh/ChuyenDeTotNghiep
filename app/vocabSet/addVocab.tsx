import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { TextInput, useTheme } from 'react-native-paper'; // Sử dụng useTheme để truy cập theme của Paper
import { SetModel, addVocabToSet, vocab } from '../../model/word';
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { updateUserSource } from '../firebase/config';

const AddVocabComponent = (props:{nameSet:string}) => {
    const [textWord, setTextWord] = React.useState("");
    const [textDefinition, setTextDefinition] = React.useState("");
    const theme = useTheme(); // Lấy theme từ PaperProvider

    const handleAddVocab = async () => {
        // Tạo một vocab mới từ textWord, textDefinition và các giá trị mặc định khác
        const newVocab = {
            word: textWord,
            definition: textDefinition,
            lastPractice: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Thêm 3 ngày (3 * 24 giờ * 60 phút * 60 giây * 1000 milliseconds) vào thời gian hiện tại
            difficult: 'easy', // Giá trị mặc định
            favorite: false, // Giá trị mặc định
            source:props.nameSet
        };

        // Gọi hàm addVocabToSet để thêm từ vựng mới vào set
        await addVocabToSet(props.nameSet, newVocab as vocab);
        updateUserSource();
        router.push(`/vocabSet/${props.nameSet}`);
        // Sau khi thêm thành công, reset các trường input về giá trị mặc định
        setTextWord("");
        setTextDefinition("");
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Add new vocabulary</Text>
            </View>
            <TextInput
                label="Input word"
                mode="outlined"
                textColor="black"
                value={textWord}
                onChangeText={text => setTextWord(text)}
                theme={{ colors: { background: '#FFF' } }}
                style={[styles.textInput, { color: 'black' }]}
            />

            

            <TextInput
                label="Input definition"
                mode="outlined"
                textColor="black"
                value={textDefinition}
                onChangeText={text => setTextDefinition(text)}
                theme={{ colors: { background: '#FFF' } }}
                style={[styles.textInput, { color: 'black' }]}
            />
            <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={handleAddVocab}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddVocabComponent;

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
        textAlign: 'center',
    },
    textInput: {
        width: '100%',
        backgroundColor: '#FFF',
        color:'black',
        
        marginBottom:10,
    },
    button: {
        backgroundColor: '#410fa3',
        borderRadius: 8,
        height: 50,
        width: '48%',
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
