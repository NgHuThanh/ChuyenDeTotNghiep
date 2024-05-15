
import { Stack } from "expo-router";
import {Text} from "react-native";
const GrammarLayout =()=>{
    return(
        <>
        <Stack >
            <Stack.Screen
                name="index"
                options={{
                    headerShown:false
                }}
            />
            
        </Stack>
        </>
    );
}
export default GrammarLayout;
