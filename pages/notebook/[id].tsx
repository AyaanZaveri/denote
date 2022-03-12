import { getAuth } from 'firebase/auth'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { HiOutlineDocumentAdd } from 'react-icons/hi'
import Notes from '../../components/Notes'
import Sidebar from '../../components/Sidebar'
import { auth, db } from '../../firebase'

interface ssProps {
  notebookInfo: { [key: string]: string }
  notes: string
}

const NotebookIndex = ({ notes, notebookInfo }: ssProps) => {
  const [notesList, setNotesList] = useState(JSON.parse(notes))

  console.log(notesList)

  const [user] = useAuthState(auth)

  const router = useRouter()

  const queryID = router.query.id

  // Refresh Data

  const query = collection(db, `notebooks/${queryID}/notes`)

  const refreshData = () => {
    onSnapshot(query, (snapshot) => {
      snapshot.docs.map((doc) => setNotesList([...notesList, doc.data()]))
    })
  }

  const addDoc = () => {
    const title = prompt('Enter a title for your note.')

    const newNote = {
      title: title,
      markdown: '',
      timestamp: serverTimestamp(),
    }
    setDoc(doc(collection(db, `notebooks/${queryID}/notes`)), newNote, {
      merge: true,
    })

    refreshData()
  }

  useEffect(() => {
    refreshData()
  }, [])

  return (
    <div>
      <div className="fixed left-0 top-0">
        <Sidebar name={user?.displayName!} photoURL={user?.photoURL!} />
      </div>
      <div className="ml-64 h-screen w-80 border-r border-stone-300 p-5 pb-8">
        <h1 className="inline-flex w-full items-center justify-between text-3xl font-bold text-stone-800">
          {notebookInfo?.title}
          <HiOutlineDocumentAdd
            onClick={addDoc}
            className="h-8 w-8 rounded p-1 transition ease-in-out hover:cursor-pointer hover:bg-stone-100 hover:ring-1 hover:ring-stone-300"
          />
        </h1>
        <div className="mt-4">
          <Notes notes={notesList} notebookInfo={notebookInfo} />
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  // Structure: notebooks -> {id} -> notes -> {id} -> {title, markdown, tag}

  // Getting Note Data

  const notebookRef = query(
    collection(db, `notebooks/${context.params.id}/notes`)
  )

  const notebookNote = await getDocs(notebookRef)

  const notes: any = []

  notebookNote.forEach((note) => {
    notes.push({
      ...note.data(),
      id: note.id,
    })
  })

  // Getting Notebook Info

  const docRef = doc(db, 'notebooks', context.params.id)
  const docSnap = await getDoc(docRef)

  const notebookInfo = {
    ...docSnap.data(),
    id: docSnap.id,
  }

  return {
    props: {
      notes: JSON.stringify(notes),
      notebookInfo: notebookInfo,
    },
  }
}

export default NotebookIndex
