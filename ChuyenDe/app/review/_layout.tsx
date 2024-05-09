
import { Stack } from "expo-router";
import {Text} from "react-native";
const ReviewLayout =()=>{
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
export default ReviewLayout;
