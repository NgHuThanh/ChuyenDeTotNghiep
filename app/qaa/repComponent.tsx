import { StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView, ViewStyle, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Modal, PaperProvider, Portal, TextInput } from 'react-native-paper';
import AvatarDetault from './avatarComponent';
import { qaa, rep } from '../../model/qaa';
import { getAllRepDocuments, getUserInfo, getUserInfo2, writeRepToFirestore } from '../firebase/config';
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
const RepComponent = (rep:rep) => {
    const [user,setUser]=useState();
    const [avatar, setAvatar] = useState<string>();
    const fetchReps = async () => {
        
        const name=await getUserInfo(rep.user);
        const avatar=await getUserInfo2(rep.user);
        setUser(name);
        setAvatar(avatar);
      };
      useEffect(() => {
        fetchReps();
      }, []);
    return (
        <>
            <View>
                <View style={styles.container2}>
                <View style={styles.userInfo}>
                <AvatarDetault src={avatar} />
                    
                    <View>
                                <Text style={styles.userName}>{user}</Text>
                                <Text style={styles.timeAgo}>{calculateTimeAgo(rep.timecreate)}</Text>
                                </View>
                    </View>
                    
                    
                    <Text>{rep.content}</Text>
                </View>
            </View>
        </>
    );
}

export default RepComponent

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        marginBottom: 10,
        padding:10,
        // Các kiểu khác...
        alignItems:"flex-start",
    },
    absoluteContainer: {
        
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
        width:"95%",
    },
    input: {
        width: "90%",
        marginVertical: 10,
        backgroundColor: "#FFF",
        marginRight: 10,
    },
    container2: {
        backgroundColor: '#eeeee4', // Màu nền trắng
        borderRadius: 5, // Bo tròn góc
        marginBottom: 10, // Khoảng cách dưới cùng
        shadowColor: '#000', // Màu của shadow
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27, // Độ mờ của shadow
        shadowRadius: 4.65, // Độ đục của shadow
        elevation: 6, // Thêm elevation để hiển thị shadow trên Android
        padding: 10,
    },
    title: {
        fontWeight: 'bold', // In đậm
        fontSize: 20, // Kích thước phông chữ lớn hơn
        marginBottom: 10, // Khoảng cách dưới cùng của tiêu đề
    },
    userInfo: {
        flexDirection: 'row', // Sắp xếp các phần tử theo hàng ngang
        alignItems: 'center', // Canh chỉnh các phần tử theo trục dọc
        marginBottom: 10, // Khoảng cách dưới cùng của user info
    },
    userName: {
        fontSize: 16, // Kích thước phông chữ nhỏ hơn
        marginRight: 10, // Khoảng cách với thời gian
        fontWeight:"bold",
        color:"#5b7bfe"
    },
    timeAgo: {
        color: '#888', // Màu chữ xám
    },
    content: {
        marginBottom: 10, // Khoảng cách dưới cùng của nội dung
    },
    commentContainer: {
        borderTopWidth: 1,
        borderTopColor: "gray",
        flexDirection: 'row', // Sắp xếp các phần tử theo hàng ngang
        alignItems: 'center', // Canh chỉnh các phần tử theo trục dọc
    },
    commentButton: {
        flexDirection: 'row', // Sắp xếp các phần tử theo hàng ngang
        alignItems: 'center', // Canh chỉnh các phần tử theo trục dọc
    },
    commentText: {
        marginLeft: 5, // Khoảng cách với icon comment
    },
})
