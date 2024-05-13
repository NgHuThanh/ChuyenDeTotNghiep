import { exportData, importData, importSetData } from '@/model/asyncStorage';
import { content, contentAndQuestion, grammar, question } from '@/model/grammar';
import { qaa, rep } from '@/model/qaa';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {addDoc, collection, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyD4Bom8T2LsEnlv1uqgFMJJgq5Z6M0Y4Cg",
    authDomain: "databasechuyende.firebaseapp.com",
    projectId: "databasechuyende",
    storageBucket: "databasechuyende.appspot.com",
    messagingSenderId: "821034478137",
    appId: "1:821034478137:web:cb207bd759a41c11903be8",
    measurementId: "G-C2EN8XFFCV"
  };
  const firebaseApp = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebaseApp);
  
  export const addDocument = async () => {
    try {
      await addDoc(collection(firestore, 'grammar'), {
        title: 'test connection'
      });
      console.log('Document added successfully!');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }

export const getGrammarList = async (): Promise<grammar[]> => {
    try {
        const querySnapshot = await getDocs(collection(firestore, 'grammar'));
        const grammars: grammar[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const grammarData: grammar = {
              id: doc.id,
              title: data.title || '',
              contentAndQuestions: [],
            };
            grammars.push(grammarData);
        });
        return grammars;
    } catch (error) {
        console.error('Error getting documents: ', error);
        return []; // Trả về một mảng trống nếu có lỗi
    }
};
export const getGrammarById = async (props:{grammarId: string}): Promise<grammar | null> => {
  try {
      const docRef = doc(firestore, 'grammar', props.grammarId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
          const grammarData = docSnap.data();
          if (grammarData) {
              const grammarObject: grammar = {
                id: docSnap.id,
                title: grammarData.title || '',
                contentAndQuestions: []
              };
              return grammarObject;
          }
      }
      return null;
  } catch (error) {
      console.error('Error getting document: ', error);
      return null;
  }
};
export const getContentAndQuestionList = async (props:{idGrammar:string}): Promise<contentAndQuestion[]> => {
  try {
      const querySnapshot = await getDocs(collection(firestore, 'grammar/'+props.idGrammar+'/contentAndQuestions/'));
      const grammars: contentAndQuestion[] = [];
      querySnapshot.forEach((doc) => {
          const data = doc.data();
          const grammarData: contentAndQuestion = {
            contents: [],
            questions: [],
            main: data.main || '',
            id: doc.id,
          };
          grammars.push(grammarData);
      });
      return grammars;
  } catch (error) {
      console.error('Error getting documents: ', error);
      return []; // Trả về một mảng trống nếu có lỗi
  }
};
export const getContentList = async (props:{idGrammar:string,idCaq:string}): Promise<content[]> => {
  try {
      const querySnapshot = await getDocs(collection(firestore, 'grammar/'+props.idGrammar+'/contentAndQuestions/'+props.idCaq+"/contents/"));
      const grammars: content[] = [];
      querySnapshot.forEach((doc) => {
          const data = doc.data();
          const grammarData: content = {
            content: data.content||'',
            example: data.example||''
          };
          grammars.push(grammarData);
      });
      return grammars;
  } catch (error) {
      console.error('Error getting documents: ', error);
      return []; // Trả về một mảng trống nếu có lỗi
  }
};
export const getQuestionList = async (props:{idGrammar:string,idCaq:string}): Promise<question[]> => {
  try {
      const querySnapshot = await getDocs(collection(firestore, 'grammar/'+props.idGrammar+'/contentAndQuestions/'+props.idCaq+"/questions/"));
      const grammars: question[] = [];
      querySnapshot.forEach((doc) => {
          const data = doc.data();
          const grammarData: question = {
            question: data.question,
            answers: data.answers,
            rightAnswer: data.rightAnswer
          };
          grammars.push(grammarData);
      });
      return grammars;
  } catch (error) {
      console.error('Error getting documents: ', error);
      return []; // Trả về một mảng trống nếu có lỗi
  }
};
export const addUser = async ({ username, password, email }: { username: string; password: string; email: string; }) => {
  try {
    await addDoc(collection(firestore, 'users'), {
      username: username,
      password: password,
      email: email
    });
    console.log('User added successfully!');
  } catch (error) {
    console.error('Error adding user: ', error);
  }
}

