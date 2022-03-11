import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { CgMoreAlt } from 'react-icons/cg'
import { db } from '../../firebase'

const Notebook = ({ title }: { title: string }) => {
  const [showOptions, setShowOptions] = useState(false)

  const getNotebook = async () => {
    // Structure: notebooks -> IsApoJ90VQtBhkDaawb2 -> notes -> {id}

  }

  useEffect(() => {
    getNotebook()
  })

  return (
    <div className="group inline-flex w-full items-center justify-between rounded-md p-1 pl-2 hover:cursor-pointer hover:bg-stone-100">
      <span className="text-stone-800">{title}</span>
      <div>
        <CgMoreAlt
          onClick={() => setShowOptions(!showOptions)}
          className="mr-1 hidden h-5 w-5 rounded text-stone-600 hover:bg-stone-200 group-hover:block"
        />
      </div>
    </div>
  )
}

export default Notebook
