import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { TextInput, useTheme } from 'react-native-paper'; // Sử dụng useTheme để truy cập theme của Paper
import { SetModel, addVocabToSet } from '../../model/word';
import { FontAwesome6 } from '@expo/vector-icons';

const AddVocabComponent = () => {
    const [textWord, setTextWord] = React.useState("");
    const [textDefinition, setTextDefinition] = React.useState("");
    const theme = useTheme(); // Lấy theme từ PaperProvider

    const handleAddVocab = async () => {
        // Tạo một vocab mới từ textWord, textDefinition và các giá trị mặc định khác
        const newVocab = {
            word: textWord,
            definition: textDefinition,
            lastPractice: new Date(),
            difficult: 'easy', // Giá trị mặc định
            favorite: false, // Giá trị mặc định
        };

        // Gọi hàm addVocabToSet để thêm từ vựng mới vào set
        await addVocabToSet("Local", newVocab);
        
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
                value={textWord}
                onChangeText={text => setTextWord(text)}
                theme={{ colors: { background: '#5b7bfe' } }}
                style={[styles.textInput, { color: 'black' }]}
            />
            <TextInput
                label="Input definition"
                value={textDefinition}
                onChangeText={text => setTextDefinition(text)}
                theme={{ colors: { background: '#5b7bfe' } }}
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
        backgroundColor: '#410fa3',
        color:'black',
        borderWidth:1,
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
