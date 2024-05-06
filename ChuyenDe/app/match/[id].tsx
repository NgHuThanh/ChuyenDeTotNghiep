import { getVocabsInSet, vocab } from "@/model/word";
import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Image, Button, TouchableOpacity, ViewStyle } from 'react-native';
import { ProgressBar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Match() {
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

    return (
        <>
            {vocabs && (
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.progressContainer}>
                    <ProgressBar
                        progress={currentVocabIndex / (vocabs ? vocabs.length : 1)}
                        color={'green'}
                        style={styles.progressBar}
                    />
                    </View>
                    <View style={styles.container}>
                    <View style={styles.containerButton}><Text>Word:</Text></View>
                    <View style={styles.containerButton}><Text>Definition:</Text></View>
                    </View>
                <ScrollView horizontal={false} contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.container}>
                        <View style={styles.containerButton}>
                            
                            {vocabs.map((vocab) => (
                                <TouchableOpacity style={styles.buttonChoice}>
                                    <Text style={styles.buttonText}>{vocab.word}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style={styles.containerButton}>
                        
                            {vocabs.map((vocab) => (
                                <TouchableOpacity style={styles.buttonChoice}>
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
    scrollViewContent: {
        flexGrow: 1,
    },
    containerButton: {
        flex: 1,
        alignContent:"center"
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

