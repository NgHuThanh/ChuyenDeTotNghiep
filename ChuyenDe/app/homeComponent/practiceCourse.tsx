import { StyleSheet, Text, TouchableOpacity, View, Image, ProgressBarAndroidBase, ProgressBarAndroidComponent } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';
import { addDocument } from '../firebase/config';
const PracticeCourse = () => {
    const localImageUrl = require('../../assets/images/book.png');
    const handlePress=async()=>{
        addDocument();
    }
    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <View style={styles.infoContainer}>
                <Text style={styles.boldText}>Practice</Text>
                <Text style={styles.boldText}>Your Word</Text>
                <Text style={styles.secondaryText}>Do not forget</Text>
                <ProgressBar progress={0.8}/>
                {/* <Text style={styles.percentText}><AntDesign name="rocket1" size={24} color="green" /></Text> */}
            </View>
            <View style={styles.imageContainer}>
            <Text style={styles.boldText2}>14/25</Text>
            </View>
            
        </TouchableOpacity>
    )
}

export default PracticeCourse

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#5b7bfe', // Màu nền xanh
        borderRadius: 20, // Bo tròn góc
        overflow: 'hidden', // Ẩn bất kỳ phần nào vượt ra ngoài giới hạn của container
        marginBottom: 10, // Khoảng cách dưới cùng
        height:130,
    },
    imageContainer: {
        flex: 3, // Chiếm 60% chiều rộng
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5, // Khoảng cách padding
    },
    infoContainer: {
        flex: 2, // Chiếm 40% chiều rộng
        padding: 10, // Khoảng cách padding
    },
    image: {
        width: '100%',
        height: '100%',
    },
    boldText: {
        fontWeight: 'bold', // In đậm
        fontSize: 18, // Kích thước phông chữ
        color: '#FFF', // Màu chữ trắng
    },
    boldText2: {
        fontWeight: 'bold', // In đậm
        fontSize: 38, // Kích thước phông chữ
        color: '#FFF', // Màu chữ trắng
    },
    secondaryText: {
        marginBottom:20,
        color: '#FFF', // Màu #888
    },
    percentText: {
        marginBottom:20,
        color: 'green', // Màu #888
    },
})
