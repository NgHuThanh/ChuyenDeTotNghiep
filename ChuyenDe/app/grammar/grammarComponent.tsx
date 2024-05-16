import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { grammar } from '@/model/grammar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GrammarComponent = (props:{grammar:grammar}) => {
    const goToDestination = () => {
        router.push(`/grammarDetail/${props.grammar.id}`);
    };
    const [idGrammar, setIdGrammar] = useState<string>('');
    const [isIdInArray, setIsIdInArray] = useState(false);
    useEffect(() => {
        async function checkIdInArray() {
            try {
                const existingIds = await AsyncStorage.getItem('idGrammars');
                const idGrammars = existingIds ? JSON.parse(existingIds) : [];
                setIsIdInArray(idGrammars.includes(props.grammar.id));
            } catch (error) {
                console.error("Error checking id in array: ", error);
            }
        }
        checkIdInArray();
    }, []);
    return (
        <TouchableOpacity style={styles.container} onPress={goToDestination}>
            <View style={styles.infoContainer2}>
            {isIdInArray ? (
                    <AntDesign name="checkcircle" size={24} color="green" />
                ) : (
                    <AntDesign name="checkcircle" size={24} color="gray" />
                )}
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.boldText}>{props.grammar.title}</Text>
                
            </View>
        </TouchableOpacity>
    )
}

export default GrammarComponent

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#3d1460', // Màu nền xanh
        borderRadius: 10, // Bo tròn góc
         // Ẩn bất kỳ phần nào vượt ra ngoài giới hạn của container
        marginBottom: 10, // Khoảng cách dưới cùng
        
        padding:10,
        shadowColor: '#FF', // Màu của shadow
        shadowOffset: {
            width: 0,
            height: 3,
        },
        
        shadowOpacity: 0.27, // Độ mờ của shadow
        shadowRadius: 4.65, // Độ đục của shadow
        elevation: 6, // Thêm elevation để hiển thị shadow trên Android
        borderLeftWidth: 7, // Độ rộng của border bên trái
        borderLeftColor: '#df678b', // Màu của border bên trái
    },
    
    container2: {
        flexDirection: 'row',
        marginRight:0,
        overflow: 'hidden', // Ẩn bất kỳ phần nào vượt ra ngoài giới hạn của container
    },
    imageContainer: {
        flex: 1, // Chiếm 60% chiều rộng
        alignItems: 'center',
        justifyContent: 'space-between', // Căn đều các phần tử trong container theo chiều dọc và chia đều khoảng cách giữa chúng
        paddingVertical: 10, // Khoảng cách dọc
        paddingHorizontal: 5, // Khoảng cách ngang
    },
    infoContainer: {
        flex: 5, // Chiếm 40% chiều rộng
        padding: 10, // Khoảng cách padding
        color:"#FFF",
    },
    infoContainer2: {
        width:30, // Chiếm 40% chiều rộng
        padding: 0, // Khoảng cách padding
        justifyContent:"center",
        
    },
    
    boldText: {
        fontWeight: 'bold', // In đậm
        fontSize: 20, // Kích thước phông chữ
        color: '#FFF', // Màu chữ trắng
    },
    
    
})
