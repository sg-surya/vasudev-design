import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as fbSignOut } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer, setDoc, serverTimestamp } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore (Must use firestoreDatabaseId from config)
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export const googleProvider = new GoogleAuthProvider();

// Google Sign In Helper (Handles user creation in Firestore)
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Generate or update user profile document in Firestore
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDocFromServer(userRef);

    if (!userDoc.exists()) {
       await setDoc(userRef, {
         email: user.email,
         displayName: user.displayName || '',
         photoURL: user.photoURL || '',
         createdAt: serverTimestamp()
       });
    }

    return user;
  } catch (error) {
    console.error("Firebase Signin Error", error);
    throw error;
  }
};

export const signOut = () => fbSignOut(auth);

// Test Connection Helper on boot
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log("Firebase Connected Successfully");
  } catch (error: any) {
    if(error.message?.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
testConnection();
