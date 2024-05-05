import React, { useState } from "react";
import { SafeAreaView, Text, Image, TouchableOpacity, ScrollView, View } from "react-native";
import { Button, IconButton, TextInput } from "react-native-paper";

import { addDoc, collection } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore';
import { addUser } from "../firebase/config";

const SignUp = () => {
  const localImageUrl = require("../../assets/images/illustrations.png");
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const toggleShowPassword = () => {
    setForm({ ...form, showPassword: !form.showPassword });
  };

  const toggleShowConfirmPassword = () => {
    setForm({ ...form, showConfirmPassword: !form.showConfirmPassword });
  };

  const handleSignUp = async () => {
    // Tạo tài khoản người dùng với email và mật khẩu
    try {
      // Ghi thông tin người dùng lên Firestore
      const userData = {
        email: form.email,
        username: form.username,
        // Các trường thông tin khác mà bạn muốn lưu
        password:form.password
      };
      addUser(userData);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Image source={localImageUrl} resizeMode="contain" />
          <Text>Create a account</Text>
          <TextInput
            mode="outlined"
            label="Email"
            placeholder="Enter your Email"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
          />
          <TextInput
            mode="outlined"
            label="Username"
            placeholder="Enter your Username"
            value={form.username}
            onChangeText={(text) => setForm({ ...form, username: text })}
          />
          <View style={{ flexDirection: "row" }}>
            <TextInput
              mode="outlined"
              label="Password"
              placeholder="Enter your password"
              secureTextEntry={!form.showPassword}
              value={form.password}
              onChangeText={(text) => setForm({ ...form, password: text })}
              style={{ flex: 1 }}
            />
            
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              mode="outlined"
              label="Confirm Password"
              placeholder="Confirm password"
              secureTextEntry={!form.showConfirmPassword}
              value={form.confirmPassword}
              onChangeText={(text) =>
                setForm({ ...form, confirmPassword: text })
              }
              style={{ flex: 1 }}
            />
            
          </View>
          <Button mode="contained" onPress={handleSignUp}>
            Sign Up
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
