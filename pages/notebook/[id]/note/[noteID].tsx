import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import NotebookIndex from '..'
import { db } from '../../../../firebase'
import TextareaAutosize from 'react-textarea-autosize'
import ReactMarkdown from 'react-markdown'

const NoteID = () => {
  const router = useRouter()

  const [noteData, setNoteData] = useState<any>({
    title: '',
    timestamp: '',
    markdown: '',
  })

  const { noteID, id } = router.query

  const { title, timestamp, markdown } = noteData

  const getDocData = async () => {
    const docRef = doc(db, `notebooks/${id}/notes`, `${noteID}`)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      setNoteData({
        ...docSnap.data(),
        id: docSnap.id,
      })
    } else {
      console.log('No such document!')
    }
  }

  const updateDoc = async () => {
    const docRef = doc(db, `notebooks/${id}/notes`, `${noteID}`)
    const docSnap = await getDoc(docRef)

    setDoc(docRef, noteData)
  }

  useEffect(() => {
    getDocData()
  }, [])

  console.log(noteData)

  useEffect(() => {
    updateDoc()
  }, [noteData])

  return (
    <div>
      <NotebookIndex />
      <div className="ml-[36rem] p-5 pb-8">
        <input
          defaultValue={title}
          onChange={(e) => {
            setNoteData({
              ...noteData,
              title: e.target.value,
            })
          }}
          className="inline-flex items-center justify-between rounded-lg p-1.5 text-3xl font-bold text-gray-800 outline-none hover:bg-gray-50 focus:bg-gray-100"
        />
        <TextareaAutosize
          defaultValue={markdown}
          onChange={(e) => {
            setNoteData({
              ...noteData,
              markdown: e.target.value,
            })
          }}
          minRows={10}
          placeholder="What's on your mind?"
          className="w-full resize-none overflow-hidden rounded-lg p-1.5 text-gray-800 outline-none"
        />
        <div className="prose">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default NoteID
