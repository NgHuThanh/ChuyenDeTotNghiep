import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView, View } from "react-native";
import UiComponent from "./uiComponent";
import { useEffect, useState } from "react";
import { contentAndQuestion, grammar } from "@/model/grammar";
import { getContentAndQuestionList, getGrammarById } from "../firebase/config";
import { Text } from 'react-native';
export default function SetDetail() {
    const {id}=useLocalSearchParams();
    const [grammar, setGrammars] = useState<grammar>();
    const [loading, setLoading] = useState(true);
    const [contentAndQuestions, setcontentAndQuestions] = useState<contentAndQuestion[]>([]);
    
    useEffect(() => {
        async function fetchData() {
          try {
            const grammarData = await getGrammarById({ grammarId: id as string });
            setGrammars(grammarData as grammar);
            const caqListData = await getContentAndQuestionList({idGrammar: id as string});
            setcontentAndQuestions(caqListData);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching product data: ", error);
          }
        }
        fetchData();
      }, []);
    return (<>
    
    <SafeAreaView style={{backgroundColor:"#364175",height:"100%",padding:10}}>
        <Text>{grammar?.title}</Text>
        <ScrollView>
        {contentAndQuestions.map((caq,index)=>(
            <UiComponent id={id as string} caq={caq}></UiComponent>
        ))}
        </ScrollView>
    </SafeAreaView>
    
    </>);
}