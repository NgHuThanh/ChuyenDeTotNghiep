import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const AvatarDetault = ({ src }: { src: string | undefined }) => {
    const localImageUrl = require('../../assets/images/book.png');
    return (
        <>
        <View style={styles.imageContainer}>
        <Image 
                source={src ? { uri: src } : localImageUrl} 
                style={styles.image} 
              />
          </View>
        </>
    )
}

export default AvatarDetault

const styles = StyleSheet.create({
    imageContainer: {
        overflow:"hidden",
        borderWidth: 2,
        borderColor: '#FFF',
        borderRadius: 100,
        alignItems:"center",
        marginRight:10,
        justifyContent:"center"
      },
      image: {
        width: 40,
        height: 40,
      },
})
