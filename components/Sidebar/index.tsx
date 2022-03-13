import React from 'react'
import Notebooks from './Notebooks'
import Profile from './Profile'

interface Props {
  name: string
  photoURL: string
}

const Sidebar = ({ name, photoURL }: Props) => {
  return (
    <div className="flex ml-3 rounded-lg h-[97vh] w-64 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="mx-5 flex w-full flex-col">
        <Profile name={name} photoURL={photoURL} />
        <Notebooks />
      </div>
    </div>
  )
}

export default Sidebar
