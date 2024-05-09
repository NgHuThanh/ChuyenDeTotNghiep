import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SetModel, deleteSet, setAsyncData } from '@/model/word';
import { router } from 'expo-router';
import { Modal, Portal } from 'react-native-paper';
const SetComponent = (props:{setVocab:SetModel, fetchSets: () => void}) => {
    const localImageUrl = require('../../assets/images/book.png');
    const [exist,setExist]=useState(true);
    const [practicePressed, setPracticePressed] = useState(false);
    const [visible, setVisible] = React.useState(false);
    const [visible2, setVisible2] = React.useState(false);
    const [visible3, setVisible3] = React.useState(false);
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
    const handleMultipleChoice=()=>{
        router.push(`/muitiplechoice/${props.setVocab.name}`)
    }
    const handleMatchChoice=()=>{
        router.push(`/match/${props.setVocab.name}`)
    }
    const handleImagePractice=()=>{
        router.push(`/imagePractice/${props.setVocab.name}`)
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
      const hideModal2 = () => {
        
        setVisible2(false)
        
      };
      const hideModal3 = () => {
        
        setVisible3(false)
        
      };
    const containerStyle: ViewStyle = {
    backgroundColor: 'white',
    padding: 10,
    
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
                <Modal visible={visible3} onDismiss={hideModal3} contentContainerStyle={containerStyle}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.boldText}>Are you sure want to delete?</Text>
                        
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
                    <Text style={styles.buttonText} onPress={handleMultipleChoice}>Multiples choice</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2} activeOpacity={0.7}>
                    <Text style={styles.buttonText} onPress={handleMatchChoice}>Match game</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2} activeOpacity={0.7}>
                    <Text style={styles.buttonText} onPress={handleImagePractice}>Image game</Text>
                    </TouchableOpacity>
                </View>
                
            </Modal>
            </Portal>
            <View style={styles.infoContainer}>
                <Text style={styles.boldText}>{props.setVocab.name}</Text>
                <Text style={styles.secondaryText}>{props.setVocab.vocabs?.length} Cards</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} activeOpacity={0.7}>
                    <Text style={styles.buttonText} onPress={handleReview}>Review</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handlePractice}
                    >
                        <Text style={styles.buttonText}>Practice</Text>
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
        height:'200%',
        width: '48%', // Chiếm 48% chiều rộng của parent (SafeAreaView)
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize: 12,
      },
      
})
