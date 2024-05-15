import { StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView, ViewStyle, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Modal, PaperProvider, Portal, TextInput } from 'react-native-paper';
import AvatarDetault from './avatarComponent';
import { qaa, rep } from '../../model/qaa';
import { getAllRepDocuments, getUserInfo, writeRepToFirestore } from '../firebase/config';
import RepComponent from './repComponent';
import { Entypo } from '@expo/vector-icons';
export const calculateTimeAgo = (time: Date) => {
    const now = new Date();
    const diff = now.getTime() - time.getTime(); // Sử dụng getTime để lấy giá trị thời gian ở đơn vị milliseconds
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return 'just now';
    }
};
const QaaComponent = (props:{qaa:qaa}) => {
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [reps,setReps]=useState<rep[]>([]);
    const [userName,setUserName]=useState();
    const [form, setForm] = useState({
        
        content: "",
        error: '', // Thêm trạng thái lỗi
        
      });
      const [showAllContent, setShowAllContent] = useState(false); // Trạng thái để hiển thị tất cả nội dung hoặc không
      const fetchReps = async () => {
        const allReps = await getAllRepDocuments(props.qaa.id);
        const name=await getUserInfo(props.qaa.user);
        const sortedQaas = allReps.sort((a, b) => new Date(b.timecreate).getTime() - new Date(a.timecreate).getTime());
        setUserName(name);
        setReps(sortedQaas);
      };
      useEffect(() => {
        fetchReps();
      }, []);
    const containerStyle: ViewStyle = {
        position: 'absolute',
        top: 30,
        width:"95%",
        borderRadius:10,
        backgroundColor: 'white',
        padding: 0,
        shadowColor: '#000', // Màu của shadow
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27, // Độ mờ của shadow
        shadowRadius: 4.65,
        elevation: 6, // Thêm elevation để hiển thị shadow trên Android
        marginHorizontal:10,
    };
    const handlePressRep=()=>{
        setForm({
            ...form,
            content: '', // Xóa nội dung
        });
        writeRepToFirestore(props.qaa.id,form.content);
        fetchReps();
    }
    
    const handleShowMore = () => {
        setShowAllContent(true);
    };

    const handleShowLess = () => {
        setShowAllContent(false);
    };

    return (
        <>
            <SafeAreaView >
                    <View style={styles.container}>
                        <Text style={styles.title}>{props.qaa.title}</Text>
                        <View style={styles.userInfo}>
                            <AvatarDetault/>
                            <View>
                                <Text style={styles.userName}>{userName}</Text>
                                <Text style={styles.timeAgo}>{calculateTimeAgo(props.qaa.timecreate)}</Text>
                            </View>
                        </View>
                        {showAllContent ? (
                            <Text style={styles.content}>{props.qaa.content}</Text>
                        ) : (
                            <Text numberOfLines={3} ellipsizeMode="tail" style={styles.content}>{props.qaa.content}</Text>
                        )}
                        {props.qaa.content.length > 100 && (
                            <TouchableOpacity onPress={showAllContent ? handleShowLess : handleShowMore}>
                                <Text style={styles.showMore}>{showAllContent ? 'Show less' : 'Show more'}</Text>
                            </TouchableOpacity>
                        )}
                        <View style={styles.commentContainer}>
                            <TouchableOpacity style={styles.commentButton} onPress={showModal}>
                                <Feather name="message-circle" size={24} color="black" />
                                <Text style={styles.commentText}>{reps.length} Comments </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    

                    <Portal>
                        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <View style={{ flex: 1,padding:10,minHeight:500,maxHeight:550 }}>
                            <View>
                                <Text style={styles.title}>{props.qaa.title}</Text>
                                <View style={styles.userInfo}>
                                <AvatarDetault/>
                                <View>
                                <Text style={styles.userName}>{userName}</Text>
                                <Text style={styles.timeAgo}>{calculateTimeAgo(props.qaa.timecreate)}</Text>
                                </View>
                                    
                                </View>
                                {showAllContent ? (
                                    <Text style={styles.content}>{props.qaa.content}</Text>
                                ) : (
                                    <Text numberOfLines={3} ellipsizeMode="tail" style={styles.content}>{props.qaa.content}</Text>
                                )}
                                {props.qaa.content.length > 100 && (
                                    <TouchableOpacity onPress={showAllContent ? handleShowLess : handleShowMore}>
                                        <Text style={styles.showMore}>{showAllContent ? 'Show less' : 'Show more'}</Text>
                                    </TouchableOpacity>
                                )}
                                <View style={styles.commentContainer}>
                                    <TouchableOpacity style={styles.commentButton}>
                                        <Feather name="message-circle" size={24} color="black" />
                                        <Text style={styles.commentText}>Comments </Text>
                                        
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <ScrollView>
                                {reps.map((rep)=>(
                                   <RepComponent key={rep.id} id={rep.id} content={rep.content} timecreate={rep.timecreate} user={rep.user} ></RepComponent>
                                ))}
                            </ScrollView>
                        </View>
        
                        <View style={styles.absoluteContainer}>
                            <View style={styles.container}>
                                {/* Các phần tử gốc */}
                            </View>
                            <View style={styles.absoluteContent}>
                                <TextInput
                                    mode="outlined"
                                    label="Add your comment"
                                    placeholder="Enter your comment"
                                    textColor='black'
                                    value={form.content}
                                    onChangeText={(text) => setForm({ ...form, content: text })}
                                    style={styles.input}
                                />
                                <TouchableOpacity onPress={handlePressRep}>
                                <Entypo name="paper-plane" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        </Modal>
                    </Portal>
                
            </SafeAreaView>
        </>
    );
}

export default QaaComponent

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        marginBottom: 10,
        padding:10,
        width:"100%",
        shadowColor: '#5b7bfe', // Màu của shadow
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27, // Độ mờ của shadow
        shadowRadius: 4.65,
        elevation: 6, // Thêm elevation để hiển thị shadow trên Android
    },
    absoluteContainer: {
        width:"100%",
        marginBottom: 10,
    },
    absoluteContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFF',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width:"100%",
    },
    input: {
        width: "90%",
        marginVertical: 10,
        backgroundColor: "#FFF",
        marginRight: 10,
    },
    container2: {
        backgroundColor: '#eeeee4',
        borderRadius: 5,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        padding: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    userName: {
        fontSize: 16,
        marginRight: 10,
        fontWeight:"bold",
        color:"#5b7bfe"
    },
    timeAgo: {
        color: '#888',
    },
    content: {
        marginBottom: 10,
    },
    showMore: {
        color: 'blue',
        fontWeight:"bold",
        fontSize:14,
    },
    commentContainer: {
        borderTopWidth: 1,
        borderTopColor: "gray",
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentText: {
        marginLeft: 5,
    },
})
