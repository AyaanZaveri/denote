import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import Notes from '../../components/Notes'
import Sidebar from '../../components/Sidebar'
import { auth, db } from '../../firebase'

interface ssProps {
  notebookInfo: {[key: string]: string}
  notes: string
}

const NotebookIndex = ({ notes, notebookInfo }: ssProps) => {
  const [user] = useAuthState(auth)

  const notesList = JSON.parse(notes)

  return (
    <div>
      <div className="-0 fixed top-0">
        <Sidebar name={user?.displayName!} photoURL={user?.photoURL!} />
      </div>
      <div className="ml-72 p-5">
        <h1 className='text-stone-800 text-3xl font-bold'>{notebookInfo?.title}</h1>
        <Notes notes={notesList} />
      </div>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  // Structure: notebooks -> {id} -> notes -> {id} -> {title, markdown, tag}

  // Getting Note Data

  const notebookRef = collection(db, `notebooks/${context.params.id}/notes`)

  const notebookNote = await getDocs(notebookRef)

  const notes: any = []

  notebookNote.forEach((note) => {
    notes.push({
      ...note.data(),
      id: note.id,
    })
  })

  console.log(notes)

  // Getting Notebook Info

  const docRef = doc(db, 'notebooks', context.params.id)
  const docSnap = await getDoc(docRef)

  const notebookInfo = docSnap.data()

  return {
    props: {
      notes: JSON.stringify(notes),
      notebookInfo: notebookInfo,
    },
  }
}

export default NotebookIndex
