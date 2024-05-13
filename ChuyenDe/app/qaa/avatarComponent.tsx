import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
const AvatarDetault = () => {
    const localImageUrl = require('../../assets/images/defaultAvatat.png');
    return (
        <>
        <View style={styles.imageContainer}>
            <Image
              source={localImageUrl}
              style={styles.image}
              resizeMode="cover"
            />
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
        borderColor: 'white',
        borderRadius: 100,
        overflow: 'hidden',
        marginRight:10,
      },
      image: {
        width: 50,
        height: 50,
      },
})
