
import { Stack } from "expo-router";
import {Text} from "react-native";
const QaaLayout =()=>{
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
export default QaaLayout;
