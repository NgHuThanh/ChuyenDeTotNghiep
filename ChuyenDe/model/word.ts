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
export const addVocabToSet = async (setName: string, newVocab: vocab) => {
    try {
        const existingSets = await AsyncStorage.getItem('sets');
        let sets: SetModel[] = existingSets ? JSON.parse(existingSets) : [];
        const index = sets.findIndex(set => set.name === setName);
        if (index !== -1) {
            sets[index].vocabs?.push(newVocab);
            await AsyncStorage.setItem('sets', JSON.stringify(sets));
            console.log('Vocab added to set successfully!');
        } else {
            console.error('Set not found!');
        }
    } catch (error) {
        console.error('Error adding vocab to set:', error);
    }
};
export const getVocabsInSet = async (setName: string): Promise<vocab[] | null> => {
    try {
        const existingSets = await AsyncStorage.getItem('sets');
        const sets: SetModel[] = existingSets ? JSON.parse(existingSets) : [];
        const set = sets.find(set => set.name === setName);
        return set ? set.vocabs || [] : null;
    } catch (error) {
        console.error('Error getting vocabs in set:', error);
        return null;
    }
};
