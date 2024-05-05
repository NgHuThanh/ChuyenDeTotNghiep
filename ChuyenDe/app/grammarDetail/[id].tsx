import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import UiComponent from "./uiComponent";
import { useEffect, useState } from "react";
import { contentAndQuestion, grammar } from "@/model/grammar";
import { getContentAndQuestionList, getGrammarById } from "../firebase/config";
import { Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function SetDetail() {
    const { id } = useLocalSearchParams();
    const [grammar, setGrammars] = useState<grammar>();
    const [loading, setLoading] = useState(true);
    const [contentAndQuestions, setcontentAndQuestions] = useState<contentAndQuestion[]>([]);
    const [reloadKey, setReloadKey] = useState(0); // Key dùng để reload component

    const handlePressComplete = async () => {
        try {
            // Lấy danh sách idGrammar từ AsyncStorage nếu đã tồn tại
            const existingIds = await AsyncStorage.getItem('idGrammars');
            let idGrammars = existingIds ? JSON.parse(existingIds) : []; // Chuyển đổi từ chuỗi JSON thành mảng, hoặc khởi tạo mảng mới nếu chưa có
    
            // Thêm id mới vào mảng idGrammar
            idGrammars.push(id);
    
            // Lưu mảng idGrammar mới vào AsyncStorage
            await AsyncStorage.setItem('idGrammars', JSON.stringify(idGrammars));
    
            // Chuyển hướng đến đường dẫn mới
            router.back();
        } catch (error) {
            console.error("Error saving idGrammar to AsyncStorage: ", error);
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const grammarData = await getGrammarById({ grammarId: id as string });
                setGrammars(grammarData as grammar);
                const caqListData = await getContentAndQuestionList({ idGrammar: id as string });
                setcontentAndQuestions(caqListData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product data: ", error);
            }
        }
        
        fetchData();
    }, [reloadKey]); // Trigger useEffect khi reloadKey thay đổi

    // Hàm để reload lại trang
    const reloadPage = () => {
        setReloadKey(prevKey => prevKey + 1); // Tăng giá trị key để trigger useEffect
    };
    if (loading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Loading...</Text>
          </View>
        );
      }
    return (
        <>
            <SafeAreaView style={{ backgroundColor: "#FFF", height: "100%", padding: 10 }}>
                <Text style={{ textAlign: "center", fontSize: 28, fontWeight: "bold", marginBottom: 10, color: "black" }}>{grammar?.title}</Text>
                <ScrollView>
                    {contentAndQuestions.map((caq, index, key) => (
                        <UiComponent key={index} id={id as string} caq={caq}></UiComponent>
                    ))}
                    <TouchableOpacity onPress={handlePressComplete} style={{ backgroundColor: 'green', borderRadius: 20, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                        <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Complete</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
