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
    source:string;
} 
// export const vocabConverter = {
//     toFirestore: (product: vocab) => {

//     }
// }
export const addSet = async (newSet: SetModel) => {
    try {
        const existingSets = await AsyncStorage.getItem('sets');
        let sets: SetModel[] = existingSets ? JSON.parse(existingSets) : [];

        // Kiểm tra xem đã có set có tên giống trong existingSets hay không
        const existingSetIndex = sets.findIndex(set => set.name === newSet.name);
        
        if (existingSetIndex === -1) {
            // Nếu không tìm thấy set có tên giống, thêm newSet vào mảng sets
            sets.push(newSet);
            await AsyncStorage.setItem('sets', JSON.stringify(sets));
            console.log('Set added successfully!');
        } else {
            console.log('Set with the same name already exists!');
        }
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
        
        // Tạo một biến để kiểm tra xem từ vựng mới có trùng với các từ vựng đã có hay không
        let isVocabUnique = true;
        
        // Duyệt qua tất cả các set
        sets.forEach((set) => {
            // Kiểm tra xem set có tên setName không và có vocabs không
            if (set.name === setName && set.vocabs) {
                // Duyệt qua tất cả các từ vựng trong set
                set.vocabs.forEach((vocab) => {
                    // Kiểm tra xem từ vựng mới có trùng với từ vựng đã có không
                    if (vocab.word === newVocab.word) {
                        isVocabUnique = false;
                    }
                });
            }
        });

        // Nếu từ vựng mới không trùng với bất kỳ từ vựng nào trong các set
        if (isVocabUnique) {
            const index = sets.findIndex(set => set.name === setName);
            if (index !== -1) {
                sets[index].vocabs?.push(newVocab);
                await AsyncStorage.setItem('sets', JSON.stringify(sets));
                console.log('Vocab added to set successfully!');
            } else {
                console.error('Set not found!');
            }
        } else {
            console.log('Vocab already exists in one of the sets!');
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
export const deleteVocab = async (setName: string, vocabWord: string) => {
    try {
        const existingSets = await AsyncStorage.getItem('sets');
        let sets: SetModel[] = existingSets ? JSON.parse(existingSets) : [];
        const setIndex = sets.findIndex(set => set.name === setName);
        if (setIndex !== -1) {
            sets[setIndex].vocabs = sets[setIndex].vocabs?.filter(vocab => vocab.word !== vocabWord);
            await AsyncStorage.setItem('sets', JSON.stringify(sets));
            console.log('Vocab deleted successfully!');
        } else {
            console.error('Set not found!');
        }
    } catch (error) {
        console.error('Error deleting vocab:', error);
    }
};
export const updateVocabFavorite = async (setName: string, vocabWord: string) => {
    try {
        let sets: SetModel[] = [];
        const existingSets = await AsyncStorage.getItem('sets');
        if (existingSets) {
            sets = JSON.parse(existingSets).map((set: SetModel) => {
                if (set.name === setName && set.vocabs) {
                    set.vocabs = set.vocabs.map((vocab: vocab) => {
                        if (vocab.word === vocabWord) {
                            vocab.favorite = !vocab.favorite;
                        }
                        return vocab;
                    });
                }
                return set;
            });
            await AsyncStorage.setItem('sets', JSON.stringify(sets));
            console.log('Vocab favorite status updated successfully!');
        }
    } catch (error) {
        console.error('Error updating vocab favorite status:', error);
    }
};
export const updateVocabDifficulty = async (setName: string, vocabWord: string, difficulty: string) => {
    try {
        let sets: SetModel[] = [];
        const existingSets = await AsyncStorage.getItem('sets');
        if (existingSets) {
            sets = JSON.parse(existingSets).map((set: SetModel) => {
                if (set.name === setName && set.vocabs) {
                    set.vocabs = set.vocabs.map((vocab: vocab) => {
                        if (vocab.word === vocabWord) {
                            vocab.difficult = difficulty;
                        }
                        return vocab;
                    });
                }
                return set;
            });
            await AsyncStorage.setItem('sets', JSON.stringify(sets));
            console.log('Vocab difficulty updated successfully!');
        }
    } catch (error) {
        console.error('Error updating vocab difficulty:', error);
    }
};
export const findVocabsWithLastPracticeBeforeNow = async (): Promise<vocab[]> => {
    try {
        const existingSets = await AsyncStorage.getItem('sets');
        const sets: SetModel[] = existingSets ? JSON.parse(existingSets) : [];

        const now = new Date();
        console.log(now.toString());
        const vocabsWithLastPracticeBeforeNow: vocab[] = [];

        sets.forEach((set: SetModel) => {
            if (set.vocabs) {
                set.vocabs.forEach((vocab: vocab) => {
                    const lastPracticeDate = new Date(vocab.lastPractice);
                    if (lastPracticeDate.getTime() < now.getTime()) {
                        vocabsWithLastPracticeBeforeNow.push(vocab);
                    }
                });
            }
        });

        return vocabsWithLastPracticeBeforeNow;
    } catch (error) {
        console.error('Error finding vocabs with last practice before now:', error);
        return [];
    }
};