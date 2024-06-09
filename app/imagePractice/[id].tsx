import { imageGame } from '@/model/image';
import { SetModel, getVocabsInSet, vocab } from '@/model/word';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import useSWR from "swr";
import { AntDesign, Feather } from '@expo/vector-icons';
import { updatePracticeDays } from '@/model/practiceDay';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // Biến sđể lưu trạng thái của việc chọn đúng hay sai
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
            getRandomAnswers().then(answers => setRandomAnswers(answers));
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
        if (vocabs && answer === vocabs[currentIndex]?.definition) {
            setIsCorrect(true);
            handleUpdateDifficulty();
            setTimeout(handleNext, 1500);
        } else {
            setIsCorrect(false);
        }
    };
    const handleUpdateDifficulty = async () => {
        const time = await AsyncStorage.getItem('imagepractice');
        if (vocabs && vocabs[currentIndex]) {
            const vocabWord = vocabs[currentIndex].word;
            const setName = vocabs[currentIndex].source; // Thay thế bằng tên của set của bạn
            try {
                let sets: SetModel[] = [];
                const existingSets = await AsyncStorage.getItem('sets');
                if (existingSets) {
                    sets = JSON.parse(existingSets).map((set: SetModel) => {
                        if (set.name === setName && set.vocabs) {
                            set.vocabs = set.vocabs.map((vocab: vocab) => {
                                if (vocab.word === vocabWord) {
                                    
                                    // Cập nhật ngày lastPractice
                                    const today = new Date();
                                    let daysToAdd = 0;
                                    
                                        daysToAdd = time ? parseInt(time) : 7
                                    
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
        
    };
    const getRandomAnswers = async (): Promise<string[]> => {
        if (!vocabs) return [];
        const multioption = await AsyncStorage.getItem('imageoption');
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
    if(isLoading){
        <Text>Loading...</Text>
    }
    if(!data){
        <Text>Loading...</Text>
    }
    const handleFinish = () => {
        updatePracticeDays({ times: vocabs?.length as number }); // Truyền số lần luyện tập cần cập nhật vào tham số `times`
        router.push("/(tabs)/bookmark");
    }
    if(finishedReview){
        return <View style={styles.finishedContainer}>
        <Text style={styles.finishedText}>You finished practice {vocabs?.length} word</Text>
        <TouchableOpacity style={styles.finishedButton} onPress={handleFinish}>
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
                <View style={{flex: 1}}>
                <SafeAreaView style={{alignItems:"center",flex:1}}>
                <TouchableOpacity style={{alignSelf:"flex-start"}} onPress={handlePressBack}><AntDesign name="arrowleft" size={30} color="black" /></TouchableOpacity>

                    <View style={[styles.progressContainer]}>
                        <ProgressBar progress={(currentIndex) / (vocabs.length)} color={'green'} style={{ height: 20, borderRadius: 20, width: 280, borderWidth: 1 }} />
                    </View>
                    <View style={{maxHeight:300,minHeight:300,marginBottom:10}}>
                    {data && data.photos && (
                        <View style={styles.imageContainer}>
                         {data && data.photos && data.photos[currentImageIndex] && data.photos[currentImageIndex].src ? (
        <Image
            source={{ uri: data.photos[currentImageIndex].src.medium }}
            style={styles.image}
            resizeMode="stretch"
        />
    ) : (
        <Text style={{minHeight:200,marginTop:50}}>Image not found</Text>
    )}
    <View style={styles.photographerContainer}>
        <Text style={styles.photographerText}>By: {data.photos[currentImageIndex]?.photographer}</Text>
    </View>
    <TouchableOpacity style={{marginTop:5, backgroundColor: "#410fa3", padding: 10, borderRadius: 10, alignItems: "center" }} onPress={handleNextImage}>
        <Feather name="refresh-ccw" size={18} color="#FFF" />
    </TouchableOpacity>
    <Text style={{ fontWeight: "bold", fontSize: 20 }}>What's it?</Text>
                    </View>
                    )}
                    {data==null&& (
                        <View style={styles.imageContainer}>
                            <Text style={{minHeight:250}}>Loading</Text>
                            <TouchableOpacity style={{ backgroundColor: "#410fa3", padding: 10, borderRadius: 10, alignItems: "center",marginBottom:10 }} onPress={handleNextImage}>
                                <Feather name="refresh-ccw" size={18} color="#FFF" />
                            </TouchableOpacity>
                            <Text>What's it?</Text>
                        </View>
                    )}
                    </View>
                    
                    
                    <View style={styles.containerBottom}>
                        <View style={[styles.answerContainer]}>
                            {randomAnswers.map((answer, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => handleAnswerSelection(answer)}
                                    style={[
                                        styles.answer,
                                        selectedAnswer === answer && isCorrect !== null && (isCorrect ? styles.correctAnswer : styles.wrongAnswer),
                                    ]}
                                >
                                    <Text style={styles.text}>{answer}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                   
                    
                </SafeAreaView>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerBottom: {
        marginTop:10,
        height:200,
        marginBottom:20,
        width: '100%',
        paddingHorizontal: 10, // Điều chỉnh khoảng cách giữa các phần tử bên trong containerBottom
    },
    answerContainer: {
        flex:1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    photographerContainer: {
        position: 'absolute',
        top:0, // Điều chỉnh vị trí bên dưới ảnh
        left: 0,
        right:0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền
        paddingHorizontal: 10, // Khoảng cách lề ngang
        paddingVertical: 5, // Khoảng cách lề dọc
        alignItems: 'center', // Căn giữa theo chiều ngang
        borderRadius:10,
    },
    
    photographerText: {
        color: '#FFF', // Màu văn bản
        fontWeight: 'bold',
    },
    text:{
        color:"#FFF",
        fontWeight:"bold",
        fontSize:18,
    },
    answer: {
        width: '48%', // 48% để cách nhau một ít, bạn có thể điều chỉnh tùy ý
        padding: 10,
        marginVertical: 5,
        
        backgroundColor:"#410fa3",
        color:"#FFF",
        borderRadius:10,
        textAlign:"center",
        },
    imageContainer: {
        minWidth:250,
        minHeight:300,
        
        
        
        
        
        alignItems:"center",
        
      },
      image: {
        width: 250,
        height: 250,
        borderRadius:10,
    },
    
    correctAnswer: {
        backgroundColor: 'lightgreen',
    },
    progressContainer: {
        alignItems: 'center', // căn giữa theo trục dọc
        padding:10,
        
    },
    
    wrongAnswer: {
        backgroundColor: 'lightcoral',
    },
    finishedContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80,
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