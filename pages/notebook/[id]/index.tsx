import { RefreshIcon } from '@heroicons/react/solid'
import { getAuth } from 'firebase/auth'
import {
  collection,
  deleteDoc,
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
import {
  HiOutlinePlusCircle,
  HiOutlineSearchCircle,
  HiOutlineTrash,
} from 'react-icons/hi'
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

  const [search, setSearch] = useState('')
  const [showInput, setShowInput] = useState(false)

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

  if (user?.uid && notebookInfo.userID) {
    if (user?.uid != notebookInfo.userID) {
      router.push('/')
    }
  }

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

  const changeNotebookInfo = async (notebookInfo: any) => {
    await setDoc(doc(db, `notebooks/${queryID}`), notebookInfo)
  }

  const getFilteredNotes = () => {
    const filteredNotes = notesList.filter((note: any) =>
      note.title.toLowerCase().includes(search.toLowerCase())
    )
    return filteredNotes
  }

  const removeNotebook = () => {
    deleteDoc(doc(collection(db, `notebooks`), `${queryID}`))
  }

  const notebooksRef = collection(db, `notebooks`)

  const checkIfNotebookExists = async () => {
    const notebookDoc = await getDoc(doc(notebooksRef, `${queryID}`))
    if (notebookDoc.data() === undefined) {
      router.push('/')
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      checkIfNotebookExists()
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <div className="fixed flex h-screen items-center">
        <Sidebar name={user?.displayName!} photoURL={user?.photoURL!} />
      </div>
      <div className="scrollbar fixed top-0 bottom-0 ml-[17rem] h-full w-80 overflow-y-auto p-5 pb-8">
        <div className="inline-flex w-full items-center justify-between pt-1 text-3xl font-bold text-gray-800">
          <input
            defaultValue={notebookInfo?.title}
            onChange={(e) => {
              changeNotebookInfo({
                ...notebookInfo,
                title: e.target.value,
              })
            }}
            className="inline-flex w-10/12 resize-none items-center justify-between rounded-lg p-1.5 text-3xl font-bold text-gray-800 outline-none hover:bg-gray-50 focus:bg-gray-100"
          />
          <div className="inline-flex gap-1">
            <HiOutlineTrash
              onClick={removeNotebook}
              className="h-6 w-6 text-gray-500 transition delay-200 ease-in-out hover:scale-110 hover:cursor-pointer hover:text-blue-500"
            />
            <HiOutlinePlusCircle
              onClick={addADoc}
              className="h-6 w-6 text-gray-500 transition delay-200 ease-in-out hover:rotate-90 hover:cursor-pointer hover:text-blue-500"
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2">
              <HiOutlineSearchCircle className="h-6 w-6 text-gray-500 transition delay-200 ease-in-out hover:text-blue-500" />
            </div>
            <input
              type="text"
              className="w-full rounded-lg bg-gray-50 px-2 py-2 pl-10 text-gray-800 outline-none transition delay-200 ease-in-out hover:bg-gray-100 focus:bg-gray-100"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="mt-3">
            <Notes
              notes={search ? getFilteredNotes() : notesList}
              notebookInfo={notebookInfo!}
            />
          </div>
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
