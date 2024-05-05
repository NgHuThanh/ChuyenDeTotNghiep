import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SetModel, deleteSet, deleteVocab, updateVocabFavorite, vocab } from '@/model/word';
import { router } from 'expo-router';
import Tts from 'react-native-tts';
import { speak } from '../textToSpech';
import { format } from 'date-fns';
import Speak from '@/component/Speech';
// import Speak from '@/component/Speech';

const WordComponent = (props:{nameSet:string,vocab:vocab,fetchVocabs: () => void}) => {
    const localImageUrl = require('../../assets/images/book.png');
    const [exist,setExist]=useState(true)
    const [fav,setFav]=useState<boolean>(props.vocab.favorite);
    const formattedDate = format(props.vocab.lastPractice, 'dd/MM/yyyy');
    let difficultColor = '#000'; // Màu mặc định (đen) nếu giá trị difficult không khớp với bất kỳ điều kiện nào
    
    const handleDeletePress = () => {
         deleteVocab(props.nameSet, props.vocab.word);
            // Gọi hàm fetchVocabs để cập nhật danh sách vocab sau khi xóa
            props.fetchVocabs();
        
    };
    
    // Xác định màu sắc dựa trên giá trị của difficult
    switch (props.vocab.difficult) {
        case 'easy':
            difficultColor = 'green';
            break;
        case 'good':
            difficultColor = 'yellow';
            break;
        case 'hard':
            difficultColor = 'red';
            break;
        case 'skip':
            difficultColor = 'black';
            break;
        default:
            difficultColor = '#000'; // Màu mặc định
    }

    if(exist==false){
        return <></>;
    }
    const handleFavoritePress = () => {
        // Gọi hàm updateVocabFavorite và truyền setName, vocabWord và true làm đối số
        
        updateVocabFavorite(props.nameSet , props.vocab.word);
        props.vocab.favorite=!props.vocab.favorite;
        setFav(props.vocab.favorite);   
        // Gọi hàm fetchVocabs để cập nhật danh sách vocab sau khi cập nhật trạng thái favorite
        // props.fetchVocabs();
        
        
    };
    
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.infoContainer2}>
            <TouchableOpacity onPress={handleFavoritePress}>
                {fav ? (
                    <AntDesign name="hearto" size={24} color="red" />
                ) : (
                    <AntDesign name="hearto" size={24} color="black" />
                )}
            </TouchableOpacity>
            </View>
            <Speak thingToSay={props.vocab.word}></Speak>
            <View style={styles.infoContainer}>
                <Text style={styles.boldText}>{props.vocab.word}</Text>
                <Text style={styles.secondaryText}>{props.vocab.definition}</Text>
                <Text style={[styles.secondaryText2, { color: difficultColor }]}>{props.vocab.difficult}</Text>
                <Text style={{paddingRight:0}}>Practice at: {formattedDate}</Text>
            </View>
            <View style={styles.imageContainer}>
            <View style={styles.container2}>
                
                <TouchableOpacity  activeOpacity={0.7} style={{marginRight:10}}>
                <Feather name="edit" size={24} color="black" />
                </TouchableOpacity>
                
                <TouchableOpacity  activeOpacity={0.7} onPress={handleDeletePress}>
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
        
        color: '#888', // Màu #888
    },
    secondaryText2: {
        
         // Màu #888
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
