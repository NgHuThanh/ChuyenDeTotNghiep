import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

const UiComponent = () => {
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.title}>Title</Text>
                {/* Lập */}
                <View style={styles.item}>
                    <View style={styles.subItem}>
                        <Text style={styles.text}><Octicons name="light-bulb" size={20} color="black" style={{marginRight:5}} />A noun is a word that indentifes a person, a place, a thing, or an idea.</Text>
                    </View>
                    <View style={[styles.example]}>
                        <Text style={[styles.text, styles.exampleText]}>A person: a place, a thing or an idea</Text>
                        <Text style={[styles.text, styles.exampleText]}>A person: a place, a thing or an idea</Text>
                        <Text style={[styles.text, styles.exampleText]}>A person: a place, a thing or an idea</Text>

                    </View>
                </View>
            </View>
            
            
            <View>
                            {/* Lập */}
                <View style={styles.item}>
                <View style={styles.subItem}>
                    <Text style={styles.title}>What is a noun</Text>
                </View>
                {/* Lập */}
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>A person, a place, a thing or an idea</Text>
                </TouchableOpacity>
                </View>
                </View>
        </View>
        
        
    );
};

export default UiComponent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#c88cec',
        flex: 1,
        
        borderRadius:10,
    },
    section: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    item: {
        
        borderRadius: 10,
        marginBottom: 10,
        
    },
    subItem: {
        marginBottom: 10,
        padding:10,
    },
    text: {
        fontSize: 16,
    },
    example: {
        backgroundColor: 'white',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        alignSelf: 'flex-start', // Chỉ tự mở rộng đúng độ dài cần thiết
        paddingHorizontal: 10, // Tạo khoảng cách ngang cho văn bản
        padding:10,
    },
    
    
    exampleText: {
        
    },
    button: {
        backgroundColor: 'green',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});
