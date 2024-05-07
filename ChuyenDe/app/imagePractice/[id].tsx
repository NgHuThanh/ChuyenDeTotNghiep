import { imageGame } from "@/model/image";
import { Word } from "@/model/searchEntity";
import { getVocabsInSet, vocab } from "@/model/word";
import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Image, Button, TouchableOpacity, ViewStyle } from 'react-native';
import { ProgressBar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
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
    const [currentVocabIndex, setCurrentVocabIndex] = useState<number>(0);
    const [showDefinition, setShowDefinition] = useState<boolean>(false);
    const qr="dog";
    const perPage = 10;
    const [query, setQuery] = useState<string>();
    const [imageShow, setImageShow] = useState<string>();
    const apiUrl = `https://api.pexels.com/v1/search?query=${qr}&per_page=10`;
    const { data, isLoading,error } = useSWR<imageGame>(apiUrl, fetcher);    
    const fetchVocabs = async () => {
        const allVocabs = await getVocabsInSet(id as string);
        setVocabs(allVocabs);
        if (allVocabs && allVocabs.length > 0) {
            setQuery("a "+allVocabs[currentVocabIndex].word+"thing");
        }
        if(data && data.photos.length>0){
            setImageShow(`${data.photos[0].src.medium}`);
        }
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
                   <View style={styles.imageContainer}>
                        <Image
                        source={{uri:data?.photos[0].src.medium}}
                        style={styles.image}
                        resizeMode="cover"
                        />
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
    imageContainer: {
        width: 50,
        height: 50,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 100,
        overflow: 'hidden',
      },
      image: {
        width: 50,
        height: 50,
      },
});
