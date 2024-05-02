import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Searchbar } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import useSWR from 'swr';
import { Word } from '@/model/searchEntity';
import playSound from '@/component/sound';
import { router } from 'expo-router';
const fetcher = async (url:string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  };
const url="https://api.dictionaryapi.dev/api/v2/entries/en/";
const Translate = () => {
    const [query, setQuery] = useState("hello");
    const { data, isLoading,error } = useSWR<Word[]>(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`, fetcher);
    const [searchQuery, setSearchQuery] = React.useState('');
    const handlePress = () => {
        if(searchQuery!=null)
            if(searchQuery!==query){
                setQuery(searchQuery);
            }
        
    }
    const handlePress2 = () => {
        router.push("/longstranslate/");
        
    }
    if (isLoading) {
        return <View><View style={{ padding: 10 }}>
        <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
        />
        <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.7}>
            <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        
        <Text>Loading...</Text>
        </View>
        </View>;
    }
    if (error) {
        return <View><View style={{ padding: 10 }}>
        <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
        />
        <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.7}>
            <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <Text>No result</Text>
        </View>
        </View>;
      }
      if (!data) {
        return <View>
            <View style={{ padding: 10 }}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                />
                <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.7}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
                </View>
            </View>;
        }
    return (
        <View style={{ padding: 10 }}>
            <Searchbar
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
            />
            <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.7}>
                <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handlePress2} activeOpacity={0.7}>
            <Text style={styles.buttonText}>Search long text</Text>
        </TouchableOpacity>
            <ScrollView>
            {data.map((word, index,key) => (
                <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.boldText}>{word.word}</Text>
                    <TouchableOpacity style={styles.iconContainer} onPress={()=>playSound(word.phonetics[0].audio)}>
                        <Feather name="volume-2" size={24} color="#888" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.lightText}>{word.phonetics[0].text}</Text>
                {word.meanings.map((meaning,key)=>(
                    <>
                    <View style={styles.row}>
                        <View style={styles.textContainer}>
                            <Text style={styles.lightText}>{meaning.partOfSpeech}</Text>
                        </View>
                    </View>
                    {meaning.definitions.map((definition, index,key) => (
                        <View key={index}>
                            <Text style={styles.description}>
                                -{definition.definition}
                            </Text>
                            {definition.example && (
                                <View style={styles.infoBox}>
                                    <Text style={styles.italicText}>
                                        {definition.example}
                                    </Text>
                                </View>
                            )}
                        </View>
                    ))}

                    
                    </>
                
                ))}
                
                
                
            </View>
            ))}
            </ScrollView>
            
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
        marginTop: 30,
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
    button: {
        
        backgroundColor: '#410fa3', // Màu nền của button
        borderRadius: 8, // Bo góc của button
        height: 50, // Chiều cao của button
        justifyContent: 'center', // Căn chỉnh theo chiều dọc
        alignItems: 'center', // Căn chỉnh theo chiều ngang
        
      },
      buttonText: {
        color: 'white',
        fontWeight:"bold", // Màu chữ của button
        fontSize: 18, // Kích thước chữ của button
      },
})
