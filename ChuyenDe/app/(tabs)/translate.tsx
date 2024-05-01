import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Searchbar } from 'react-native-paper';
const Translate = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    return (
        <View>
            <Searchbar
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
            />
        </View>
  )
}

export default Translate

const styles = StyleSheet.create({})