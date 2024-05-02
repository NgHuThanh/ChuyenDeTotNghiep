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
export const addSet = async (newSet: SetModel) => {
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
const getSet = async (setName: string): Promise<SetModel | null> => {
    try {
        const existingSets = await AsyncStorage.getItem('sets');
        const sets: SetModel[] = existingSets ? JSON.parse(existingSets) : [];
        const set = sets.find(set => set.name === setName);
        return set || null;
    } catch (error) {
        console.error('Error getting set:', error);
        return null;
    }
};
export const getAllSets = async (): Promise<SetModel[] | null> => {
    try {
        const existingSets = await AsyncStorage.getItem('sets');
        const sets: SetModel[] = existingSets ? JSON.parse(existingSets) : [];
        return sets;
    } catch (error) {
        console.error('Error getting all sets:', error);
        return null;
    }
};
export const deleteSet = async (setName: string) => {
    try {
        const existingSets = await AsyncStorage.getItem('sets');
        let sets: SetModel[] = existingSets ? JSON.parse(existingSets) : [];
        sets = sets.filter(set => set.name !== setName);
        await AsyncStorage.setItem('sets', JSON.stringify(sets));
        console.log('Set deleted successfully!');
    } catch (error) {
        console.error('Error deleting set:', error);
    }
};