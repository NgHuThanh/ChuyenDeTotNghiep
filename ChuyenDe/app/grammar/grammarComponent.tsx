import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { grammar } from '@/model/grammar';

const GrammarComponent = (props:{grammar:grammar}) => {
    const goToDestination = () => {
        router.push(`/grammarDetail/${props.grammar.id}`);
    };
    return (
        <TouchableOpacity style={styles.container} onPress={goToDestination}>
            <View style={styles.infoContainer2}>
            <TouchableOpacity>
            <AntDesign name="checkcircle" size={24} color="green" />
            <AntDesign name="checkcircle" size={24} color="gray" />
            </TouchableOpacity>
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
        backgroundColor: '#410fa3', // Màu nền xanh
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
        borderLeftWidth: 5, // Độ rộng của border bên trái
        borderLeftColor: '#FFF', // Màu của border bên trái
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
        fontSize: 16, // Kích thước phông chữ
        color: '#FFF', // Màu chữ trắng
    },
    
    
})
