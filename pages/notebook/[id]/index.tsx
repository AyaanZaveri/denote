import { RefreshIcon } from '@heroicons/react/solid'
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
import Notes from '../../../components/Notes'
import Sidebar from '../../../components/Sidebar'
import { auth, db } from '../../../firebase'

interface ssProps {
  notes?: string
}

const NotebookIndex = ({ notes }: ssProps) => {
  const [notesList, setNotesList] = useState(
    notes?.length! > 0 ? JSON.parse(notes!) : []
  )

  const [notebookInfo, setNotebookInfo] = useState<any>({
    id: '',
    title: '',
  })

  const [user] = useAuthState(auth)

  const router = useRouter()

  const queryID = router.query.id

  // Getting Notebook Info

  const getNotebookInfo = async () => {
    const docRef = await doc(db, 'notebooks', `${queryID}`)
    const docSnap = await getDoc(docRef)

    setNotebookInfo({
      ...docSnap.data(),
      id: docSnap.id,
    })
  }

  useEffect(() => {
    getNotebookInfo()
  }, [])

  console.log(notebookInfo)

  const addADoc = async () => {
    const title = prompt('Enter a title for your note.')

    const newNote = {
      title: title ? title : 'Untitled Note',
      markdown: '',
      timestamp: serverTimestamp(),
    }

    // create a new document in the collection with the new note
    await setDoc(doc(collection(db, `notebooks/${queryID}/notes`)), newNote, {
      merge: true,
    })
  }

  useEffect(() => {
    // Retrieves the notes for the current notebook (${queryID})
    const notesRef = collection(db, `notebooks/${queryID}/notes`)

    // Listens for changes to the notes collection
    onSnapshot(notesRef, (snapshot) => {
      const notesArr: any = []

      snapshot.forEach((doc) => {
        notesArr.push({
          ...doc.data(),
          id: doc.id,
        })
      })

      setNotesList(notesArr)
    })
  }, [])

  return (
    <div>
      <div className="fixed left-0 top-0">
        <Sidebar name={user?.displayName!} photoURL={user?.photoURL!} />
      </div>
      <div className="scrollbar fixed top-0 bottom-0 ml-64 h-full w-80 overflow-y-scroll border-r border-stone-300 p-5 pb-8">
        <h1 className="inline-flex w-full items-center justify-between pt-1.5 text-3xl font-bold text-stone-800">
          {notebookInfo?.title}
          <HiOutlineDocumentAdd
            onClick={addADoc}
            className="h-8 w-8 rounded p-1 transition ease-in-out delay-200 hover:cursor-pointer bg-stone-100 ring-1 ring-stone-300 hover:text-rose-500"
          />
        </h1>
        <div className="mt-4">
          <Notes notes={notesList} notebookInfo={notebookInfo!} />
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

  return {
    props: {
      notes: JSON.stringify(notes),
    },
  }
}

export default NotebookIndex
