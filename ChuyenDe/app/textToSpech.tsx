import { Audio } from 'expo-av';

export const speak = async (text:string) => {
    const soundObject = new Audio.Sound();
    try {
        await soundObject.loadAsync({ uri: 'http://translate.google.com/translate_tts?ie=UTF-8&q=' + encodeURIComponent(text) + '&tl=en&client=tw-ob' });
        await soundObject.playAsync();
        // Cần đợi cho âm thanh phát xong trước khi unload để tránh lỗi
        await soundObject.unloadAsync();
    } catch (error) {
        console.error('Error speaking:', error);
    }
};

// Sử dụng hàm speak để phát âm thanh
speak("Hello, how are you?");
