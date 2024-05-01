import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Searchbar } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
const url="https://api.dictionaryapi.dev/api/v2/entries/en/";
const Translate = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    return (
        <View style={{ padding: 10 }}>
            <Searchbar
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
            />
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.boldText}>Sample</Text>
                    <View style={styles.iconContainer}>
                        <Feather name="volume-2" size={24} color="#888" />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.textContainer}>
                        <Text style={styles.lightText}>pos</Text>
                        <Text style={styles.lightText}>/sample/</Text>
                    </View>
                </View>
                <Text style={styles.description}>
                    A facial expression comprised by flexing the muscles of both ends of one's mouth,
                    often showing the front teeth, without vocalisation, and in humans is a common
                    involuntary or voluntary expression of happiness, pleasure, amusement or anxiety.
                </Text>
                <View style={styles.infoBox}>
                    <Text style={styles.italicText}>
                        A facial expression comprised by flexing the muscles of both ends of one's mouth
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default Translate

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 28,
        color: '#410fa3',
    },
    iconContainer: {
        marginLeft: 10,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    lightText: {
        color: '#888',
        marginRight: 10,
    },
    description: {
        marginTop: 5,
    },
    infoBox: {
        marginTop: 10,
        padding: 10,
        paddingLeft: 10,
        borderLeftWidth: 8,
        borderLeftColor: '#410fa3',
        backgroundColor: '#D3D3D3',
    },
    italicText: {
        fontStyle: 'italic',
    },
})
