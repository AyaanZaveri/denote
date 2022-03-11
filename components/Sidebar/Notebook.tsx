import React from 'react'
import { CgMoreAlt } from 'react-icons/cg'

const Notebook = ({ title }: { title: string }) => {
  return (
    <div className="group inline-flex w-full rounded-md p-1 pl-2 hover:cursor-pointer hover:bg-stone-100">
      <span className="text-stone-800">{title}</span>
      <CgMoreAlt />
    </div>
  )
}

export default Notebook
