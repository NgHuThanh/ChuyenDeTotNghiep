import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { question } from '@/model/grammar';
import { getQuestionList } from '../firebase/config';

const QuestionComponent = (props:{id:string,caq:string}) => {
    const [questions, setQuestions] = useState<question[]>([]);
    const [loading, setLoading] = useState(true);
    const [buttonColors, setButtonColors] = useState<string[][]>([]); // Mảng lưu trữ màu của từng nút

    useEffect(() => {
        async function fetchData() {
          try {
            const caqListData = await getQuestionList({
                idGrammar: props.id as string,
                idCaq: props.caq as string,
            });
            setQuestions(caqListData);
      
            // Khởi tạo mảng màu sắc cho mỗi câu hỏi với số lượng câu trả lời tối đa
            const defaultColors = caqListData.map((question) => Array(question.answers.length).fill('#3b1564'));
            setButtonColors(defaultColors);
      
            setLoading(false);
          } catch (error) {
            console.error("Error fetching product data: ", error);
          }
        }
        fetchData();
      }, []);

    // Hàm để xử lý khi người dùng nhấn vào nút
    const handleButtonPress = (questionIndex: number, answerIndex: number, rightAnswer: number) => {
        // Tạo mảng mới từ mảng màu sắc hiện tại
        const newButtonColors = [...buttonColors];
        
        // So sánh index của nút với rightAnswer
        if (answerIndex != rightAnswer) {
            // Nếu index khác với rightAnswer, đổi màu nút thành đỏ
            newButtonColors[questionIndex][answerIndex] = 'red';
        } else {
            // Nếu index trùng với rightAnswer, đổi màu nút thành xanh lá cây
            newButtonColors[questionIndex][answerIndex] = 'green';
        }

        // Cập nhật mảng màu sắc mới
        setButtonColors(newButtonColors);
    };

    if (loading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Loading...</Text>
          </View>
        );
      }

    return (
        <View>
            {questions.map((question, questionIndex) => (
                <View style={styles.item} key={questionIndex}>
                    <View style={styles.subItem}>
                        <Text style={styles.title}>{question.question}</Text>
                    </View>
                    {question.answers.map((answer, answerIndex) => (
                        <TouchableOpacity
                            key={answer}
                            style={[styles.button, { backgroundColor: buttonColors[questionIndex][answerIndex] }]} // Sử dụng màu sắc từ mảng màu sắc
                            onPress={() => handleButtonPress(questionIndex, answerIndex, question.rightAnswer)}
                        >
                            <Text style={styles.buttonText}>{answer}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            ))}
        </View>
    );
};

export default QuestionComponent;

const styles = StyleSheet.create({
    item: {
        
        borderRadius: 10,
        marginBottom: 10,
        
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
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
    
    button: {
        backgroundColor: '#3b1564',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin:10,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        textAlign: 'center',
    },
    exampleText: {
        
    },
});
