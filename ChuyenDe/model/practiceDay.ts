// models/PracticeDay.ts
export default class PracticeDay {
    day: number;
    month: number;
    year: number;
    count: number;

    constructor(day: number, month: number, year: number, count: number) {
        this.day = day;
        this.month = month;
        this.year = year;
        this.count = count;
    }
}

// utils/practiceUtils.ts
import AsyncStorage from '@react-native-async-storage/async-storage';


export async function updatePracticeDays(props: { times: number }) {
    try {
        const now = new Date();
        const currentDay = now.getDate();
        const currentMonth = now.getMonth() + 1; // Tháng bắt đầu từ 0
        const currentYear = now.getFullYear();

        let practiceDays: PracticeDay[] = await getPracticeDays();

        // Kiểm tra xem ngày hiện tại đã có trong danh sách hay chưa
        const index = practiceDays.findIndex(day => day.day === currentDay && day.month === currentMonth && day.year === currentYear);
        if (index !== -1) {
            // Nếu ngày đã tồn tại, tăng biến đếm count lên 1
            practiceDays[index].count += props.times;
            console.log('Practice days updated successfully! to day has practice: ' + practiceDays[index].count);
        } else {
            // Nếu ngày chưa tồn tại, thêm một PracticeDay mới vào danh sách
            practiceDays.push(new PracticeDay(currentDay, currentMonth, currentYear, props.times));
            console.log('Practice day added successfully! to day has practice: ' + props.times);
        }

        // Lưu trữ danh sách ngày luyện tập đã được cập nhật vào AsyncStorage
        await AsyncStorage.setItem('practiceDays', JSON.stringify(practiceDays));
    } catch (error) {
        console.error('Error updating practice days:', error);
    }
}

export async function getPracticeDays(): Promise<PracticeDay[]> {
    let practiceDays: PracticeDay[] = [];
    try {
        const storedPracticeDays = await AsyncStorage.getItem('practiceDays');
        if (storedPracticeDays !== null) {
            practiceDays = JSON.parse(storedPracticeDays).map((day: any) => 
                new PracticeDay(day.day, day.month, day.year, day.count)
            );
        }
    } catch (error) {
        console.error('Error retrieving practice days from AsyncStorage:', error);
    }
    return practiceDays;
}
// const [practiced,setPracticed]=useState<PracticeDay[]>([]);  Đây là test đọc 
//   async function example() {
//     try {
//         const practiceDays = await getPracticeDays();
//         setPracticed(practiceDays);
//         console.log(practiceDays);
//     } catch (error) {
//         console.error('Error:', error);
//     }
//   }
// <View>
//           {practiced.map((practice)=><Text>{practice.count}</Text>)}
//           </View>
export async function getTodayPracticeDay(): Promise<PracticeDay[]> {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
    const currentYear = today.getFullYear();

    let practiceDays: PracticeDay[] = [];

    try {
        const storedPracticeDays = await AsyncStorage.getItem('practiceDays');
        if (storedPracticeDays !== null) {
            // Chuyển đổi dữ liệu từ chuỗi JSON thành mảng các đối tượng PracticeDay
            const storedDays: any[] = JSON.parse(storedPracticeDays);

            // Lọc ra các đối tượng PracticeDay có ngày, tháng, năm giống với ngày hiện tại
            practiceDays = storedDays.filter((day: any) => day.day === currentDay && day.month === currentMonth && day.year === currentYear)
                                       .map((day: any) => new PracticeDay(day.day, day.month, day.year, day.count));
        
        
                                    }
    } catch (error) {
        console.error('Error retrieving practice days from AsyncStorage:', error);
    }

    return practiceDays;
}