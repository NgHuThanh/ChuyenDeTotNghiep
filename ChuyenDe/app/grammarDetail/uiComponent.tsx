import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { contentAndQuestion } from '@/model/grammar';
import { getContentAndQuestionList } from '../firebase/config';
import ContentComponent from './contentComponent';
import QuestionComponent from './questionCompnent';

const UiComponent = (props:{id:string,caq:contentAndQuestion}) => {
    const [contents, setcontentAndQuestions] = useState<contentAndQuestion[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
          try {
            const caqListData = await getContentAndQuestionList({idGrammar: props.id as string});
            setcontentAndQuestions(caqListData);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching product data: ", error);
          }
        }
        fetchData();
      }, []);
      if (loading) {
        return <View>Loading...</View>; // Hiển thị thông báo tải dữ liệu
      }
    return (
        <View style={{marginBottom:20}}>
            
                <View>
                <View style={styles.container}>
                    <Text style={styles.title}>{props.caq.main}</Text>
                    {/* Lập */}
                    <ContentComponent id={props.id} caq={props.caq.id} />
                </View>
                
                
                <View>
                    <QuestionComponent id={props.id} caq={props.caq.id}/>
                    
                
                </View>
                
            </View>
        
            
        </View>
        
        
    );
};

export default UiComponent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3d1460',
        flex: 1,
        
        borderRadius:10,
    },
    section: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color:"#df678b",
    },
    item: {
        
        borderRadius: 10,
        marginBottom: 10,
        
    },
    subItem: {
        marginBottom: 10,
        padding:10,
    },
    text: {
        fontSize: 16,
    },
    example: {
        backgroundColor: 'white',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        alignSelf: 'flex-start', // Chỉ tự mở rộng đúng độ dài cần thiết
        paddingHorizontal: 10, // Tạo khoảng cách ngang cho văn bản
        padding:10,
    },
    
    
    exampleText: {
        
    },
    button: {
        backgroundColor: 'green',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});
