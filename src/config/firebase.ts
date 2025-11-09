import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDFE_ArULdX-Mxjv3pH9NHCYayv4jVjnkE",
  authDomain: "azalea-compute.firebaseapp.com",
  databaseURL: "https://azalea-compute-default-rtdb.firebaseio.com",
  projectId: "azalea-compute",
  storageBucket: "azalea-compute.firebasestorage.app",
  messagingSenderId: "286834036281",
  appId: "1:286834036281:web:1b54f1107ac170993407e8",
  measurementId: "G-Q7B3XTZBL2"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

