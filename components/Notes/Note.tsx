import React from 'react'
import luxon, { DateTime } from 'luxon'
import { HiOutlineTrash } from 'react-icons/hi'
import { collection, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase'

interface Props {
  id: string
  timestamp: {
    seconds: number
  }
  title: string
  tag: string
  markdown: string
  notebookID: string
}

const Note = ({ id, timestamp, title, tag, markdown, notebookID }: Props) => {
  const seconds = timestamp?.seconds

  const convertTime = (unixTime: number) => {
    const date = DateTime.fromSeconds(unixTime)
    return date.toFormat('LLLL dd, yyyy')
  }

  const removeDoc = () => {
    deleteDoc(doc(collection(db, `notebooks/${notebookID}/notes`), id))
  }

  return (
    <div>
      <button onClick={removeDoc}>
        <HiOutlineTrash className="h-4 w-4 rounded-full text-stone-800 transition delay-200 ease-in-out hover:text-rose-600" />
      </button>
      <a href={`/note/${id}`}>
        <div className="relative cursor-pointer rounded-lg border border-stone-300 bg-stone-100 p-3 transition ease-in-out hover:border-stone-400">
          <div className="flex flex-col">
            <span className="font-semibold text-stone-800">{title}</span>
            <span className="text-sm text-stone-500">
              {convertTime(seconds)}
            </span>
          </div>
          <span className="absolute top-0 right-0 m-1 text-[12px]"></span>
        </div>
      </a>
    </div>
  )
}

export default Note
