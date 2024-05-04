import { SetModel, getVocabsInSet, updateVocabDifficulty, updateVocabFavorite, vocab } from "@/model/word";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Image, Button, TouchableOpacity, ViewStyle } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function Review() {
    const { id } = useLocalSearchParams();
    const [vocabs, setVocabs] = useState<vocab[] | null>(null);
    const [currentVocabIndex, setCurrentVocabIndex] = useState<number>(0);
    const [showDefinition, setShowDefinition] = useState<boolean>(false);

    const fetchVocabs = async () => {
        const allVocabs = await getVocabsInSet(id as string);
        setVocabs(allVocabs);
    };

    useEffect(() => {
        fetchVocabs();
    }, []);

    const handleNext = () => {
        setCurrentVocabIndex((prevIndex) => (prevIndex + 1) % (vocabs ? vocabs.length : 0));
        setShowDefinition(false); // Reset showDefinition khi chuyển sang từ tiếp theo
    };

    const handleToggleDefinition = () => {
        setShowDefinition((prevState) => !prevState); // Thay đổi giá trị của showDefinition giữa true và false
    };

    const handleGoBack = () => {
        if (currentVocabIndex > 0) {
            setCurrentVocabIndex(currentVocabIndex - 1);
            setShowDefinition(false); // Reset showDefinition khi quay lại từ trước đó
        }
    };

    const handleToggleFavorite = async () => {
        if (vocabs && vocabs[currentVocabIndex]) {
            const updatedVocabs = [...vocabs];
            const vocabToUpdate = updatedVocabs[currentVocabIndex];
            vocabToUpdate.favorite = !vocabToUpdate.favorite;
            setVocabs(updatedVocabs);
            await updateVocabFavorite(id as string, vocabToUpdate.word);
        }
    }; 
    const handleUpdateDifficulty = async (difficulty: string) => {
        if (vocabs && vocabs[currentVocabIndex]) {
            const vocabWord = vocabs[currentVocabIndex].word;
            const setName = id; // Thay thế bằng tên của set của bạn
            try {
                let sets: SetModel[] = [];
                const existingSets = await AsyncStorage.getItem('sets');
                if (existingSets) {
                    sets = JSON.parse(existingSets).map((set: SetModel) => {
                        if (set.name === setName && set.vocabs) {
                            set.vocabs = set.vocabs.map((vocab: vocab) => {
                                if (vocab.word === vocabWord) {
                                    vocab.difficult = difficulty;
                                }
                                return vocab;
                            });
                        }
                        return set;
                    });
                    await AsyncStorage.setItem('sets', JSON.stringify(sets));
                    console.log('Vocab difficulty updated successfully!');
                }
            } catch (error) {
                console.error('Error updating vocab difficulty:', error);
            }
        } else {
            console.error('vocabs is null or empty');
        }
        handleNext();
    };

    return (
        <>
            {vocabs && (
                <SafeAreaView style={styles.container}>
                    <View style={styles.favoriteIcon}>
                        <TouchableOpacity onPress={handleToggleFavorite}>
                            <AntDesign name={vocabs[currentVocabIndex].favorite ? "heart" : "hearto"} size={24} color={vocabs[currentVocabIndex].favorite ? "red" : "black"} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.wordContainer}>
                        <Text style={styles.wordText}>{vocabs[currentVocabIndex].word}</Text>
                        {showDefinition && (
                            <Text style={styles.definitionText}>Definition: {vocabs[currentVocabIndex].definition}</Text>
                        )}
                    </View>
                    <View>
                        <TouchableOpacity style={styles.button} onPress={handleToggleDefinition}>
                            <Text style={styles.buttonText}>{showDefinition ? 'Hide' : 'Show'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonsContainer}>
                    <View style={styles.buttonWrapper}>
                            <TouchableOpacity style={[styles.button, styles.hardButton]} onPress={() => handleUpdateDifficulty("hard")}>
                                <Text style={styles.buttonText}>Hard</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonWrapper}>
                            <TouchableOpacity style={[styles.button, styles.goodButton]} onPress={() => handleUpdateDifficulty("good")}>
                                <Text style={styles.buttonText}>Good</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonWrapper}>
                            <TouchableOpacity style={[styles.button, styles.easyButton]} onPress={() => handleUpdateDifficulty("easy")}>
                                <Text style={styles.buttonText}>Easy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            )}
        </>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eaeaea', // Màu nền
    },
    wordContainer: {
        flex: 6, // Chiếm 60% chiều cao
        justifyContent: 'center',
        alignItems: 'center',
    },
    wordText: {
        fontSize: 24,
        textAlign: 'center',
    },
    definitionText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
    },
    buttonsContainer: {
        flex: 1, // Chiếm 10% chiều cao
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%', // Chiếm 100% chiều rộng
    },
    buttonWrapper: {
        width: '33.33%', // Chiếm 33.33% chiều rộng
    },
    button: {
        backgroundColor: '#4CAF50', // Màu nền button mặc định
        borderRadius: 20, // Bo tròn góc
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: 'white', // Màu chữ button
        fontSize: 18,
        textAlign: 'center',
    },
    hardButton: {
        backgroundColor: 'red', // Màu nền button Hard
    },
    goodButton: {
        backgroundColor: 'yellow', // Màu nền button Good
    },
    easyButton: {
        backgroundColor: 'green', // Màu nền button Easy
    },
    favoriteIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});
