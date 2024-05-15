import { Audio } from 'expo-av';

const playSound = async (soundUrl:string) => {
    try {
        const { sound } = await Audio.Sound.createAsync({ uri: soundUrl });
        await sound.playAsync();
    } catch (error) {
        console.log('Error playing sound:', error);
    }
}
export default playSound;
// Sử dụng hàm playSound với URL âm thanh cụ thể
// playSound('https://api.dictionaryapi.dev/media/pronunciations/en/hello-au.mp3');
