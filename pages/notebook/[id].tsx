import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Sidebar from '../../components/Sidebar'
import { auth, db } from '../../firebase'

interface ssProps {
  notebookNote: string[]
  notes: any
  docSnap: any
}

const NotebookIndex = ({ notebookNote, notes, docSnap }: ssProps) => {
  const [user] = useAuthState(auth)

  console.log(docSnap)

  return (
    <div>
      <div className="-0 fixed top-0">
        <Sidebar name={user?.displayName!} photoURL={user?.photoURL!} />
      </div>
      <div className="ml-72">
        <h1 className="text-xl">Notebook</h1>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  
}

export default NotebookIndex
