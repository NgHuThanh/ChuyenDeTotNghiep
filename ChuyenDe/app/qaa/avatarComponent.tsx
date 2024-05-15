import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const AvatarDetault = () => {
    const localImageUrl = require('../../assets/images/defaultAvatat.png');
    return (
        <>
        <View style={styles.imageContainer}>
        <AntDesign name="aliwangwang" size={24} color="#410fa3" />
          </View>
        </>
    )
}

export default AvatarDetault

const styles = StyleSheet.create({
    imageContainer: {
        width: 40,
        height: 40,
        borderWidth: 3,
        borderColor: '#410fa3',
        borderRadius: 100,
        alignItems:"center",
        marginRight:10,
        justifyContent:"center"
      },
      image: {
        width: 50,
        height: 50,
      },
})
