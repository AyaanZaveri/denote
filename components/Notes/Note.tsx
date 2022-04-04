import React, { useEffect } from 'react'
import luxon, { DateTime } from 'luxon'
import { HiOutlineTrash } from 'react-icons/hi'
import { collection, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useRouter } from 'next/router'

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
    const formatedDate = date.toFormat('LLLL dd, yyyy')

    if (formatedDate === DateTime.local().toFormat('LLLL dd, yyyy')) {
      return `Today @ ${date.toFormat('h:mm a')}`
    } else if (
      formatedDate ===
      DateTime.local().minus({ days: 1 }).toFormat('LLLL dd, yyyy')
    ) {
      return `Yesterday @ ${date.toFormat('h:mm a')}`
    } else {
      return formatedDate
    }
  }

  const router = useRouter()

  const { noteID: queryID } = router.query

  const removeDoc = () => {
    deleteDoc(doc(collection(db, `notebooks/${notebookID}/notes`), id))
  }

  // console.log(id)

  return (
    <div>
      <div
        className={`relative cursor-pointer rounded-lg bg-zinc-50 p-3 transition delay-200 ease-in-out ${
          id == queryID ? 'bg-zinc-200' : 'hover:bg-zinc-100'
        }`}
      >
        <div className="flex flex-col">
          <a href={`/notebook/${notebookID}/note/${id}`}>
            <span className="font-semibold break-words text-zinc-800 transition delay-200 ease-in-out hover:underline">
              {title}
            </span>
          </a>
          <span className="text-sm text-zinc-500">
            {convertTime(seconds ? seconds : 0)}
          </span>
        </div>
        <button
          onClick={removeDoc}
          className="absolute top-0 right-0 m-1.5 text-[12px]"
        >
          <HiOutlineTrash className="h-4 w-4 rounded-full text-zinc-500 transition delay-200 ease-in-out hover:text-blue-500" />
        </button>
      </div>
    </div>
  )
}

export default Note
