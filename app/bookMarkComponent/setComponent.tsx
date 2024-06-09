import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SetModel, deleteSet, setAsyncData } from '@/model/word';
import { router } from 'expo-router';
import { Modal, Portal } from 'react-native-paper';
import { Foundation } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SetComponent = (props:{setVocab:SetModel, fetchSets: () => void}) => {
    const localImageUrl = require('../../assets/images/book.png');
    const [exist,setExist]=useState(true);
    const [practicePressed, setPracticePressed] = useState(false);
    const [needWord,setNeedWord]=useState(0);
    const [visible, setVisible] = React.useState(false);
    const [visible2, setVisible2] = React.useState(false);
    const [visible3, setVisible3] = React.useState(false);
    const [visible4, setVisible4] = React.useState(false);
    const [id, setID] = useState<string | null | undefined>(undefined);
    const showModal = () => setVisible(true);
    const handlePractice = () => {
        setVisible2(true);
    };
    const DeleteConfirm = () => {
        setVisible3(true);
    };
    if(exist==false){
        return <></>;
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = await setAsyncData(props.setVocab.name);
                setID(id);
            } catch (error) {
                console.error('Error setting async data:', error);
            }
        };

        fetchData();
    }, [props.setVocab.name]);
    const handleDeleteSet = async () => {
        try {
            await deleteSet(props.setVocab.name); // Xóa dữ liệu từ async storage
            await props.fetchSets(); // Cập nhật lại trang kia bằng cách gọi hàm fetchSets từ props
        } catch (error) {
            console.error('Error deleting set:', error);
        }
    };
    const handleReview=()=>{
        router.push(`/review/${props.setVocab.name}`)
    }
    const handleMultipleChoice = async () => {
        const multiOption = await AsyncStorage.getItem('multioption');
        const minimumWords = parseInt(multiOption as string);
        if (props.setVocab.vocabs?.length as number < minimumWords) {
            setNeedWord(minimumWords);
            setVisible4(true);
            hideModal2();
        } else {
            router.push(`/muitiplechoice/${props.setVocab.name}`);
        }
    }
    const handleMatchChoice=()=>{
        if(props.setVocab.vocabs?.length as number < 5){
            setNeedWord(5);
            setVisible4(true);
            hideModal2();
        }
        else{
            router.push(`/match/${props.setVocab.name}`)
        }
        
    }
    const handleImagePractice=async ()=>{
        const multiOption = await AsyncStorage.getItem('imageoption');
        const minimumWords = parseInt(multiOption as string);
        if(props.setVocab.vocabs?.length as number < minimumWords){
            setNeedWord(minimumWords);
            setVisible4(true);
            hideModal2();
        }
        else{
            router.push(`/imagePractice/${props.setVocab.name}`)
        }
        
    }
    const goToDestination = () => {
        
        router.push(`/vocabSet/${props.setVocab.name}`);
    };
    const handleShare = async () => {
        setID(await setAsyncData(props.setVocab.name));
        showModal();
    };
    const hideModal = () => {
        
        setVisible(false)
        
      };
      const hideModal4 = () => {
        
        setVisible4(false)
        
      };
      const hideModal2 = () => {
        
        setVisible2(false)
        
      };
      const hideModal3 = () => {
        
        setVisible3(false)
        
      };
    const containerStyle: ViewStyle = {
    backgroundColor: 'white',
    padding: 10,
    minHeight:200,
    maxHeight:600,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius:20,
    alignItems:"center",
    
    };
    return (
        
        <TouchableOpacity style={styles.container} onPress={goToDestination}>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text style={styles.boldText}>ID to share:</Text>
                <Text style={styles.percentText}>{id}</Text>
            </Modal></Portal>
            <Portal>
                <Modal visible={visible4} onDismiss={hideModal4} contentContainerStyle={containerStyle}>
                <Text style={{fontWeight:"bold",color:"red"}}>Need at least {needWord} words!</Text>
            </Modal></Portal>
            <Portal>
                <Modal visible={visible3} onDismiss={hideModal3} contentContainerStyle={containerStyle}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.boldText}>Are you sure want to delete set {props.setVocab.name}?</Text>
                        
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} activeOpacity={0.7}>
                            <Text style={styles.buttonText} onPress={handleDeleteSet}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText} onPress={hideModal3}>Cancle</Text>
                            </TouchableOpacity>
                        </View>
                    
                    
                    </View>
            </Modal></Portal>
            <Portal>
                <Modal visible={visible2} onDismiss={hideModal2} contentContainerStyle={containerStyle}>
                
                    <View style={styles.buttonContainer2}>
                    <TouchableOpacity style={styles.button2} activeOpacity={0.2}>
                    <View style={{flexDirection:"row"}}>
                    <MaterialCommunityIcons name="checkbox-marked-circle-plus-outline" size={24} color="#FFF" />
                    <Text style={styles.buttonText} onPress={handleMultipleChoice}>Multiples choice</Text>
                    </View>
                    
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2} activeOpacity={0.7}>
                    <View style={{flexDirection:"row"}}>
                    <MaterialCommunityIcons name="format-columns" size={24} color="#FFF" />
                    <Text style={styles.buttonText} onPress={handleMatchChoice}>Match game</Text>
                    </View>
                    
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2} activeOpacity={0.7}>
                    <View style={{flexDirection:"row"}}><MaterialCommunityIcons name="image-search" size={24} color="#FFF" />
                    <Text style={styles.buttonText} onPress={handleImagePractice}>Image game</Text></View>
                    
                    </TouchableOpacity>
                </View>
                
            </Modal>
            </Portal>
            <View style={styles.infoContainer}>
                <Text style={styles.boldText}>{props.setVocab.name}</Text>
                <Text style={styles.secondaryText}>{props.setVocab.vocabs?.length} Cards</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} activeOpacity={0.7}>
                        <View style={{flexDirection:"row"}}>
                        <Foundation name="page-multiple" size={24} color="#FFF" style={{marginRight:5}} />
                        <Text style={styles.buttonText} onPress={handleReview}>Review</Text>
                        </View>
                    
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handlePractice}
                    >
                        <View style={{flexDirection:"row"}}>
                        <Entypo name="rocket" size={24} color="#FFF" style={{marginRight:5}} />
                        <Text style={styles.buttonText}>Practice</Text>
                        </View>
                        
                    </TouchableOpacity>
                </View>
                
                
            </View>
            <View style={styles.imageContainer}>
            
            <TouchableOpacity  activeOpacity={0.7}>
            <MaterialIcons name="delete" size={24} color="#5b7bfe" onPress={DeleteConfirm} />
            </TouchableOpacity>
            <TouchableOpacity  activeOpacity={0.7} onPress={handleShare}>
            <Feather name="share" size={24} color="#5b7bfe" />
            </TouchableOpacity>
            
            
            </View>
        </TouchableOpacity>
    )
}

export default SetComponent

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 10,
        padding: 5,
        paddingLeft: 20,
        paddingTop: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        borderLeftWidth: 5,
        borderLeftColor: '#410fa3',
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    infoContainer: {
        flex: 5,
        padding: 10,
        justifyContent:"center",
    },
    image: {
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
        flexDirection: 'row', // Sắp xếp các button theo hàng ngang
        justifyContent: 'space-between', // Căn đều các button trong hàng ngang
        //  // Khoảng cách dọc giữa text input và button container
        
      },
      buttonContainer2: {
         // Sắp xếp các button theo hàng ngang
        justifyContent: 'space-between', // Căn đều các button trong hàng ngang
        marginVertical: 10, // Khoảng cách dọc giữa text input và button container
        padding:10,
        borderRadius:20,
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
        fontSize:20,
    },
    button: {
        backgroundColor: '#5b7bfe',
        borderRadius: 8,
        
        width: '48%', // Chiếm 48% chiều rộng của parent (SafeAreaView)
        justifyContent: 'center',
        alignItems: 'center',
        padding:5,
      },
      button2: {
        backgroundColor: '#5b7bfe',
        borderRadius: 8,
        margin:10,
        padding:10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontWeight:"bold",
        fontSize: 16,
      },
      
})
