import React, { useState } from "react";
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, ScrollView, View, Image } from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import { addUser } from "../firebase/config";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    avatar: null as string | null,
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
      if (form.password.length < 6) {
        setForm({ ...form, error: "Password needs at least 6 characters" });
        return;
      }

      if (form.password !== form.confirmPassword) {
        setForm({ ...form, error: "Password does not match" });
        return;
      }

      const userData = {
        username: form.username,
        password: form.password,
        avatarUri: form.avatar
      };
      
      const check = await addUser(userData);
      if (!check) {
        setForm({ ...form, error: "Username already taken" });
      } else {
        // Đăng ký thành công, hiển thị thông báo và điều hướng đến trang khác
        router.push('/(auth)/sign-in'); // Thay 'Home' bằng tên màn hình bạn muốn điều hướng đến
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handlePressBack = () => {
    router.push("/");
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setForm({ ...form, avatar: result.assets[0].uri });
    }
  };

  return (
    <SafeAreaView style={{height:"100%",backgroundColor:"#FFF"}}>
      <TouchableOpacity style={{ alignSelf: "flex-start", marginTop: 40 }} onPress={handlePressBack}>
        <AntDesign name="arrowleft" size={30} color="black" />
      </TouchableOpacity>

      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>Create an account</Text>
          {form.avatar && <Image source={{ uri: form.avatar }} style={styles.avatar} />}
          <Button style={styles.avatarButton} mode="outlined" onPress={pickImage}>
            Choose Avatar
          </Button>
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
    marginTop: 40,
    backgroundColor: '#410fa3',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: "bold",
    fontSize: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  avatarButton: {
    marginBottom: 20,
    borderColor: '#410fa3',
  },
});
