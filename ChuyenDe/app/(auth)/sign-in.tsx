import { View } from "@/components/Themed";
import { router } from "expo-router";
import { useState } from "react";
import {SafeAreaView, Text,Image, Touchable, TouchableOpacity} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { login } from "../firebase/config";

const SignIn = () => {
    const localImageUrl = require('../../assets/images/illustrations.png');
    const [form, setForm] = useState({
        email:'',
        password:'',
        loading: false, // Thêm trạng thái loading
        error: '', // Thêm trạng thái lỗi
    });

    const handleLogin = async () => {
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
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Image source={localImageUrl} resizeMode='contain'/>
                    <Text>Log in to Engnote</Text>
                    <TextInput
                        mode="outlined"
                        label="Email"
                        placeholder="Enter your Email"
                        value={form.email}
                        onChangeText={(text) => setForm({ ...form, email: text })}
                    />
                    <TextInput
                        mode="outlined"
                        label="Password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChangeText={(text) => setForm({ ...form, password: text })}
                    />
                    {form.loading ? (
                        <ActivityIndicator /> // Hiển thị loading nếu đang tải
                    ) : (
                        <TouchableOpacity onPress={handleLogin}>
                            <Text>Login</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")}>
                        <Text>Create account</Text>
                    </TouchableOpacity>
                    {form.error ? (
                        <Text>{form.error}</Text> // Hiển thị thông báo lỗi nếu có
                    ) : null}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignIn;
