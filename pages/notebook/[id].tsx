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
  const notebookRef = collection(db, 'notebooks')
  const ref = await doc(notebookRef, context.params.id)
  const notesRef = collection(ref, 'notes')
	const notebookNote = await getDocs(notesRef)

	notebookNote.forEach((doc) => {
		// doc.data() is never undefined for query doc snapshots
		console.log(doc.data());
	});
	

  //   const notes = notesQ.docs
  //     .map((doc) => ({
  //       ...doc.data(),
  //     }))
  //     .map((message) => ({
  //       ...message,
  //       createdAt: new Date(message.createdAt.seconds * 1000),
  //     }))

  //   const getNote = await getDoc(ref)
  //   const notebookNote = {
  //     ...getNote.data(),
  //     id: getNote.id,
  //   }

  return {
    props: {
      //   notebookNote: notebookNote,
      //   notes: JSON.stringify(notes),
      // docSnap: notes,
    },
  }
}

export default NotebookIndex
