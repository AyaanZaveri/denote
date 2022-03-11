import React from 'react'
import Notebooks from './Notebooks'
import Profile from './Profile'

interface Props {
  name: string
  photoURL: string
}

const Sidebar = ({ name, photoURL }: Props) => {
  return (
    <div className="flex h-screen w-64 border-r border-stone-300 bg-stone-50">
      <div className="mx-5 flex w-full flex-col">
        <Profile name={name} photoURL={photoURL} />
        <Notebooks />
      </div>
    </div>
  )
}

export default Sidebar
