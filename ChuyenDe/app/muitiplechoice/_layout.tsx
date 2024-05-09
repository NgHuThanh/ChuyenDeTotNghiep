
import { Stack } from "expo-router";
import {Text} from "react-native";
const MultipleChoiceLayout =()=>{
    return(
        <>
        <Stack >
            <Stack.Screen
                name="[id]"
                options={{
                    headerShown:false
                }}
            />
            
        </Stack>
        </>
    );
}
export default MultipleChoiceLayout;
