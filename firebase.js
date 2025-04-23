import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDud7KNfonMgZxIMf1lMkvfq3HjbHOMmh4",
  authDomain: "location-history-48838.firebaseapp.com",
  databaseURL: "https://location-history-48838-default-rtdb.firebaseio.com",
  projectId: "location-history-48838",
  storageBucket: "location-history-48838.firebasestorage.app",
  messagingSenderId: "1068795562306",
  appId: "1:1068795562306:web:56fea829ec297b3f4060db",
  measurementId: "G-4YR20YJXGE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;
