import SwipeGestureHandler from "@/component/swifHandle";
import { updatePracticeDays } from "@/model/practiceDay";
import { SetModel, findVocabsWithLastPracticeBeforeNow, getVocabsInSet, updateVocabDifficulty, updateVocabFavorite, vocab } from "@/model/word";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ProgressBar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

type DifficultType = 'hard' | 'good' | 'easy' | 'skip';

export default function Review() {
    const { id } = useLocalSearchParams();
    const [vocabs, setVocabs] = useState<vocab[] | null>(null);
    const [currentVocabIndex, setCurrentVocabIndex] = useState<number>(0);
    const [showDefinition, setShowDefinition] = useState<boolean>(false);
    const [showInvert, setShowInvert] = useState<boolean>(false);
    const [finishedReview, setFinishedReview] = useState(false);
    const [easyDays, setEasyDays] = useState(10);
    const [goodDays, setGoodDays] = useState(7);
    const [hardDays, setHardDays] = useState(3);

    const fetchVocabs = async () => {
        if (id == "practice") {
            const allVocabs = await findVocabsWithLastPracticeBeforeNow();
            setVocabs(allVocabs);
        } else {
            const allVocabs = await getVocabsInSet(id as string);
            setVocabs(allVocabs);
        }
    };

    const handleSwipeLeft = () => {
        handleGoBack();
    };

    const handleSwipeRight = () => {
        handleNext();
    };

    useEffect(() => {
        fetchVocabs();
        fetchPracticeDays();
    }, []);

    const fetchPracticeDays = async () => {
        const easy = await AsyncStorage.getItem('easy');
        const good = await AsyncStorage.getItem('good');
        const hard = await AsyncStorage.getItem('hard');
        const showInvert=await AsyncStorage.getItem('showDef');
        console.log(showInvert);
        setShowInvert(showInvert === 'true');
        setEasyDays(easy ? parseInt(easy) : 10);
        setGoodDays(good ? parseInt(good) : 7);
        setHardDays(hard ? parseInt(hard) : 3);
    };

    const handleNext = () => {
        if (currentVocabIndex === (vocabs ? vocabs.length - 1 : 0)) {
            setFinishedReview(true);
        } else {
            setCurrentVocabIndex((prevIndex) => prevIndex + 1);
            setShowDefinition(false); // Reset showDefinition khi chuyển sang từ tiếp theo
        }
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
            await updateVocabFavorite(vocabToUpdate.source, vocabToUpdate.word);
        }
    };

    const handleUpdateDifficulty = async (difficulty: string) => {
        if (vocabs && vocabs[currentVocabIndex]) {
            const vocabWord = vocabs[currentVocabIndex].word;
            const setName = vocabs[currentVocabIndex].source; // Thay thế bằng tên của set của bạn
            try {
                let sets: SetModel[] = [];
                const existingSets = await AsyncStorage.getItem('sets');
                if (existingSets) {
                    sets = JSON.parse(existingSets).map((set: SetModel) => {
                        if (set.name === setName && set.vocabs) {
                            set.vocabs = set.vocabs.map((vocab: vocab) => {
                                if (vocab.word === vocabWord) {
                                    vocab.difficult = difficulty as DifficultType;
                                    // Cập nhật ngày lastPractice
                                    const today = new Date();
                                    let daysToAdd = 0;
                                    if (difficulty === "hard") {
                                        daysToAdd = hardDays;
                                    } else if (difficulty === "good") {
                                        daysToAdd = goodDays;
                                    } else if (difficulty === "easy") {
                                        daysToAdd = easyDays;
                                    } else if (difficulty === "skip") {
                                        daysToAdd = 9000;
                                    }
                                    const futureDate = new Date(today.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
                                    vocab.lastPractice = futureDate;
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

    const handleFinish = () => {
        updatePracticeDays({ times: vocabs?.length as number }); // Truyền số lần luyện tập cần cập nhật vào tham số `times`
        router.push("/(tabs)/bookmark");
    }

    if (finishedReview) {
        return <View style={styles.finishedContainer}>
            <Text style={styles.finishedText}>You finished practice {vocabs?.length} word</Text>
            <TouchableOpacity style={styles.finishedButton} onPress={handleFinish}>
                <Text style={styles.finishedButtonText}>Finished</Text>
            </TouchableOpacity>
        </View>
    }

    const handlePressBack = () => {
        router.push("/(tabs)/bookmark");
    }

    return (
        <GestureHandlerRootView>
            {vocabs && (
                <SafeAreaView style={styles.container}>
                    <TouchableOpacity style={{ alignSelf: "flex-start" }} onPress={handlePressBack}><AntDesign name="arrowleft" size={30} color="black" /></TouchableOpacity>
                    <View style={styles.progressContainer}>
                        <ProgressBar progress={currentVocabIndex / (vocabs ? vocabs.length : 1)} color={'green'} style={{ height: 20, borderRadius: 20, width: 280, borderWidth: 1 }} />
                    </View>
                    <View style={styles.wordContainer}>
                        <View style={styles.favoriteIcon}>
                            <TouchableOpacity onPress={handleToggleFavorite}>
                                <AntDesign name={vocabs[currentVocabIndex].favorite ? "heart" : "hearto"} size={24} color={vocabs[currentVocabIndex].favorite ? "red" : "black"} />
                            </TouchableOpacity>
                        </View>
                        {
                            showInvert && (
                                <View>
                                    <Text style={styles.wordText}>{vocabs[currentVocabIndex].definition}</Text>
                                    {showDefinition && (
                                        <Text style={styles.definitionText}>Word: {vocabs[currentVocabIndex].word}</Text>
                                    )}
                                </View>
                            )
                        }
                        {
                            !showInvert && (
                                <View>
                                    <Text style={styles.wordText}>{vocabs[currentVocabIndex].word}</Text>
                                    {showDefinition && (
                                        <Text style={styles.definitionText}>Definition: {vocabs[currentVocabIndex].definition}</Text>
                                    )}
                                </View>
                            )
                        }
                        
                        {/* {showDefinition && (
                            <Text style={styles.definitionText}>Definition: {vocabs[currentVocabIndex].definition}</Text>
                        )} */}
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
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity style={[styles.button, styles.skipButton]} onPress={() => handleUpdateDifficulty("skip")}>
                            <Text style={styles.buttonText}>Skip</Text>
                        </TouchableOpacity>
                    </View>
                    <SwipeGestureHandler onSwipeLeft={handleSwipeLeft} onSwipeRight={handleSwipeRight} />
                </SafeAreaView>
            )}
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eaeaea',
        height: "100%",
    },
    wordContainer: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 20,
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: "black",
        minWidth: 300,
        backgroundColor: "#91afed",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderLeftWidth: 10,
        borderLeftColor: "black",
    },
    wordText: {
        fontSize: 32,
        textAlign: 'center',
        fontWeight: "bold",
        color: "#FFF"
    },
    definitionText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
    },
    buttonsContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
    },
    progressContainer: {
        flex: 1,
        marginTop: 15,
    },
    buttonWrapper: {
        width: '30%',
        margin: 5,
    },
    button: {
        backgroundColor: '#4CAF50',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: "bold",
    },
    hardButton: {
        backgroundColor: 'red',
    },
    goodButton: {
        backgroundColor: 'yellow',
    },
    easyButton: {
        backgroundColor: 'green',
    },
    skipButton: {
        backgroundColor: 'gray',
    },
    favoriteIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    finishedContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    finishedText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginBottom: 20,
    },
    finishedButton: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    finishedButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
