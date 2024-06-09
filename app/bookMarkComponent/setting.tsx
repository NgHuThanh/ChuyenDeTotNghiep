import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Menu, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { SetModel, addSet } from '../../model/word';

const SettingComponent = (props: { fetchSets: () => void }) => {
    const [text, setText] = useState("");
    const theme = useTheme();
    const [visibleOrder1, setVisibleOrder1] = useState(false);
    const [visibleOrder2, setVisibleOrder2] = useState(false);
    const [visibleOrder3, setVisibleOrder3] = useState(false);
    const [visibleOrderMul, setVisibleOrderMul] = useState(false);
    const [visibleOrderMulTime, setVisibleOrderMulTime] = useState(false);
    const [visibleOrderIG, setVisibleOrderIG] = useState(false);
    const [visibleOrderIGTime, setVisibleOrderIGTime] = useState(false);
    const [visibleOrderMatch, setVisibleOrderMatch] = useState(false);
    const [checked, setChecked] = useState(false);
    const [easyDays, setEasyDays] = useState("3");
    const [goodDays, setGoodDays] = useState("5");
    const [hardDays, setHardDays] = useState("10");
    const [multiOption, setMultiOption] = useState("4");
    const [multiPractice, setMultiPractice] = useState("4");
    const [imageOption, setImageOption] = useState("4");
    const [imagePractice, setImagePractice] = useState("7");
    const [matchPractice, setMatchPractice] = useState("7");

    useEffect(() => {
        const loadSettings = async () => {
            const easy = await AsyncStorage.getItem('easy');
            const good = await AsyncStorage.getItem('good');
            const hard = await AsyncStorage.getItem('hard');
            const multiOpt = await AsyncStorage.getItem('multioption');
            const multiPrac = await AsyncStorage.getItem('mulpractice');
            const imageOpt = await AsyncStorage.getItem('imageoption');
            const imagePrac = await AsyncStorage.getItem('imagepractice');
            const matchPrac = await AsyncStorage.getItem('matchpractice');
            const showDef = await AsyncStorage.getItem('showDef');

            setEasyDays(easy || "5");
            setGoodDays(good || "5");
            setHardDays(hard || "5");
            setMultiOption(multiOpt || "4");
            setMultiPractice(multiPrac || "4");
            setImageOption(imageOpt || "4");
            setImagePractice(imagePrac || "4");
            setMatchPractice(matchPrac || "4");
            setChecked(showDef === "true");
        };
        loadSettings();
    }, []);

    const handleMenuItemSelect = async (key: string, value: string, setFunction: { (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (arg0: any): void; }) => {
        await AsyncStorage.setItem(key, value);
        setFunction(value);
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.maintitle}>Setting</Text>
                <ScrollView>
                    <View>
                        <Text style={styles.main}>Basic review</Text>
                        <Text style={styles.title}>Set practice time:</Text>
                        <View style={styles.row}>
                            <Text style={styles.title}>Easy</Text>
                            <Menu
                                visible={visibleOrder1}
                                onDismiss={() => setVisibleOrder1(false)}
                                anchor={<Button style={styles.button1} onPress={() => setVisibleOrder1(true)}>{easyDays} days</Button>}
                            >
                                {["1", "2", "3", "5", "7", "10", "14"].map((item) => (
                                    <Menu.Item
                                        key={item}
                                        title={item}
                                        onPress={() => {
                                            handleMenuItemSelect('easy', item, setEasyDays);
                                            setVisibleOrder1(false);
                                        }}
                                    />
                                ))}
                            </Menu>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.title}>Good</Text>
                            <Menu
                                visible={visibleOrder2}
                                onDismiss={() => setVisibleOrder2(false)}
                                anchor={<Button style={styles.button1} onPress={() => setVisibleOrder2(true)}>{goodDays} days</Button>}
                            >
                                {["1", "2", "3", "5", "7", "10", "14"].map((item) => (
                                    <Menu.Item
                                        key={item}
                                        title={item}
                                        onPress={() => {
                                            handleMenuItemSelect('good', item, setGoodDays);
                                            setVisibleOrder2(false);
                                        }}
                                    />
                                ))}
                            </Menu>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.title}>Hard</Text>
                            <Menu
                                visible={visibleOrder3}
                                onDismiss={() => setVisibleOrder3(false)}
                                anchor={<Button style={styles.button1} onPress={() => setVisibleOrder3(true)}>{hardDays} days</Button>}
                            >
                                {["1", "2", "3", "5", "7", "10", "14"].map((item) => (
                                    <Menu.Item
                                        key={item}
                                        title={item}
                                        onPress={() => {
                                            handleMenuItemSelect('hard', item, setHardDays);
                                            setVisibleOrder3(false);
                                        }}
                                    />
                                ))}
                            </Menu>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.title}>Show definition instead word</Text>
                            <Checkbox
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked(!checked);
                                    AsyncStorage.setItem('showDef', (!checked).toString());
                                }}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.main}>Multiple choices</Text>
                        <View style={styles.row}>
                            <Text style={styles.title}>Quantity option</Text>
                            <Menu
                                visible={visibleOrderMul}
                                onDismiss={() => setVisibleOrderMul(false)}
                                anchor={<Button style={styles.button1} onPress={() => setVisibleOrderMul(true)}>{multiOption} options</Button>}
                            >
                                {["2", "3", "4", "5", "6", "7", "8"].map((item) => (
                                    <Menu.Item
                                        key={item}
                                        title={item}
                                        onPress={() => {
                                            handleMenuItemSelect('multioption', item, setMultiOption);
                                            setVisibleOrderMul(false);
                                        }}
                                    />
                                ))}
                            </Menu>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.title}>Set practice time</Text>
                            <Menu
                                visible={visibleOrderMulTime}
                                onDismiss={() => setVisibleOrderMulTime(false)}
                                anchor={<Button style={styles.button1} onPress={() => setVisibleOrderMulTime(true)}>{multiPractice} days</Button>}
                            >
                                {["1", "2", "3", "5", "7", "10", "14"].map((item) => (
                                    <Menu.Item
                                        key={item}
                                        title={item}
                                        onPress={() => {
                                            handleMenuItemSelect('mulpractice', item, setMultiPractice);
                                            setVisibleOrderMulTime(false);
                                        }}
                                    />
                                ))}
                            </Menu>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.main}>Match</Text>
                        <View style={styles.row}>
                            <Text style={styles.title}>Set practice time</Text>
                            <Menu
                                visible={visibleOrderMatch}
                                onDismiss={() => setVisibleOrderMatch(false)}
                                anchor={<Button style={styles.button1} onPress={() => setVisibleOrderMatch(true)}>{matchPractice} days</Button>}
                            >
                                {["1", "2", "3", "5", "7", "10", "14"].map((item) => (
                                    <Menu.Item
                                        key={item}
                                        title={item}
                                        onPress={() => {
                                            handleMenuItemSelect('matchpractice', item, setMatchPractice);
                                            setVisibleOrderMatch(false);
                                        }}
                                    />
                                ))}
                            </Menu>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.main}>Image guess</Text>
                        <View style={styles.row}>
                            <Text style={styles.title}>Quantity option</Text>
                            <Menu
                                visible={visibleOrderIG}
                                onDismiss={() => setVisibleOrderIG(false)}
                                anchor={<Button style={styles.button1} onPress={() => setVisibleOrderIG(true)}>{imageOption} options</Button>}
                            >
                                {["2", "4", "6", "8"].map((item) => (
                                    <Menu.Item
                                        key={item}
                                        title={item}
                                        onPress={() => {
                                            handleMenuItemSelect('imageoption', item, setImageOption);
                                            setVisibleOrderIG(false);
                                        }}
                                    />
                                ))}
                            </Menu>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.title}>Set practice time</Text>
                            <Menu
                                visible={visibleOrderIGTime}
                                onDismiss={() => setVisibleOrderIGTime(false)}
                                anchor={<Button style={styles.button1} onPress={() => setVisibleOrderIGTime(true)}>{imagePractice} days</Button>}
                            >
                                {["1", "2", "3", "5", "7", "10", "14"].map((item) => (
                                    <Menu.Item
                                        key={item}
                                        title={item}
                                        onPress={() => {
                                            handleMenuItemSelect('imagepractice', item, setImagePractice);
                                            setVisibleOrderIGTime(false);
                                        }}
                                    />
                                ))}
                            </Menu>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default SettingComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        borderRadius: 10,
        width: "100%",
        height: "100%",
    },
    maintitle: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    main: {
        fontSize: 16,
        fontWeight: "bold",
        marginRight: 10,
        color: "blue",
    },
    textInput: {
        width: '100%',
        color: 'black',
    },
    button: {
        backgroundColor: '#410fa3',
        borderRadius: 8,
        height: 50,
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    button1: {
        backgroundColor: '#410fa3',
        borderRadius: 0,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
