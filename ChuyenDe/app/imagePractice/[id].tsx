import { imageGame } from '@/model/image';
import { getVocabsInSet, vocab } from '@/model/word';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import useSWR from "swr";
import { AntDesign, Feather } from '@expo/vector-icons';
import { updatePracticeDays } from '@/model/practiceDay';
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
        <Text style={{minHeight:200}}>Image not found</Text>
    )}
    <View style={styles.photographerContainer}>
        <Text style={styles.photographerText}>By: {data.photos[currentImageIndex]?.photographer}</Text>
    </View>
    <TouchableOpacity style={{ backgroundColor: "#410fa3", padding: 10, borderRadius: 10, alignItems: "center" }} onPress={handleNextImage}>
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
        position: 'absolute',
        bottom: 0,
        marginBottom:20,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Điều này giúp tạo một lớp nền cho containerBottom, giúp nó nổi bật và dễ nhận biết
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