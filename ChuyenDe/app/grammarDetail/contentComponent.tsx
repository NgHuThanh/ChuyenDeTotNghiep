import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Octicons } from '@expo/vector-icons';
import { content } from '@/model/grammar';
import { getContentList } from '../firebase/config';

const ContentComponent = (props:{id:string,caq:string}) => {
    const [contents, setContents] = useState<content[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
          try {
            const caqListData = await getContentList({
                idGrammar: props.id as string,
                idCaq: props.caq as string,
            });
            setContents(caqListData);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching product data: ", error);
          }
        }
        fetchData();
      }, []);
      if (loading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Loading...</Text>
          </View>
        );
      }
    return (
        
        <View>
            {contents.map((content,index,key)=>(
                
                <View style={styles.item}>
                <View style={styles.subItem}>
                    <Text style={styles.text}><Octicons name="light-bulb" size={20} color="yellow" style={{marginRight:5}} />{content.content}</Text>
                </View>
                <View style={[styles.example]}>
                    <Text style={[styles.text, styles.exampleText]}>{content.example}</Text>
                    
                </View>
            </View>
            ))}
                        
        </View>
        
        
    );
};

export default ContentComponent;

const styles = StyleSheet.create({
    item: {
        
        borderRadius: 10,
        marginBottom: 10,
        
    },
    subItem: {
        marginBottom: 10,
        padding:10,
    },
    text: {
        fontSize: 18,
        color:"#febaff"
    },
    example: {
        backgroundColor: 'white',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        alignSelf: 'flex-start', // Chỉ tự mở rộng đúng độ dài cần thiết
        paddingHorizontal: 10, // Tạo khoảng cách ngang cho văn bản
        padding:10,
        maxWidth:280,
    },
    
    
    exampleText: {
        color:"#410fa3"
    },
});
