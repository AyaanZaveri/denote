import React from 'react'
import { HiChevronDown } from 'react-icons/hi'
import Profile from './profile'

interface Props {
  name: string
  photoURL: string
}

const Sidebar = ({ name, photoURL }: Props) => {
  return (
    <div className="flex h-screen w-80 border-r border-stone-300 bg-stone-50">
      <div className="mx-5 flex w-full flex-col">
        <Profile name={name} photoURL={photoURL} />
        <span className="inline-flex items-center gap-2 mt-5 text-left text-xl font-bold text-stone-800">
          Notebooks
        </span>
      </div>
    </div>
  )
}

export default Sidebar
