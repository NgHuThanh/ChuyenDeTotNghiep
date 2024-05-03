import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
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