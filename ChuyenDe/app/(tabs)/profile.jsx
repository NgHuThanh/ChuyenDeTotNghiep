import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { StackedBarChart } from "react-native-chart-kit";
import { Dimensions,ViewStyle } from "react-native";
import { getPracticeDays } from "../../model/practiceDay";
import {setAsyncData} from "../../model/word";
import { Modal, Portal,PaperProvider } from 'react-native-paper';
import { router, useLocalSearchParams } from "expo-router";
import {logout} from "../firebase/config"
const screenWidth = Dimensions.get("window").width;

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dateLabels, setDateLabels] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [practiceCounts, setPracticeCounts] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const logoutConfirmed = () => {
    
    setVisible(false);
    logout();
    router.push("/");
  };
  const hideModal = () => {
    
    setVisible(false);
    
  };
  useEffect(() => {
    const getUsername = async () => {
      
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const storedEmail = await AsyncStorage.getItem('email');
        if (storedUsername !== null) {
          setUsername(storedUsername);
          setEmail(storedEmail);
        }
      } catch (error) {
        console.error('Error retrieving username from AsyncStorage:', error);
      }
    };
    
    getUsername();
  }, []);

  useEffect(() => {
    const formattedDate = formatDate(currentDate);
    setSelectedDate(formattedDate);
    const labels = generateDateLabels(currentDate);
    setDateLabels(labels);
    updatePracticeCounts(labels);
  }, [currentDate]);

  const generateDateLabels = (currentDate) => {
    const labels = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      labels.push({ day, month }); // Lưu trữ ngày và tháng trong mảng
    }
    return labels;
  };

  const formatDate = (date) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  const handlePreviousDate = () => {
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 7);
    setCurrentDate(prevDate);
  };

  const handleNextDate = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 7);
    if (nextDate <= new Date()) {
      setCurrentDate(nextDate);
    }
  };
  
  const updatePracticeCounts = async (labels) => {
    const practiceDays = await getPracticeDays();
    const counts = labels.map(({ day, month }) => { // Sử dụng destructuring để lấy ngày và tháng từ mảng nhãn
      const practiceDay = practiceDays.find(dayItem => {
        console.log("Comparing:", dayItem.day, day, dayItem.month, month, dayItem.year, new Date().getFullYear());
        return dayItem.day == day && dayItem.month == month && dayItem.year == new Date().getFullYear(); // So sánh ngày và tháng
      });
      return practiceDay ? practiceDay.count : 0;
    });
    setPracticeCounts(counts);
  };

  const data = {
    labels: dateLabels.map(({ day }) => day), // Chỉ lấy ra ngày từ mỗi nhãn
    data: practiceCounts.map(count => [count]), // Chuyển đổi counts thành mảng 2 chiều với mỗi phần tử là một mảng có một phần tử
    barColors: ["#FFF", "#FFF", "#FFF","#FFF", "#FFF", "black","#FFF"]
  };

  const graphStyle = {
    marginVertical: 8,
    fontWeight:"bold",
    fontSize:"20",

    // Bất kỳ style khác bạn muốn áp dụng cho biểu đồ
  };

  const chartConfig = {
    backgroundGradientFrom: "#410fa3",
    backgroundGradientTo: "#410fa3",
    color: (opacity = 1) => `#410fa3`,
    labelColor: (opacity = 1) => `#ffffff`,
    formatYLabel: value => `${value.toFixed(0)}`,
    
    strokeWidth: 1,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
     
  };
 
  

  return (
    <PaperProvider>
      <SafeAreaView style={{ backgroundColor: '#FFF' }}>
      <ScrollView>
        <View style={styles.headContainer}>
          <Text style={styles.text}>PROFILE</Text> {/* Hiển thị username */}
          <Text style={styles.textt}>Username: {username}</Text>
          <Text style={styles.textt}>Email: {email}</Text>
          <View style={{flexDirection:"row"}}>
            <Text style={styles.textSmall}>Let see your progress</Text>
            <TouchableOpacity style={{borderRadius:"50%",padding:5,backgroundColor:"#FFF",margin:10}}onPress={showModal}><AntDesign name="logout" size={24} color="#410fa3" /></TouchableOpacity>
          
          </View>
          </View>
        <View>
          <View style={styles.dateContainer}>
            <TouchableOpacity onPress={handlePreviousDate}><AntDesign name="caretleft" size={24} color="black" /></TouchableOpacity>
            <Text style={styles.textt2}>{selectedDate}</Text>
            <TouchableOpacity onPress={handleNextDate}><AntDesign name="caretright" size={24} color="black" /></TouchableOpacity>
          </View>
          <StackedBarChart
            style={graphStyle}
            data={data}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
          />
        </View>
      </ScrollView>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal}>
          <View style={{backgroundColor:"#FFF",alignItems:"center",padding:20}}>
            <Text style={{fontSize:20,fontWeight:"bold"}}>Are you sure want to log out?</Text>
            <View style={{flexDirection:"row"}}>
              <TouchableOpacity style={{margin:10,width:100,padding:10,borderRadius:10, backgroundColor:"blue",color:"#FFF"}} onPress={logoutConfirmed}>Yes</TouchableOpacity>
              <TouchableOpacity style={{margin:10,width:100,padding:10,borderRadius:10, backgroundColor:"blue",color:"#FFF"}} onPress={hideModal}>No</TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Portal>
    </SafeAreaView>
    </PaperProvider>
    
  );
};

export default Profile;

const styles = StyleSheet.create({
  headContainer: {
    backgroundColor: '#410fa3',
    padding: 20,
  },
  text: {
    marginTop: 20,
    color: '#faf9fd',
    fontWeight: 'bold',
    fontSize: 24,
  },
  textt: {
    marginTop: 16,
    color: '#faf9fd',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textt2: {
    marginTop: 16,
    color: '#black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textSmall: {
    marginTop: 10,
    color: '#888',
    fontWeight: 'bold',
    fontSize: 12,
  },
  dateContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});
