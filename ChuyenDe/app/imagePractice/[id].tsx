import { imageGame } from '@/model/image';
import { getVocabsInSet, vocab } from '@/model/word';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import useSWR from "swr";
const apiKey = 'NGvxJOgt1mEPidUdOGOh9lOTrmwoTizDjXo6dCU7jUtXYNpdWwjPuy3p';
const fetcher = async (url:string) => {
    const response = await fetch(url, {
        headers: {
            Authorization: apiKey
        }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  };
  
export default function ImagePractice() {
    const { id } = useLocalSearchParams();
    const [vocabs, setVocabs] = useState<vocab[] | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // Biến để lưu trạng thái của việc chọn đúng hay sai
    const [randomAnswers, setRandomAnswers] = useState<string[]>([]); // Biến để lưu trữ các đáp án ngẫu nhiên
    const [finishedReview, setFinishedReview] = useState(false);
    
    
    
    const qr="Dog";
    const [query, setQuery] = useState<string>();
    const [imageShow, setImageShow] = useState<string>();
    
    const fetchVocabs = async () => {
        const allVocabs = await getVocabsInSet(id as string);
        setVocabs(allVocabs);
        if (allVocabs && allVocabs.length > 0) {
            console.log(allVocabs[0].word);
            setQuery(allVocabs[0].word);
        }
        
    };
    const { data, isLoading,error } = useSWR<imageGame>(`https://api.pexels.com/v1/search?query=${query}&per_page=10`, fetcher);    

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

            
        } else {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % (vocabs ? vocabs.length : 0));
            setCurrentImageIndex(0);
            if(vocabs){
                setQuery(vocabs[currentIndex+1].word)
            }
            
            setSelectedAnswer(''); // Reset selected answer when moving to the next question
            setIsCorrect(null); // Reset the correctness state
        }
    };
    const handleNextImage = async () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (data ? data.photos.length : 0));
        if(data && data.photos.length>0){
            // setImageShow(`${data?.photos[currentImageIndex].src.medium}`);
        }
        // setShowDefinition(false); // Reset showDefinition khi chuyển sang từ tiếp theo
    };
    const handleAnswerSelection = (answer: string) => {
        setSelectedAnswer(answer);
        // Check if the selected answer is correct
        if (vocabs && answer === vocabs[currentIndex]?.word) {
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
        return [vocabs[currentIndex].word, vocabs[randomIndex1].word, vocabs[randomIndex2].word, vocabs[randomIndex3].word].sort(() => Math.random() - 0.5);
    };
    if(isLoading){
        <Text>Loading...</Text>
    }
    if(!data){
        <Text>Loading...</Text>
    }
    if(finishedReview){
        return <View style={styles.finishedContainer}>
        <Text style={styles.finishedText}>You finished practice {vocabs?.length} word</Text>
        <TouchableOpacity style={styles.finishedButton} onPress={() => router.back()}>
            <Text style={styles.finishedButtonText}>Finished</Text>
        </TouchableOpacity>
    </View>
    }
    return (
        <>
            {vocabs && (
                <SafeAreaView>
                    <View style={styles.progressContainer}>
                        <ProgressBar progress={(currentIndex) /(vocabs.length+1)} color={'green'} style={{ height: 20, borderRadius: 20,width:280,borderWidth:1 }} />
                    </View>
                    {data && data.photos && (
                        <View style={styles.imageContainer}>
                            <Text>{data?.photos[currentImageIndex].src.medium}</Text>
                            <Image
                                source={{uri: data.photos[currentImageIndex].src.medium}}
                                style={styles.image}
                                resizeMode="cover"
                            />
                            <TouchableOpacity onPress={handleNextImage}>Other image</TouchableOpacity>
                        </View>
                    )}

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
    container: {
        flex: 1,
    },
    imageContainer: {
        
        borderWidth: 3,
        borderColor: 'white',
        alignItems:"center",
        
      },
      image: {
        width: 250,
        height: 250,
      },
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