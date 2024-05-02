import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SetModel, deleteSet } from '@/model/word';
import { router } from 'expo-router';

const WordComponent = () => {
    const localImageUrl = require('../../assets/images/book.png');
    const [exist,setExist]=useState(true)
    if(exist==false){
        return <></>;
    }
    
    return (
        <TouchableOpacity style={styles.container} onPress={()=>router.push("/vocabSet/")}>
            <View style={styles.infoContainer2}>
            <TouchableOpacity>
            <AntDesign name="hearto" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.boldText}>Exampl</Text>
                <Text style={styles.secondaryText}>ExampleExam</Text>
                
            </View>
            <View style={styles.imageContainer}>
            <View style={styles.container2}>
                
                <TouchableOpacity  activeOpacity={0.7} style={{marginRight:10}}>
                <Feather name="edit" size={24} color="black" />
                </TouchableOpacity>
                
                <TouchableOpacity  activeOpacity={0.7}>
                <MaterialIcons name="delete" size={24} color="red" />
                </TouchableOpacity>
            </View>
            
            
            
            </View>
        </TouchableOpacity>
    )
}

export default WordComponent

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#FFF', // Màu nền xanh
        borderRadius: 10, // Bo tròn góc
         // Ẩn bất kỳ phần nào vượt ra ngoài giới hạn của container
        marginBottom: 10, // Khoảng cách dưới cùng
        
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
        flex: 3, // Chiếm 40% chiều rộng
        padding: 10, // Khoảng cách padding
    },
    infoContainer2: {
        width:30, // Chiếm 40% chiều rộng
        padding: 0, // Khoảng cách padding
        justifyContent:"center",
        bottom:10,
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
