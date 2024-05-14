import React, { useState } from "react";
import { SafeAreaView, Text, Image, StyleSheet, TouchableOpacity, ScrollView, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { addUser } from "../firebase/config";
import { router } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    showPassword: false,
    showConfirmPassword: false,
    error: '',
    loading: false,
  });

  const toggleShowPassword = () => {
    setForm({ ...form, showPassword: !form.showPassword });
  };

  const toggleShowConfirmPassword = () => {
    setForm({ ...form, showConfirmPassword: !form.showConfirmPassword });
  };

  const handleSignUp = async () => {
    try {
      if (form.password !== form.confirmPassword) {
        setForm({ ...form, error: "Password does not match" });
        return;
      }

      const userData = {
        email: form.email,
        username: form.username,
        password: form.password
      };
      
      const check = await addUser(userData);
      if (!check) {
        setForm({ ...form, error: "Email already sign up" });
      } else {
        // Đăng ký thành công, hiển thị thông báo và điều hướng đến trang khác
        
        router.push('/(auth)/sign-in'); // Thay 'Home' bằng tên màn hình bạn muốn điều hướng đến
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };
  

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>Create an account</Text>
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
            label="Username"
            placeholder="Enter your Username"
            value={form.username}
            onChangeText={(text) => setForm({ ...form, username: text })}
            style={styles.input}
          />
          <TextInput
            mode="outlined"
            label="Password"
            placeholder="Enter your password"
            secureTextEntry={!form.showPassword}
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
            style={styles.input}
          />
          <TextInput
            mode="outlined"
            label="Confirm Password"
            placeholder="Confirm password"
            secureTextEntry={!form.showConfirmPassword}
            value={form.confirmPassword}
            onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
            style={styles.input}
          />
          <Button style={styles.button} mode="contained" onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Button>
          {form.error ? (
            <Text style={{ color: 'red', marginTop: 10 }}>{form.error}</Text>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  input: {
    width: "100%",
    margin: 10,
  },
  text: {
    color: '#410fa3',
    fontSize: 40,
    marginTop: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    width: 200,
    marginTop: 40,
    backgroundColor: '#410fa3',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: "bold",
    fontSize: 20,
  },
});
