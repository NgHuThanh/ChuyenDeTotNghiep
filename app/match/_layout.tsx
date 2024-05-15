
import { Stack } from "expo-router";
import {Text} from "react-native";
const MatchLayout =()=>{
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
export default MatchLayout;
