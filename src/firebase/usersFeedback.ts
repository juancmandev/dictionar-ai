import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { db } from './config';

const PROJECT_ID = 'dictionar-ai';

interface Data {
  name: string;
  email: string;
  feedback: string;
}

export const saveUserFeedback = (data: Data) =>
  new Promise(async (resolve, reject) => {
    try {
      const userFeedbackRef = await addDoc(collection(db, 'usersFeedback'), {
        ...data,
        projectId: PROJECT_ID,
        createdAt: Timestamp.now(),
      });

      if (userFeedbackRef.id) resolve(userFeedbackRef.id);
      else reject('Error when trying to send your feedback...');
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
