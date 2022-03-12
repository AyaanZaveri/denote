import React, { useEffect } from 'react'
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

  // console.log(id)

  return (
    <div>
      <div className="relative cursor-pointer rounded-lg bg-stone-100 p-3 ring-1 ring-stone-300 transition ease-in-out hover:ring-2 hover:ring-stone-400">
        <div className="flex flex-col">
          <a href={`/notebook/${notebookID}/note/${id}`}>
            <span className="font-semibold text-stone-800 transition delay-200 ease-in-out hover:underline">
              {title}
            </span>
          </a>
          <span className="text-sm text-stone-500">
            {convertTime(seconds ? seconds : 0)}
          </span>
        </div>
        <button
          onClick={removeDoc}
          className="absolute top-0 right-0 m-1.5 text-[12px]"
        >
          <HiOutlineTrash className="h-4 w-4 rounded-full text-stone-800 transition delay-200 ease-in-out hover:text-rose-600" />
        </button>
      </div>
    </div>
  )
}

export default Note
