import { View } from "@/components/Themed";
import { router } from "expo-router";
import { useState } from "react";
import {SafeAreaView, Text,Image,StyleSheet, Touchable, TouchableOpacity} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { login } from "../firebase/config";
import { importData } from "@/model/asyncStorage";

const SignIn = () => {
    const localImageUrl = require('../../assets/images/illustrations.png');
    const [form, setForm] = useState({
        email:'',
        password:'',
        loading: false, // Thêm trạng thái loading
        error: '', // Thêm trạng thái lỗi
    });

    const handleLogin = async () => {
        if (form.password !== form.confirmPassword) {
            setForm({ ...form, loading: false, error: 'Password does not match' });
            return; // Kết thúc hàm handleLogin nếu mật khẩu không trùng khớp
        }
    
        setForm({ ...form, loading: true }); // Đặt trạng thái loading là true khi bắt đầu thực hiện đăng nhập
    
        // Gọi hàm login
        const result = await login(form.email, form.password);
    
        if (result) {
            // Nếu đăng nhập thành công, chuyển hướng đến trang home
            router.push("/home");
        } else {
            // Nếu đăng nhập không thành công, hiển thị thông báo lỗi
            setForm({ ...form, loading: false, error: 'Email or password incorrect' });
        }
    };

    return (
        <SafeAreaView style={{backgroundColor:"#FFF",height:"100%"}}>
            <ScrollView>
                <View  style={{backgroundColor:"#FFF",height:"100%",padding:10,alignItems:"center"}}>
                    
                    <Text style={styles.text}>Log in Engnote</Text>
                    <TextInput
                        mode="outlined"
                        label="Email"
                        placeholder="Enter your Email"
                        value={form.email}
                        onChangeText={(text) => setForm({ ...form, email: text })}
                        style={styles.input}
                    />
                    <TextInput
                        mode="outlined"
                        label="Password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChangeText={(text) => setForm({ ...form, password: text })}
                        style={styles.input}
                    />
                    {form.loading ? (
                        <ActivityIndicator /> // Hiển thị loading nếu đang tải
                    ) : (
                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Sign in</Text>
                        </TouchableOpacity>
                    )}
                    <View style={styles.rowContainer}>
                        <Text style={styles.text2}>Don't have an account?</Text>
                        <TouchableOpacity style={styles.button2} onPress={() => router.push("/(auth)/sign-up")}>
                            <Text style={styles.buttonText2}>Create account</Text>
                        </TouchableOpacity>
                    </View>

                    {form.error ? (
                        <Text style={{color:"red"}}>{form.error}</Text> // Hiển thị thông báo lỗi nếu có
                    ) : null}
                    
                    
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignIn;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input:{
        width:"100%",
        margin:10,
        
    },
    rowContainer: {
        flexDirection: 'row', // Sắp xếp các phần tử theo hàng ngang
        alignItems: 'center', // Canh chỉnh các phần tử theo trục dọc
    },
    scrollViewContent: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 0 // Đặt khoảng cách trên 100px
    },
    imageContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 200, // Chiều rộng của hình ảnh
      height: 200, // Chiều cao của hình ảnh
      borderRadius: 10, // Bo góc của hình ảnh
    },
    text: {
      color: '#410fa3', // Màu trắng cho văn bản
      fontSize: 40, // Kích thước văn bản
      marginTop: 20, // Khoảng cách giữa hình ảnh và văn bản
      fontWeight:"bold",
      marginBottom:20,
    },
    text2: {
        color: 'black', // Màu trắng cho văn bản
        fontSize: 18, // Kích thước văn bản
        marginTop: 20, // Khoảng cách giữa hình ảnh và văn bản
        fontWeight:"bold",
        marginBottom:20,
        marginRight:10,
      },
    button: {
        width:200,
      marginTop:40,
      backgroundColor: '#410fa3', // Màu nền của button
      borderRadius: 8, // Bo góc của button
      
      justifyContent: 'center', // Căn chỉnh theo chiều dọc
      alignItems: 'center', // Căn chỉnh theo chiều ngang
      padding:20,
      
  
    },
    button2: {
      
      justifyContent: 'center', // Căn chỉnh theo chiều dọc
      alignItems: 'center', // Căn chỉnh theo chiều ngang
    },
    buttonText: {
      color: '#FFF',
      fontWeight:"bold", // Màu chữ của button
      fontSize: 20, // Kích thước chữ của button
    },
    buttonText2: {
        color: '#410fa3',
        fontWeight:"bold", // Màu chữ của button
        fontSize: 20, // Kích thước chữ của button
      },
  });