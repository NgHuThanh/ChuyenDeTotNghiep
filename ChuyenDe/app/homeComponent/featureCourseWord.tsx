import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
const FeatureCourseWord = () => {
    const localImageUrl = require('../../assets/images/vocab.png');
    const handlePress=()=>{
        router.push("/qaa/");
    }
    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <View style={styles.infoContainer}>
                <Text style={styles.boldText}>Online</Text>
                <Text style={styles.boldText}>Vocablary</Text>
                <Text style={styles.secondaryText}>Online set vocablary</Text>
                
            </View>
            <View style={styles.imageContainer}>
                <Image
                    source={localImageUrl}
                    style={styles.image}
                    resizeMode="contain" // Đảm bảo hiển thị đủ ảnh
                />
            </View>
        </TouchableOpacity>
    )
}

export default FeatureCourseWord

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff6eb', // Màu nền xanh
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
        color: '#1e2636', // Màu chữ trắng
    },
    secondaryText: {
        marginBottom:20,
        color: '#888', // Màu #888
    },
    percentText: {
        marginBottom:20,
        color: 'green', // Màu #888
    },
})
