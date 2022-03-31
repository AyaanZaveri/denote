import React, { useState } from 'react'
import { CgMoreAlt } from 'react-icons/cg'
import { doc, deleteDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase'
import { useRouter } from 'next/router'

const Notebook = ({ id, title }: { id: string; title: string }) => {
  const removeNotebook = () => {
    deleteDoc(doc(collection(db, `notebooks`), id))
  }

  const router = useRouter()

  const { id: queryID } = router.query

  return (
    <div
      className={`relative inline-flex w-full items-center justify-between rounded-md p-1 pl-2 transition delay-200 ease-in-out hover:cursor-pointer ${
        id == queryID ? 'bg-gray-200' : 'hover:bg-gray-100'
      }`}
    >
      <div className='inline-flex gap-0.5 items-center'>
        <span contentEditable={true} className="mr-1 flex h-5 w-5 items-center justify-center rounded text-gray-600 transition delay-200 ease-in-out hover:bg-gray-200">
          👨‍💻
        </span>
        <a key={id} href={`/notebook/${id}`}>
          <span className="text-gray-800">{title}</span>
        </a>
      </div>
      <div>
        <CgMoreAlt
          onClick={removeNotebook}
          className="mr-1 h-5 w-5 rounded text-gray-600 transition delay-200 ease-in-out hover:bg-gray-200"
        />
      </div>
    </div>
  )
}

export default Notebook
