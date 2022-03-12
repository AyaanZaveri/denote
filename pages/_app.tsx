import '../styles/globals.css'
import '../styles/markdown.css'
import type { AppProps } from 'next/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import Login from './login'
import Loading from '../components/Loading'

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading] = useAuthState(auth)

  const userRef = collection(db, 'users')

  useEffect(() => {
    if (user) {
      setDoc(
        doc(userRef, user.uid),
        {
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
          lastSeen: serverTimestamp(),
          uid: user.uid,
        },
        { merge: true }
      )
    }
  }, [user])

  if (loading) return <Loading />
  if (!user) return <Login />

  return <Component {...pageProps} />
}

export default MyApp
