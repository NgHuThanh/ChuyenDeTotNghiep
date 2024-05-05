import { View } from "@/components/Themed";
import { Stack } from "expo-router";
import {Text} from "react-native";
const AuthLayout =()=>{
    return(
        <>
        <Stack>
            <Stack.Screen
                name="sign-in"
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen
                name="sign-up"
                options={{
                    headerShown:false
                }}
            />
        </Stack>
        </>
    );
}