export const login = async (email:string, password:string) => {
  try {
    // Tạo truy vấn để lấy tất cả tài khoản trong collection "users" có email và password khớp với thông tin đăng nhập
    const q = query(collection(firestore, "users"), where("email", "==", email), where("password", "==", password));

    // Thực hiện truy vấn
    const querySnapshot = await getDocs(q);

    // Nếu có bất kỳ tài khoản nào khớp với thông tin đăng nhập
    if (!querySnapshot.empty) {
      // Lưu thông tin người dùng vào AsyncStorage
      const doc = querySnapshot.docs[0];
      const userId = doc.id;
      const username = doc.data().username;
      await AsyncStorage.setItem('email',email)
      await AsyncStorage.setItem('userId', userId);
      await AsyncStorage.setItem('username', username);
      importData(doc.data().source);
      // Trả về true
      return true;
    } else {
      // Nếu không có tài khoản nào khớp, trả về false
      return false;
    }
  } catch (error) {
    console.error("Error logging in:", error);
    // Nếu xảy ra lỗi, trả về false
    return false;
  }
};
export const logout = async () => {
  try {
    // Xóa các AsyncStorage chứa thông tin đăng nhập
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('username');
    // Trả về true để chỉ ra rằng đăng xuất thành công
    return true;
  } catch (error) {
    console.error("Error logging out:", error);
    // Nếu xảy ra lỗi, trả về false
    return false;
  }
};
export const updateUserSource = async () => {
  try {
      // Lấy userId từ AsyncStorage
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
          console.error('User ID not found in AsyncStorage.');
          return;
      }

      // Thực hiện truy vấn để lấy tài liệu người dùng từ Firestore
      const userDocRef = doc(firestore, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);
      const data= await exportData();
      // Nếu tài liệu tồn tại
      if (userDocSnap.exists()) {
          // Cập nhật thuộc tính "source" của tài liệu thành "Đã chuyển giao"
          await updateDoc(userDocRef, {
            source:data
          });

          console.log('User source updated successfully!');
      } else {
          console.error('User document does not exist in Firestore.');
      }
  } catch (error) {
      console.error('Error updating user source:', error);
  }
}
export const uploadSet = async (data: string) => {
  try {
      // Thực hiện truy vấn để thêm một tài liệu mới vào collection "onlineWord" với thuộc tính "source" là dữ liệu từ tham số đầu vào
      const docRef = await addDoc(collection(firestore, 'onlineWord'), {
          source: data
      });

      console.log('Set online vocab source updated successfully!');
      
      // Trả về ID của tài liệu đã được thêm vào Firestore
      return docRef.id;
  } catch (error) {
      console.error('Error updating user source:', error);
      // Trả về null nếu có lỗi xảy ra
      return null;
  }
};
export const importSet = async (id: string) => {
  try {
      // Tạo tham chiếu đến tài liệu trong collection "onlineWord" với ID được cung cấp
      const userDocRef = doc(firestore, 'onlineWord', id);
      
      // Lấy dữ liệu của tài liệu
      const userDocSnap = await getDoc(userDocRef);

      // Kiểm tra xem tài liệu có tồn tại không
      if (userDocSnap.exists()) {
          // Trả về thuộc tính "source" của tài liệu
          const source = userDocSnap.data()?.source;
          console.log(source);
          importSetData(source);
      } else {
          console.error('Document does not exist in Firestore.');
          
      }
  } catch (error) {
      console.error('Error importing set:', error);
      return null;
  }
};
export const writeToFirestore = async (title: string, content: string): Promise<string> => {
  const userName=await AsyncStorage.getItem("userId");
  try {
      const docRef = await addDoc(collection(firestore, 'qaa'), {
          title: title,
          content: content,
          timecreate: new Date(), // Thêm thông tin thời gian tạo
          user: userName // Thêm thông tin người dùng
      });
      console.log('Document written with ID: ', docRef.id);
      // Return the document ID if needed
      return docRef.id;
  } catch (e) {
      console.error('Error adding document: ', e);
      throw new Error('Failed to write document to Firestore');
  }
};
export const writeRepToFirestore = async (id: string, content: string): Promise<string> => {
  const userName=await AsyncStorage.getItem("userId");
  try {
      const docRef = await addDoc(collection(firestore, 'qaa/'+id+'/replied'), {
          content: content,
          timecreate: new Date(), // Thêm thông tin thời gian tạo
          user: userName // Thêm thông tin người dùng
      });
      console.log('Document written with ID: ', docRef.id);
      // Return the document ID if needed
      return docRef.id;
  } catch (e) {
      console.error('Error adding document: ', e);
      throw new Error('Failed to write document to Firestore');
  }
};
export const getAllQaaDocuments = async (): Promise<qaa[]> => {
  try {
      const querySnapshot = await getDocs(collection(firestore, 'qaa'));
      const qaaList: qaa[] = [];

      querySnapshot.forEach((doc) => {
          const data = doc.data();
          const qaaData: qaa = {
              id: doc.id,
              title: data.title || '',
              content: data.content || '',
              timecreate: data.timecreate.toDate(), // Chuyển đổi thời gian từ Firestore Timestamp sang JavaScript Date
              user: data.user || ''
          };
          qaaList.push(qaaData);
      });

      return qaaList;
  } catch (error) {
      console.error('Error getting documents:', error);
      return [];
  }
};
export const getAllRepDocuments = async (id:string): Promise<rep[]> => {
  try {
      const querySnapshot = await getDocs(collection(firestore, 'qaa/'+id+'/replied'));
      const qaaList: rep[] = [];

      querySnapshot.forEach((doc) => {
          const data = doc.data();
          const qaaData: rep = {
              id: doc.id,
              content: data.content || '',
              timecreate: data.timecreate.toDate(), // Chuyển đổi thời gian từ Firestore Timestamp sang JavaScript Date
              user: data.user || ''
          };
          qaaList.push(qaaData);
      });

      return qaaList;
  } catch (error) {
      console.error('Error getting documents:', error);
      return [];
  }
};
export const getUserInfo = async (id: string) => {
  try {
      // Tạo tham chiếu đến tài liệu trong collection "onlineWord" với ID được cung cấp
      const userDocRef = doc(firestore, 'users', id);
      
      // Lấy dữ liệu của tài liệu
      const userDocSnap = await getDoc(userDocRef);

      // Kiểm tra xem tài liệu có tồn tại không
      if (userDocSnap.exists()) {
          // Trả về thuộc tính "source" của tài liệu
          const source = userDocSnap.data()?.username;
          console.log(source);
          return source;
      } else {
          console.error('Document does not exist in Firestore.');
          
      }
  } catch (error) {
      console.error('Error importing set:', error);
      return null;
  }
};