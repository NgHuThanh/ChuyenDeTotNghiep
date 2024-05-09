import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';
import { addDocument } from '../firebase/config';
import { findVocabsWithLastPracticeBeforeNow } from '@/model/word';
import { router } from 'expo-router';
import PracticeDay, { getTodayPracticeDay } from '@/model/practiceDay';

const PracticeCourse = () => {
    const [vocabCount, setVocabCount] = useState(0); 
       const [practiced,setPracticed]=useState<PracticeDay[]>([]); 
        async function example() {
            try {
                const practiceDays = await getTodayPracticeDay();
                setPracticed(practiceDays);
                console.log(practiceDays);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    useEffect(() => {
        const fetchVocabCount = async () => {
            try {
                const existingSets = findVocabsWithLastPracticeBeforeNow();
                if((await existingSets).length!=null)
                setVocabCount((await existingSets).length);
                example();
            } catch (error) {
                console.error('Error fetching vocab count:', error);
            }
        };

        fetchVocabCount();
    }, []);
    
    const localImageUrl = require('../../assets/images/book.png');

    const handleReview=()=>{
        router.push(`/review/practice`)
    }

    return (
        <TouchableOpacity style={styles.container} onPress={handleReview}>
            <View style={styles.infoContainer}>
                <Text style={styles.boldText}>Practice Your Word</Text>
                <Text style={styles.boldText}></Text>
                <Text style={styles.secondaryText}>Keep it going!</Text>
                <Text style={styles.secondaryText}>Today you practice: {practiced.length > 0 ? practiced[0].count : 0} words</Text>
                {/* <Text style={styles.percentText}><AntDesign name="rocket1" size={24} color="green" /></Text> */}
            </View>

            <View style={styles.imageContainer}>
                {vocabCount ? (
                    <>
                        <Text style={styles.boldText2}>{vocabCount}</Text>
                        <Text style={{color:"pink",fontSize:16,fontWeight:"bold"}}>Need to practice</Text>
                    </>
                ) : (
                    <>
                    <Text style={styles.boldText3}>0</Text>
                        <Text style={{color:"#cedf74",fontSize:20,fontWeight:"bold"}}>Need to practice</Text>
                    </>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default PracticeCourse;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#5b7bfe', // Màu nền xanh
        borderRadius: 20, // Bo tròn góc
         // Ẩn bất kỳ phần nào vượt ra ngoài giới hạn của container
        marginBottom: 10, // Khoảng cách dưới cùng
        
    },
    imageContainer: {
        flex: 3, // Chiếm 60% chiều rộng
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5, // Khoảng cách padding
    },
    infoContainer: {
        flex: 4, // Chiếm 40% chiều rộng
        padding: 10, // Khoảng cách padding
    },
    boldText: {
        fontWeight: 'bold', // In đậm
        fontSize: 18, // Kích thước phông chữ
        color: '#FFF', // Màu chữ trắng
    },
    boldText2: {
        fontWeight: 'bold', // In đậm
        fontSize: 38, // Kích thước phông chữ
        color: 'pink', // Màu chữ trắng
    },
    boldText3: {
        fontWeight: 'bold', // In đậm
        fontSize: 38, // Kích thước phông chữ
        color: '#cedf74', // Màu chữ trắng
    },
    secondaryText: {
        marginBottom:20,
        color: '#FFF', // Màu #888
    },
    percentText: {
        marginBottom:20,
        color: 'green', // Màu #888
    },
});
