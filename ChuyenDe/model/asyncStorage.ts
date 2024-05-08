import AsyncStorage from "@react-native-async-storage/async-storage";
import { SetModel } from "./word";

export async function exportData() {
    try {
        // Lấy tất cả các key từ AsyncStorage
        const keys = await AsyncStorage.getAllKeys();

        // Lấy giá trị tương ứng với mỗi key
        const keyValuePair = await AsyncStorage.multiGet(keys);

        // Chuyển đổi thành văn bản
        const dataText = JSON.stringify(keyValuePair);
        console.log(dataText)
        // In ra ngoài hoặc lưu vào một file
        return dataText;

        // Nếu muốn lưu vào file, bạn có thể sử dụng một thư viện hoặc phương thức của Node.js để làm điều này.
    } catch (error) {
        console.error('Error exporting data:', error);
    }
}
export async function importData(dataText: string) {
    try {
        // Chuyển đổi dữ liệu văn bản thành mảng các cặp key-value
        const data: [string, string][] = JSON.parse(dataText);

        // Duyệt qua từng cặp key-value và lưu vào AsyncStorage
        for (const [key, value] of data) {
            await AsyncStorage.setItem(key, value);
        }

        console.log('Data imported successfully!');
    } catch (error) {
        console.error('Error importing data:', error);
    }
}
export async function importSetData(newDataText: string) {
    console.log(newDataText);
    try {
        // Lấy dữ liệu hiện có từ AsyncStorage
        const existingDataText = await AsyncStorage.getItem('sets');
        const existingData: any[] = existingDataText ? JSON.parse(existingDataText) : [];

        // Chuyển đổi dữ liệu mới từ văn bản thành đối tượng JSON
        const newData = JSON.parse(newDataText);

        // Kiểm tra xem newData có thuộc tính "vocabs" không
        if (!newData.hasOwnProperty('vocabs')) {
            console.error('No "vocabs" data found in the imported data.');
            return;
        }

        // Thêm dữ liệu mới từ newData vào existingData
        existingData.push(newData);

        // Lưu dữ liệu mới vào AsyncStorage
        await AsyncStorage.setItem('sets', JSON.stringify(existingData));

        console.log('Data added to "sets" successfully!');
    } catch (error) {
        console.error('Error adding data to "sets":', error);
    }
}
// export async function importSetData(dataText: string) {
//     try {
//         // Chuyển đổi dữ liệu văn bản thành mảng các cặp key-value
//         const data: [string, string][] = JSON.parse(dataText);

//         // Lấy dữ liệu của collection "sets" từ mảng các cặp key-value
//         const setsData = data.find(([key, _]) => key === 'sets');
        
//         if (!setsData) {
//             console.log('No "sets" data found in the imported data.');
//             return;
//         }

//         // Lưu dữ liệu sets vào AsyncStorage
//         await AsyncStorage.setItem('sets', setsData[1]);

//         console.log('Data imported successfully!');
//     } catch (error) {
//         console.error('Error importing data:', error);
//     }
// }
export async function clearAll() {
    try {
        await AsyncStorage.clear();
        console.log('All items cleared successfully!');
    } catch (error) {
        console.error('Error clearing all items:', error);
    }
}
export async function removeItem(key: string) {
    try {
        await AsyncStorage.removeItem(key);
        console.log(`Item with key "${key}" removed successfully!`);
    } catch (error) {
        console.error(`Error removing item with key "${key}":`, error);
    }
}
