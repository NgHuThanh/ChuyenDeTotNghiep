import { getVocabsInSet, vocab } from "@/model/word";
import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Image, Button, TouchableOpacity, ViewStyle } from 'react-native';
import { ProgressBar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ImagePractice() {
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
                    <View >
                        <ProgressBar progress={currentVocabIndex / (vocabs ? vocabs.length : 1)} color={'green'} style={{ height: 20, borderRadius: 20,width:280,borderWidth:1 }} />
                    </View>
                   <View>
                    {vocabs[currentVocabIndex].word}
                   </View>
                   <View>
                   
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
   
});
