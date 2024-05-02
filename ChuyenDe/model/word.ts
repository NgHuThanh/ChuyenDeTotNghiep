import AsyncStorage from '@react-native-async-storage/async-storage';
export interface SetModel {
    vocabs?: vocab[];
    create: Date;
    name: string;
}
export interface vocab{
    word:string;
    definition:string;
    lastPractice:Date;
    difficult:string;
    favorite:boolean;
} 
const addSet = async (newSet: SetModel) => {
    try {
        const existingSets = await AsyncStorage.getItem('sets');
        let sets: SetModel[] = existingSets ? JSON.parse(existingSets) : [];
        sets.push(newSet);
        await AsyncStorage.setItem('sets', JSON.stringify(sets));
        console.log('Set added successfully!');
    } catch (error) {
        console.error('Error adding set:', error);
    }
};