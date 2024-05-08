import { StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView, ViewStyle, Dimensions } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Modal, PaperProvider, Portal } from 'react-native-paper';

const QaaComponent = () => {
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const containerStyle: ViewStyle = {
        position: 'absolute',
        top: 30,
        left: 0,
        right: 0,
        
        backgroundColor: 'white',
        padding: 0,
        alignSelf: 'center',
        justifyContent: 'center',
        marginHorizontal:10,
    };

    return (
        <>
            <SafeAreaView >
            
                    <View style={styles.container}>
                        <Text style={styles.title}>Title</Text>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>User: Name user</Text>
                    </View>
                    <Text style={styles.content}>Hey guy, I just wonder how can I learn verbHey guy, I just wonder how can I learn verbHey guy, I just wonder how can I learn verbHey guy, I just wonder how can I learn verb</Text>
                    <View style={styles.commentContainer}>
                        <TouchableOpacity style={styles.commentButton} onPress={showModal}>
                            <Feather name="message-circle" size={24} color="black" />
                            <Text style={styles.commentText}>Comments </Text>
                            <Text style={styles.timeAgo}>25 minutes ago</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                    

                    <Portal>
                        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',padding:10 }}>
                            <View>
                                <Text style={styles.title}>Title</Text>
                                <View style={styles.userInfo}>
                                    <Text style={styles.userName}>User: Name user</Text>
                                </View>
                                <Text style={styles.content}>Hey guy, I just wonder how can I learn verbHey guy, I just wonder how can I learn verbHey guy, I just wonder how can I learn verbHey guy, I just wonder how can I learn verb</Text>
                                <View style={styles.commentContainer}>
                                    <TouchableOpacity style={styles.commentButton}>
                                        <Feather name="message-circle" size={24} color="black" />
                                        <Text style={styles.commentText}>Comments </Text>
                                        <Text style={styles.timeAgo}>25 minutes ago</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                <View style={styles.container2}>
                                    <Text style={styles.userName}>User</Text>
                                    <Text style={styles.timeAgo}>6 h ago</Text>
                                    <Text>Just like normal, do what you learn in school will be okay</Text>
                                </View>
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
        backgroundColor: '#FFF', // Màu nền trắng
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
        fontWeight:"bold"
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
