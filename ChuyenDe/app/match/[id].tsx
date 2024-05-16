import { getVocabsInSet, vocab } from "@/model/word";
import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Image, Button, TouchableOpacity, ViewStyle } from 'react-native';
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
                <SafeAreaView>
                    <Text>{vocabs[currentVocabIndex].word}</Text>
                    {showDefinition && (
                        <Text>Definition: {vocabs[currentVocabIndex].definition}</Text>
                    )}
                    <TouchableOpacity onPress={handleToggleDefinition}>
                        <Text>{showDefinition ? 'Hide' : 'Show'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleNext}>
                        <Text>Next</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Text>Back</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
   
});
