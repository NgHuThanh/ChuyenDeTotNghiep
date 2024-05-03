import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView, View } from "react-native";
import UiComponent from "./uiComponent";

export default function SetDetail() {
    const {id}=useLocalSearchParams();
    return (<>
    <SafeAreaView style={{padding:10}}>
        <ScrollView>
            <UiComponent></UiComponent>
        </ScrollView>
    </SafeAreaView>
    </>);
}