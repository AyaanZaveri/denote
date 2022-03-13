import React, { useState } from 'react'
import { CgMoreAlt } from 'react-icons/cg'
import { doc, deleteDoc, collection } from "firebase/firestore";
import { db } from '../../firebase';

const Notebook = ({ id, title }: { id: string; title: string }) => {

  const removeNotebook = () => {
    deleteDoc(doc(collection(db, `notebooks`), id))
  }


  return (
    <div className="relative inline-flex w-full items-center justify-between rounded-md p-1 pl-2 hover:cursor-pointer hover:bg-gray-100 ">
      <a key={id} href={`/notebook/${id}`}>
        <span className="text-gray-800">{title}</span>
      </a>
      <div>
        <CgMoreAlt onClick={removeNotebook} className="mr-1 h-5 w-5 rounded text-gray-600 hover:bg-gray-200" />
      </div>
    </div>
  )
}

export default Notebook
