import { AntDesign, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const url="https://api.mymemory.translated.net/get?q=Hello World!&langpair=en|it";
const fetcher = async (url:string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

export default function LongApp() {
  const [text, setText] = useState('');
  const [translationText, setTranslationText] = useState('');
  const [from, setFrom] = useState('en');
  const [to, setTo] = useState('vi');
  
  const handleInputChange = (inputText:string) => {
    setText(inputText);
  };

  const handlePressen_vn = () => {
    setFrom('en');
    setTo('vi');
    if(text) {
      fetchData();
    }
  }

  const handlePressvn_en = () => {
    setFrom('vi');
    setTo('en');
    if(text) {
      fetchData();
    }
  }

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${text}!&langpair=${from}|${to}`);
      const data = await response.json();
      if (data && data.responseData) {
        setTranslationText(data.responseData.translatedText);
      }
    } catch (error) {
      console.error('Error fetching translation:', error);
    }
  };
  const handlePressBack=()=>{
    router.push("/(tabs)/translate");
  }
  return (
    <SafeAreaView style={{backgroundColor:"#FFF",height:"100%",padding:10}}>
      <TouchableOpacity style={{alignSelf:"flex-start"}} onPress={handlePressBack}><AntDesign name="arrowleft" size={30} color="black" /></TouchableOpacity>

      <View>
        <TextInput
          label="Input text to translate"
          value={text}
          onChangeText={handleInputChange}
          multiline={true} // Cho phép nhập nhiều dòng
          numberOfLines={3} // Số dòng tối đa
          style={styles.textInput} // Thêm kiểu cho TextInput
          underlineColorAndroid="transparent" // Loại bỏ vạch dưới mặc định
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={handlePressen_vn}>
          <Text style={styles.buttonText}>Eng-Viet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={handlePressvn_en}>
          <Text style={styles.buttonText}>Viet-Eng</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.definitionContainer}>
        <Text style={styles.definitionText}>
          {translationText}
        </Text>
        <TouchableOpacity style={styles.audioButton}>
          <Feather name="volume-2" size={24} color="#888" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 100,
    backgroundColor:"#dbf6ff",
    fontSize:16,
    borderBottomColor:"#dbf6ff",
     // Độ cao 3 dòng
  },
  buttonContainer: {
    flexDirection: 'row', // Sắp xếp các button theo hàng ngang
    justifyContent: 'space-between', // Căn đều các button trong hàng ngang
    marginVertical: 10, // Khoảng cách dọc giữa text input và button container
  },
  button: {
    backgroundColor: '#5b7bfe',
    borderRadius: 8,
    height: 50,
    width: '48%', // Chiếm 48% chiều rộng của parent (SafeAreaView)
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight:"bold",
    fontSize: 18,
  },
  
  definitionContainer: {
    padding:10,
    minHeight: 100, // Đảm bảo view có độ cao tối thiểu là 100px
    justifyContent: 'center',
    marginVertical: 10, // Khoảng cách dọc giữa button container và definition container
    backgroundColor:"#dbf6ff",
    borderRadius:10,
    position: 'relative', // Định vị tương đối để có thể đặt vị trí tuyệt đối cho TouchableOpacity
  },
  definitionText: {
    marginBottom: 5,
    fontSize:16, // Khoảng cách dưới của definition text
  },
  audioButton: {
    position: 'absolute', // Định vị tuyệt đối
    bottom: 0, // Đặt ở dưới cùng
    right: 0, // Đặt ở phải cùng
    margin: 10, // Khoảng cách với viền của phần chứa văn bản
  },
});
