import { ref, get } from 'firebase/database';
import db from './firebase';

export async function ReadData() {
  const testInfoRef = ref(db, 'Categories/Technology');
  const snapshot = await get(testInfoRef);

  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log('No data available');
    return null;
  }
}