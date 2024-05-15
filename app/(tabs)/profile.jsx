import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { StackedBarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { getPracticeDays } from "../../model/practiceDay";
import { Modal, Portal,PaperProvider } from 'react-native-paper';
import { router } from "expo-router";
import { logout } from "../firebase/config";
import { clearAll } from "../../model/asyncStorage";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const screenWidth = Dimensions.get("window").width;

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dateLabels, setDateLabels] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [practiceCounts, setPracticeCounts] = useState([]);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);

  const logoutConfirmed = () => {
    
    logout();
    handleClear();
    router.push("/(auth)/sign-in");
  };

  const hideModal = () => {
    setVisible(false);
  };

  const handleClear = () => {
    clearAll();
  };

  useEffect(() => {
    const getUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const storedEmail = await AsyncStorage.getItem('email');
        if (storedUsername !== null) {
          setUsername(storedUsername);
          setEmail(storedEmail);
        } else {
          router.push("/(auth)/sign-in"); // Chuyển hướng đến trang đăng nhập nếu không tồn tại username
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
    const counts = labels.map(({ day, month }) => {
      const practiceDay = practiceDays.find(dayItem => {
        return dayItem.day == day && dayItem.month == month && dayItem.year == new Date().getFullYear();
      });
      let count = practiceDay ? practiceDay.count : 0;
      // Kiểm tra xem count có phải là NaN hay không
      if (isNaN(count)) {
        count = 0; // Gán count bằng 0 nếu là NaN
      }
      return count;
    });
    setPracticeCounts(counts);
  };

  const data = {
    labels: dateLabels.map(({ day }) => day+"th"),
    legend: ["Practices Times"], // Chỉ lấy ra ngày từ mỗi nhãn
    data: practiceCounts.map(count => [Math.round(count)]), // Chuyển đổi counts thành mảng 2 chiều với mỗi phần tử là một mảng có một phần tử
    barColors: ["#8cd8bc", "#8cd8bc", "#8cd8bc", "#8cd8bc", "#8cd8bc", "#8cd8bc", "#8cd8bc"]
  };

  const graphStyle = {
    marginVertical: 0,
    fontWeight: "bold",
    fontSize: 30,
    
    
    // Bất kỳ style khác bạn muốn áp dụng cho biểu đồ
  };

  const chartConfig = {
    backgroundGradientFrom: "#410fa3",
    backgroundGradientTo: "#410fa3",
    formatYLabel: value => `${Math.round(value)}`,
  formatXLabel: () => '', // Không hiển thị bất kỳ nhãn nào trên trục ngang
    color: (opacity = 1) => `#410fa3`,
    labelColor: (opacity = 1) => `#FFF`,
    
    formatYLabel: value => `${value.toFixed(0)}`,
    
    strokeWidth: 1,
    barPercentage: 0.8,
    useShadowColorFromDataset: false,

  };

  return (
    
    <GestureHandlerRootView>
      
      <SafeAreaView style={{ backgroundColor: '#410fa3' }}>
      
        <ScrollView>
          <View style={styles.headContainer}>
            <Text style={styles.text}>PROFILE</Text>
            <Text style={styles.textt}>Username: <Text>{username}</Text></Text>
            <Text style={styles.textt}>Email: <Text>{email}</Text></Text>

            <View style={{ flexDirection: "row" }}>
            <Text style={styles.textSmall}>Let see your progress</Text>
            <TouchableOpacity style={{ borderRadius: 50, padding: 5, backgroundColor: "#FFF", margin: 10 }} onPress={logoutConfirmed}>
            <AntDesign name="logout" size={24} color="#410fa3" />
            </TouchableOpacity>


            </View>
            
          </View>
          <View>
            <View style={styles.dateContainer}>
              <TouchableOpacity onPress={handlePreviousDate}><AntDesign name="caretleft" size={24} color="black" /></TouchableOpacity>
              <Text style={styles.textt2}><Text>{selectedDate}</Text></Text>

              <TouchableOpacity onPress={handleNextDate}><AntDesign name="caretright" size={24} color="black" /></TouchableOpacity>
              
            </View>
            <StackedBarChart
              style={graphStyle}
              data={data}
              width={screenWidth}
              height={240}
              chartConfig={chartConfig}
              withVerticalLabels={true}
              withHorizontalLabels={false}
              showLegend={false}
              fromZero={true}
            />
          </View>
        </ScrollView>
        {/* <PaperProvider>
          <Portal>
              <Modal visible={visible} onDismiss={hideModal}>
                <View style={{ backgroundColor: "#FFF", alignItems: "center", padding: 20,height:150,borderRadius:10,margin:20 }}>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>Are you sure want to log out?</Text>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity style={{ margin: 10, width: 100, padding: 10, borderRadius: 10, backgroundColor: "blue", color: "#FFF" }} onPress={logoutConfirmed}><Text>Yes</Text></TouchableOpacity>
                    <TouchableOpacity style={{ margin: 10, width: 100, padding: 10, borderRadius: 10, backgroundColor: "blue", color: "#FFF" }} onPress={hideModal}><Text>No</Text></TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </Portal>
      </PaperProvider> */}
       
        
        
      </SafeAreaView>
      
    </GestureHandlerRootView>
    
    
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
    backgroundColor:"#FFF"
  },
});
