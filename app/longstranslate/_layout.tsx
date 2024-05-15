
import { Stack } from "expo-router";
import {Text} from "react-native";
const LongStranslateLayout =()=>{
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
export default LongStranslateLayout;
