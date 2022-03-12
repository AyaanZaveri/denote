import type { NextPage } from 'next'
import { useAuthState } from 'react-firebase-hooks/auth'
import Sidebar from '../components/Sidebar'
import { auth } from '../firebase'

const Home: NextPage = () => {
  const [user] = useAuthState(auth)

  console.log(user)

  return (
    <div>
      <div className="flex items-center h-screen">
        <Sidebar name={user?.displayName!} photoURL={user?.photoURL!} />
      </div>
    </div>
  )
}

export default Home
