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
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // Biến để lưu trạng thái của việc chọn đúng hay sai
    const [randomAnswers, setRandomAnswers] = useState<string[]>([]); // Biến để lưu trữ các đáp án ngẫu nhiên
    const [finishedReview, setFinishedReview] = useState(false);
    const fetchVocabs = async () => {
        const allVocabs = await getVocabsInSet(id as string);
        setVocabs(allVocabs);
    };
    
    useEffect(() => {
        fetchVocabs();
    }, []);

    useEffect(() => {
        if (vocabs) {
            setRandomAnswers(getRandomAnswers());
        }
    }, [vocabs, currentIndex]);

    const handleNext = () => {
        if (currentIndex === (vocabs ? vocabs.length - 1 : 0)) {
            setFinishedReview(true);
            // Thực hiện hàm callback sau 3 giây để thực hiện router.back()
            setTimeout(() => {
                router.back();
            }, 3000);
        } else {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % (vocabs ? vocabs.length : 0));
            setSelectedAnswer(''); // Reset selected answer when moving to the next question
            setIsCorrect(null); // Reset the correctness state
        }
        
    };

    const handleAnswerSelection = (answer: string) => {
        setSelectedAnswer(answer);
        // Check if the selected answer is correct
        if (vocabs && answer === vocabs[currentIndex]?.definition) {
            setIsCorrect(true);
            setTimeout(handleNext, 1500); // Dừng 1.5 giây trước khi gọi handleNext
        } else {
            setIsCorrect(false);
        }
    };

    const getRandomAnswers = () => {
        // Ensure vocabs is defined
        if (!vocabs) return [];
        // Get a random index different from currentIndex
        let randomIndex1 = Math.floor(Math.random() * vocabs.length);
        let randomIndex2 = Math.floor(Math.random() * vocabs.length);
        let randomIndex3 = Math.floor(Math.random() * vocabs.length);
        while (randomIndex1 === currentIndex || randomIndex2 === currentIndex || randomIndex3 === currentIndex || randomIndex1 === randomIndex2 || randomIndex1 === randomIndex3 || randomIndex2 === randomIndex3) {
            randomIndex1 = Math.floor(Math.random() * vocabs.length);
            randomIndex2 = Math.floor(Math.random() * vocabs.length);
            randomIndex3 = Math.floor(Math.random() * vocabs.length);
        }
        // Return the definitions of the randomly chosen vocabs
        return [vocabs[currentIndex].definition, vocabs[randomIndex1].definition, vocabs[randomIndex2].definition, vocabs[randomIndex3].definition].sort(() => Math.random() - 0.5);
    };

    if(finishedReview){
        return <View style={styles.finishedContainer}>
        <Text style={styles.finishedText}>You finished practice {vocabs?.length} word</Text>
        <TouchableOpacity style={styles.finishedButton} onPress={() => router.back()}>
            <Text style={styles.finishedButtonText}>Finished</Text>
        </TouchableOpacity>
    </View>
    }
    const handlePressBack=()=>{
        router.push("/(tabs)/bookmark");
    }
    return (
        <>
            {vocabs && (
                <SafeAreaView>
                    <TouchableOpacity style={{alignSelf:"flex-start"}} onPress={handlePressBack}><AntDesign name="arrowleft" size={30} color="black" /></TouchableOpacity>

                    <View style={styles.progressContainer}>
                        <ProgressBar progress={(currentIndex) /(vocabs.length+1)} color={'green'} style={{ height: 20, borderRadius: 20,width:280,borderWidth:1 }} />
                    </View>
                    <View>
                        <Text>{vocabs[currentIndex].word} lv:{currentIndex}</Text>
                    </View>
                    <View>
                        {randomAnswers.map((answer, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleAnswerSelection(answer)}
                                style={[
                                    styles.answer,
                                    selectedAnswer === answer && isCorrect !== null && (isCorrect ? styles.correctAnswer : styles.wrongAnswer),
                                ]}
                            >
                                <Text>{answer}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    
                </SafeAreaView>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    answer: {
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: 'black',
    },
    correctAnswer: {
        backgroundColor: 'lightgreen',
    },
    progressContainer:{
        flex:1,
        marginTop:15,
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