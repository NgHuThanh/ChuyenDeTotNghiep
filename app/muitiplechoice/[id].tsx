import AsyncStorage from '@react-native-async-storage/async-storage';
import { getVocabsInSet, vocab } from '@/model/word';
import { AntDesign } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MultipleChoice() {
    const { id } = useLocalSearchParams();
    const [vocabs, setVocabs] = useState<vocab[] | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [randomAnswers, setRandomAnswers] = useState<string[]>([]);
    const [finishedReview, setFinishedReview] = useState(false);
    const [minWordCount, setMinWordCount] = useState<number>(5);

    const fetchVocabs = async () => {
        const allVocabs = await getVocabsInSet(id as string);
        setVocabs(allVocabs);
    };

    useEffect(() => {
        const fetchMinWordCount = async () => {
            const minWordCountFromStorage = await AsyncStorage.getItem('multioption');
            if (minWordCountFromStorage) {
                setMinWordCount(parseInt(minWordCountFromStorage));
            }
        };
        fetchMinWordCount();
    }, []);

    useEffect(() => {
        fetchVocabs();
    }, []);

    useEffect(() => {
        if (vocabs) {
            getRandomAnswers().then(answers => setRandomAnswers(answers));
        }
    }, [vocabs, currentIndex]);

    const handleNext = () => {
        if (currentIndex === (vocabs ? vocabs.length - 1 : 0)) {
            setFinishedReview(true);
            setTimeout(() => {
                router.back();
            }, 3000);
        } else {
            setCurrentIndex(prevIndex => (prevIndex + 1) % (vocabs ? vocabs.length : 0));
            setSelectedAnswer('');
            setIsCorrect(null);
        }
    };

    const handleAnswerSelection = (answer: string) => {
        setSelectedAnswer(answer);
        if (vocabs && answer === vocabs[currentIndex]?.definition) {
            setIsCorrect(true);
            setTimeout(handleNext, 1500);
        } else {
            setIsCorrect(false);
        }
    };

    const getRandomAnswers = async (): Promise<string[]> => {
        if (!vocabs) return [];
        const multioption = await AsyncStorage.getItem('multioption');
        const numberOfOptions = multioption ? parseInt(multioption) : 4;
        const randomIndexes = await generateRandomIndexes(numberOfOptions - 1);
        const answers = [vocabs[currentIndex].definition];
        for (const index of randomIndexes) {
            answers.push(vocabs[index].definition);
        }
        return answers.sort(() => Math.random() - 0.5);
    };

    const generateRandomIndexes = async (numberOfIndexes: number): Promise<number[]> => {
        const indexes: number[] = [];
        if (!vocabs) return indexes; // Xử lý trường hợp vocabs có thể là null
        while (indexes.length < numberOfIndexes) {
            const randomIndex = Math.floor(Math.random() * vocabs.length);
            if (randomIndex !== currentIndex && !indexes.includes(randomIndex)) {
                indexes.push(randomIndex);
            }
        }
        return indexes;
    };
    if (finishedReview) {
        return (
            <View style={styles.finishedContainer}>
                <Text style={styles.finishedText}>You finished practice {vocabs?.length} word</Text>
                <TouchableOpacity style={styles.finishedButton} onPress={() => router.push("/bookmark")}>
                    <Text style={styles.finishedButtonText}>Finished</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handlePressBack = () => {
        router.push("/(tabs)/bookmark");
    };

    return (
        <>
            {vocabs && (
                <SafeAreaView style={styles.container}>
                    <TouchableOpacity style={{ alignSelf: "flex-start" }} onPress={handlePressBack}>
                        <AntDesign name="arrowleft" size={30} color="black" />
                    </TouchableOpacity>

                    <View style={styles.progressContainer}>
                        <ProgressBar progress={(currentIndex) / (vocabs.length + 1)} color={'green'} style={{ height: 20, borderRadius: 20, width: 280, borderWidth: 1 }} />
                    </View>
                    <View style={styles.question}>
                        <Text style={styles.questionText}>{vocabs[currentIndex].word}</Text>
                    </View>
                    <View style={{ width: "100%", alignItems: "center" }}>
                        {randomAnswers.map((answer, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleAnswerSelection(answer)}
                                style={[
                                    styles.answer,
                                    selectedAnswer === answer && isCorrect !== null && (isCorrect ? styles.correctAnswer : styles.wrongAnswer),
                                ]}
                            >
                                <Text style={{ color: "#FFF", fontWeight: "bold" }}>{answer}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </SafeAreaView>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 10,
    },
    question: {
        minHeight: 300,
        padding: 10,
        marginVertical: 10,
        borderColor: 'black',
        justifyContent: "center",
    },
    questionText: {
        fontWeight: 'bold',
        fontSize: 30,
        color: "#410fa3",
    },
    answer: {
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: 'black',
        width: "100%",
        alignItems: "center",
        backgroundColor: "#410fa3",
        borderRadius: 10,

    },
    correctAnswer: {
        backgroundColor: 'lightgreen',
    },
    progressContainer: {
        alignItems: 'center',
        padding: 10,
    },
    wrongAnswer: {
        backgroundColor: 'lightcoral',
    },
    finishedContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
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
