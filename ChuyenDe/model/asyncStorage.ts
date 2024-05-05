import AsyncStorage from "@react-native-async-storage/async-storage";

export async function exportData() {
    try {
        // Lấy tất cả các key từ AsyncStorage
        const keys = await AsyncStorage.getAllKeys();

        // Lấy giá trị tương ứng với mỗi key
        const keyValuePair = await AsyncStorage.multiGet(keys);

        // Chuyển đổi thành văn bản
        const dataText = JSON.stringify(keyValuePair);

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