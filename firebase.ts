import { initializeApp, getApps } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDWcZHfD-iknGVYUFA2uBNJiNdidrBuw-8',
  authDomain: 'notes-1ac0f.firebaseapp.com',
  projectId: 'notes-1ac0f',
  storageBucket: 'notes-1ac0f.appspot.com',
  messagingSenderId: '382709058001',
  appId: '1:382709058001:web:92a6520989c26825cff8f0',
  measurementId: 'G-1MEPX69DZL',
}

const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApps()[0]
const auth = getAuth(firebaseApp)
const provider = new GoogleAuthProvider()
const db = getFirestore(firebaseApp)

export { auth, provider, db }
