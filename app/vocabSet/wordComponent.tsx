import { StyleSheet, Text, TouchableOpacity, View, Image, ViewStyle } from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SetModel, deleteSet, deleteVocab, updateVocab, updateVocabFavorite, vocab } from '@/model/word';
import { router } from 'expo-router';
import Tts from 'react-native-tts';
import { speak } from '../textToSpech';
import { format } from 'date-fns';
import Speak from '@/component/Speech';
import { Modal, Portal, TextInput } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const WordComponent = (props: { nameSet: string, vocab: vocab, fetchVocabs: () => void }) => {
    const localImageUrl = require('../../assets/images/book.png');
    const [exist, setExist] = useState(true);
    const [fav, setFav] = useState<boolean>(props.vocab.favorite);
    const formattedDate = format(props.vocab.lastPractice, 'dd/MM/yyyy');
    const [visible3, setVisible3] = React.useState(false);
    const [visible2, setVisible2] = React.useState(false);
    const [form, setForm] = useState({
        word: props.vocab.word,
        definition: props.vocab.definition,
        difficult: props.vocab.difficult,
    });

    const handleDeletePress = async () => {
        try {
            await deleteVocab(props.nameSet, props.vocab.word);
            await props.fetchVocabs();
        } catch (error) {
            console.error('Error deleting set:', error);
        }
    };

    const getBorderColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy':
                return 'green';
            case 'good':
                return 'orange';
            case 'hard':
                return 'red';
            case 'skip':
                return 'gray';
            default:
                return '#410fa3';
        }
    };

    if (!exist) {
        return null;
    }

    const handleFavoritePress = () => {
        updateVocabFavorite(props.nameSet, props.vocab.word);
        props.vocab.favorite = !props.vocab.favorite;
        setFav(props.vocab.favorite);
    };

    const DeleteConfirm = () => {
        setVisible3(true);
    };

    const UpdateConfirm = () => {
        setVisible2(true);
    };

    const hideModal3 = () => {
        setVisible3(false);
    };

    const hideModal2 = () => {
        setVisible2(false);
    };

    const containerStyle: ViewStyle = {
        backgroundColor: 'white',
        padding: 10,
        minHeight: "25%",
        maxHeight: "50%",
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        alignItems: "center",
    };

    const handleUpdateWord = async () => {
        try {
            await updateVocab(props.nameSet, props.vocab.word, form.word, form.definition, form.difficult);
            await props.fetchVocabs();
            hideModal2();
        } catch (error) {
            console.error('Error deleting set:', error);
        }
    };

    return (
        <GestureHandlerRootView>
            <TouchableOpacity style={[styles.container, { borderLeftColor: getBorderColor(props.vocab.difficult) }]}>
                <View style={styles.infoContainer2}>
                    <TouchableOpacity onPress={handleFavoritePress}>
                        {fav ? (
                            <AntDesign name="heart" size={24} color="red" />
                        ) : (
                            <AntDesign name="hearto" size={24} color="black" />
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.infoContainer}>
                    
                    <Text style={styles.boldText}>{props.vocab.word}</Text>
                    <Text style={styles.secondaryText}>{props.vocab.definition}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Speak thingToSay={props.vocab.word}></Speak>
                            {props.vocab.difficult !== 'skip' && (
                                <>
                                    <Text style={{ paddingRight: 0,left:80 }}><AntDesign name="calendar" size={24} color="black" />{formattedDate}</Text>
                                </>
                            )}
                        </View>
                        <View style={{ flex: 1 }}></View>
                    </View>
                </View>


                <View style={styles.imageContainer}>
                    <View style={styles.container3}>
                        <TouchableOpacity activeOpacity={0.7} style={{ marginRight: 10 }} onPress={UpdateConfirm}>
                            <Feather name="edit" size={30} color="black" />
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.7} onPress={DeleteConfirm}>
                            <MaterialIcons name="delete" size={30} color="red" />
                        </TouchableOpacity>
                    </View>
                </View>

                <Portal>
                    <Modal visible={visible3} onDismiss={hideModal3} contentContainerStyle={containerStyle}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.boldText}>Are you sure want to delete {props.vocab.word}?</Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} activeOpacity={0.7}>
                                    <Text style={styles.buttonText} onPress={handleDeletePress}>Delete</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.buttonText} onPress={hideModal3}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </Portal>

                <Portal>
                    <Modal visible={visible2} onDismiss={hideModal2} contentContainerStyle={containerStyle}>
                        <View style={styles.container2}>
                            <View>
                                <Text style={styles.title}>Update vocabulary</Text>
                            </View>
                            <TextInput
                                label="Input word"
                                mode="outlined"
                                textColor="black"
                                value={form.word}
                                onChangeText={(text) => setForm({ ...form, word: text })}
                                theme={{ colors: { background: '#FFF' } }}
                                style={[styles.textInput, { color: 'black' }]}
                            />
                            <TextInput
                                label="Input definition"
                                mode="outlined"
                                textColor="black"
                                value={form.definition}
                                onChangeText={(text) => setForm({ ...form, definition: text })}
                                theme={{ colors: { background: '#FFF' } }}
                                style={[styles.textInput, { color: 'black' }]}
                            />
                            <TouchableOpacity style={styles.button2} activeOpacity={0.7} onPress={handleUpdateWord}>
                                <Text style={styles.buttonText}>Update</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </Portal>
            </TouchableOpacity>
        </GestureHandlerRootView>
    );
}

export default WordComponent;

const styles = StyleSheet.create({
    container2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        minHeight: 200,
    },
    container: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 10,
        paddingLeft: 20,
        paddingTop: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        borderLeftWidth: 5,
        borderLeftColor: '#410fa3', // This will be dynamically set
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        margin: 20,
        textAlign: 'center',
    },
    container3: {
        flexDirection: 'row',
        marginRight: 0,
        overflow: 'hidden',
    },
    textInput: {
        width: '100%',
        minWidth: 200,
        backgroundColor: '#FFF',
        color: 'black',
        marginBottom: 10,
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    infoContainer: {
        flex: 3,
        padding: 10,
        justifyContent: "center",
    },
    infoContainer2: {
        width: 30,
        padding: 0,
        justifyContent: "center",
        bottom: 10,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#1e2636',
    },
    secondaryText: {
        color: '#888',
    },
    percentText: {
        marginBottom: 20,
        color: 'green',
    },
    button: {
        backgroundColor: '#5b7bfe',
        borderRadius: 8,
        padding: 10,
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button2: {
        backgroundColor: '#5b7bfe',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: "bold",
        fontSize: 16,
    },
});
