import React from 'react'
import Notebooks from './Notebooks'
import Profile from './Profile'

interface Props {
  name: string
  photoURL: string
}

const Sidebar = ({ name, photoURL }: Props) => {
  return (
    <div className="flex ml-5 rounded-lg h-[95vh] w-64 bg-gray-50">
      <div className="mx-5 flex w-full flex-col">
        <Profile name={name} photoURL={photoURL} />
        <Notebooks />
      </div>
    </div>
  )
}

export default Sidebar
