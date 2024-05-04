import { content, contentAndQuestion, grammar, question } from '@/model/grammar';
import { initializeApp } from 'firebase/app';
import { DocumentSnapshot, QuerySnapshot, addDoc, collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';
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