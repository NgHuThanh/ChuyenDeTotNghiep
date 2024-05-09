import { updatePracticeDays } from "@/model/practiceDay";
import { getVocabsInSet, vocab } from "@/model/word";
import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Image, Button, TouchableOpacity, ViewStyle } from 'react-native';
import { ProgressBar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Match() {
    const { id } = useLocalSearchParams();
    const [vocabs, setVocabs] = useState<vocab[] | null>(null);
    const [currentVocabIndex, setCurrentVocabIndex] = useState<number>(0);
    const [cLeft,setCLeft]=useState<string>("empty");
    const [cRight,setCRight]=useState<string>("empty");
    const [shuffled, setShuffled] = useState<boolean>(false);
    const [shuffelVL, setshuffelVL] = useState<vocab[] | null>(null);
    const [shuffelVR, setshuffelVR] = useState<vocab[] | null>(null);
    const [selectedLeftIndex, setSelectedLeftIndex] = useState<number | null>(null);
    const [selectedRightIndex, setSelectedRightIndex] = useState<number | null>(null);
    const [finishedReview, setFinishedReview] = useState(false);
    const fetchVocabs = async () => {
        const allVocabs = await getVocabsInSet(id as string);
        setVocabs(allVocabs);
        
    };
    const createShuffelVocabs = async () => {
        if (vocabs) {
            const clonedVocabs = [...vocabs]; // Tạo bản sao của mảng vocabs
            setshuffelVL(shuffle(clonedVocabs)); // Shuffle mảng clonedVocabs để set cho shuffelVL
            setshuffelVR(shuffle([...clonedVocabs])); // Shuffle một bản sao khác của clonedVocabs để set cho shuffelVR
        } else {
            console.log("Not found vocab");
        }
    };
    const deleteVocabByWord = (wordToDelete: string) => {
        if (shuffelVL && shuffelVR) {
            // Xóa vocab từ shuffelVL
            const updatedShuffelVL = shuffelVL.filter(vocab => vocab.word != wordToDelete);
            setshuffelVL(updatedShuffelVL);
            
            // Xóa vocab từ shuffelVR
            const updatedShuffelVR = shuffelVR.filter(vocab => vocab.word != wordToDelete);
            setshuffelVR(updatedShuffelVR);
            setCurrentVocabIndex(currentVocabIndex+1);
            if (currentVocabIndex === (vocabs ? vocabs.length - 1 : 0)) {
                setFinishedReview(true);
                
                // Thực hiện hàm callback sau 3 giây để thực hiện router.back()
                
            }
        }
    };
    useEffect(() => {
        fetchVocabs();
        
    }, []);
    useEffect(() => {
       
        createShuffelVocabs();
    }, [vocabs]);
    
    
    const checkRightChoice = (left:string) => {
        if (!vocabs || !cLeft || !cRight) {
            // Nếu một trong các giá trị là null hoặc undefined, trả về false
            return true;
        }
        // Tìm vocab có vocab.word bằng cLeft
        const selectedVocab = vocabs.find(vocab => vocab.word == left);
        
        // Nếu không tìm thấy vocab có vocab.word bằng cLeft, trả về false
        if (!selectedVocab) {
            return false;
        }
        setCLeft("empty");
                setCRight("empty");
        // So sánh vocab.definition của vocab tìm được với cRight
        return selectedVocab.definition == cRight;
    };
    const checkLeftChoice = (right:string) => {
        if (!vocabs || !cLeft || !cRight) {
            // Nếu một trong các giá trị là null hoặc undefined, trả về false
            return false;
        }
        // Tìm vocab có vocab.word bằng cLeft
        const selectedVocab = vocabs.find(vocab => vocab.word == cLeft);
        // Nếu không tìm thấy vocab có vocab.word bằng cLeft, trả về false
        if (!selectedVocab) {
            return false;
        }
        setCLeft("empty");
                setCRight("empty");
        // So sánh vocab.definition của vocab tìm được với cRight
        return selectedVocab.definition == right;
    };
    const handlePressLeft = (word: string, index: number) => {
        if (cRight !== "empty") {
            if (checkRightChoice(word)) {
                deleteVocabByWord(word);
                console.log("Correct match");
                setSelectedRightIndex(null);
                setSelectedLeftIndex(null);
            } else {
                console.log("Wrong match");
                setSelectedRightIndex(null);
                setSelectedLeftIndex(null);
            }
            setCLeft("empty");
            setCRight("empty");
        } else {
            setCLeft(word);
            setSelectedLeftIndex(index);
        }
    };
    const handlePressRight = (definition: string, index: number) => {
        if (cLeft !== "empty") {
            if (checkLeftChoice(definition)) {
                deleteVocabByWord(cLeft);
                console.log("Correct match");
                setSelectedLeftIndex(null);
                setSelectedRightIndex(null);
                
            } else {
                console.log("Wrong match");
                setSelectedLeftIndex(null);
                setSelectedRightIndex(null);
                
            }
            setCLeft("empty");
            setCRight("empty");
        } else {
            setCRight(definition);
            setSelectedRightIndex(index);
        }
    };
    
    const goToDestination = () => {
        updatePracticeDays({ times: vocabs?.length as number }); // Truyền số lần luyện tập cần cập nhật vào tham số `times`

        router.push(`/vocabSet/${id}`);
    };
    
    if(finishedReview){
        return <View style={styles.finishedContainer}>
        <Text style={styles.finishedText}>You finished practice {vocabs?.length} word</Text>
        <TouchableOpacity style={styles.finishedButton} onPress={goToDestination}>
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
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity style={{alignSelf:"flex-start"}} onPress={handlePressBack}><AntDesign name="arrowleft" size={30} color="black" /></TouchableOpacity>

                    <View style={styles.progressContainer}>
                    <ProgressBar
                        progress={currentVocabIndex / (vocabs ? vocabs.length : 1)}
                        color={'green'}
                        style={styles.progressBar}
                    />
                    </View>
                    <View style={styles.container2}>
                    <View style={styles.containerButton}><Text>Word:{cLeft}</Text></View>
                    <View style={styles.containerButton}><Text>Definition:{cRight}</Text></View>
                    </View>
                <ScrollView horizontal={false} contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.container}>
                        <View style={styles.containerButton}>
                            
                        {shuffelVL?.map((vocab,index) => (
                            <TouchableOpacity
                            key={index}
                            style={[
                                styles.buttonChoice,
                                selectedLeftIndex === index  ? { backgroundColor: 'gray' } : null
                            ]}
                            onPress={() => handlePressLeft(vocab.word, index)}
                        >
                            <Text style={styles.buttonText}>{vocab.word}</Text>
                        </TouchableOpacity>
                        ))}
                        </View>
                        <View style={styles.containerButton}>
                        
                        {shuffelVR?.map((vocab,index) => (
                            <TouchableOpacity
                            key={index}
                            style={[
                                styles.buttonChoice,
                                selectedRightIndex === index  ? { backgroundColor: 'gray' } : null
                            ]}
                            onPress={() => handlePressRight(vocab.definition, index)}
                        >
                            <Text style={styles.buttonText}>{vocab.definition}</Text>
                        </TouchableOpacity>
                        ))}    
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            
            )}
        </>
    );
}

const shuffle = (array:vocab[] | null) => {
    if (!array) {
        return []; // Trả về mảng trống nếu array là null
    }
    // Dùng phương pháp Fisher-Yates để shuffle mảng
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const styles = StyleSheet.create({
    progressContainer: {
        alignItems: 'center', // căn giữa theo trục dọc
        padding:10,
    },
    progressBar: {
        
        height:20,
        borderRadius: 20,
        borderWidth: 1,
        marginHorizontal: 10, // Khoảng cách giữa lề trái và lề phải
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding:20,
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
    container2: {
       
        flexDirection: 'row',
        
        alignItems: 'center',
        padding:20,
        borderBottomWidth:5,
        borderBottomColor:"#410fa3"
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    containerButton: {
        flex: 1,
        
    },
    buttonChoice: {
        maxWidth:150,
        backgroundColor: "#FFF",
        alignItems:"center",
        justifyContent:"center",
        borderLeftColor: "#410fa3",
        borderRadius: 10,
        borderColor: "black",
        borderWidth:1,
        borderLeftWidth:6,
        marginTop: 10,
        minHeight: 100,
    },
    buttonText: {
        fontWeight: 'bold', // In đậm chữ
        fontSize: 16, // Đổi size chữ
    },
});

