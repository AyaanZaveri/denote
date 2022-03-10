import React from 'react'
import Profile from './profile'

interface Props {
  name: string
  photoURL: string
}

const Sidebar = ({ name, photoURL }: Props) => {
  return (
    <div className="flex h-screen w-72 border-r border-stone-300 bg-stone-50">
      <div className="flex w-full flex-col">
        <Profile name={name} photoURL={photoURL} />
        <span className='text-left'>Notebook</span>
      </div>
    </div>
  )
}

export default Sidebar
