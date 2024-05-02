import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
const SetComponent = () => {
    const localImageUrl = require('../../assets/images/book.png');
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.boldText}>Example</Text>
                <Text style={styles.secondaryText}>0/92 Cards memorized</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} activeOpacity={0.7}>
                    <Text style={styles.buttonText}>Review</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} activeOpacity={0.7}>
                    <Text style={styles.buttonText}>Practice</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.imageContainer}>
            <MaterialIcons name="settings" size={24} color="#5b7bfe" />
            <Feather name="share" size={24} color="#5b7bfe" />
            </View>
        </TouchableOpacity>
    )
}

export default SetComponent

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#FFF', // Màu nền xanh
        borderRadius: 10, // Bo tròn góc
        overflow: 'hidden', // Ẩn bất kỳ phần nào vượt ra ngoài giới hạn của container
        marginBottom: 10, // Khoảng cách dưới cùng
        height:130,
        paddingLeft:20,
        paddingTop:10,
        shadowColor: '#000', // Màu của shadow
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27, // Độ mờ của shadow
        shadowRadius: 4.65, // Độ đục của shadow
        elevation: 6, // Thêm elevation để hiển thị shadow trên Android
        borderLeftWidth: 5, // Độ rộng của border bên trái
        borderLeftColor: '#410fa3', // Màu của border bên trái
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
    },
    image: {
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
        flexDirection: 'row', // Sắp xếp các button theo hàng ngang
        justifyContent: 'space-between', // Căn đều các button trong hàng ngang
        marginVertical: 10, // Khoảng cách dọc giữa text input và button container
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
    button: {
        backgroundColor: '#5b7bfe',
        borderRadius: 8,
        height:'200%',
        width: '48%', // Chiếm 48% chiều rộng của parent (SafeAreaView)
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontWeight:"bold",
        fontSize: 12,
      },
      
})
