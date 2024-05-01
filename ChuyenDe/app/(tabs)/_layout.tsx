import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
const TabIcon = (props:{name:string,focused:boolean}) =>{
    let iconName="none";
    let color="#6d99ff"
    // Determine which icon to display based on the route name
    if (props.name === 'home') {
        if(props.focused==false){
            return <Octicons name="home" size={22} color={color} />
        }
        else {
            return <MaterialCommunityIcons name="home-variant" size={24} color={color} />
        }
    }
    if (props.name === 'person') {
        if(props.focused==false){
            return <Ionicons name="person-outline" size={24} color={color} />
        }
        else {
            return <Ionicons name="person-sharp" size={24} color={color} />
        }
    }
    if (props.name === 'bookmark') {
        if(props.focused==false){
            return <Feather name="book" size={24} color={color} />
        }
        else {
            return <FontAwesome5 name="book-open" size={24} color={color} />
        }
    }
}
const TabsLayout = () => {
  return (
    <>
        <Tabs>
            <Tabs.Screen
            name="home"
            options={{
                title:'Home',
                headerShown:false,
                tabBarIcon:({color,focused})=>(
                    <TabIcon name={"home"}
                    focused={focused}/>
                )
            }}  
            />
            <Tabs.Screen
            name="profile"
            options={{
                title:'Profile',
                headerShown:false,
                tabBarIcon:({color,focused})=>(
                    <TabIcon name={"person"}
                    focused={focused}/>
                )
            }}  
            />
            <Tabs.Screen
            name="bookmark"
            options={{
                title:'Book Mark',
                headerShown:false,
                tabBarIcon:({color,focused})=>(
                    <TabIcon name={"bookmark"}
                    focused={focused}/>
                )
            }}  
            />
        </Tabs>
    </>
  )
}

export default TabsLayout

const styles = StyleSheet.create({})