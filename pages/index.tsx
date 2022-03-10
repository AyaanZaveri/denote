import type { NextPage } from 'next'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'

const Home: NextPage = () => {
  const [user] = useAuthState(auth)

  console.log(user)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2"></div>
  )
}

export default Home
