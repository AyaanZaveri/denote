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

  const [notesList] = JSON.parse(notes)

  console.log(notesList)

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
  // Structure: notebooks -> {id} -> notes -> {id} -> {title, markdown, tag}

  const notebookRef = collection(db, `notebooks/${context.params.id}/notes`)

  const notebookNote = await getDocs(notebookRef)

  const notes: any = []

  notebookNote.forEach((note) => {
    notes.push(note.data())
  })

  return {
    props: {
      notes: JSON.stringify(notes),
    },
  }
}

export default NotebookIndex