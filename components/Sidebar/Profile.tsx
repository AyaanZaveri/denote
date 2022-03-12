import React from 'react'
import { signOut } from 'firebase/auth'
import { HiChevronDown } from 'react-icons/hi'
import { auth } from '../../firebase'

interface Props {
  name: string
  photoURL: string
}

const Profile = ({ name, photoURL }: Props) => {
  return (
    <div className="mt-4 flex h-16 items-center justify-between rounded-lg border bg-white">
      <div className="inline-flex items-center gap-2">
        <img
          className="ml-3 w-8 rounded-full border border-gray-300 transition delay-200 ease-in-out hover:cursor-pointer hover:brightness-90"
          src={photoURL}
          alt=""
          onClick={() => signOut(auth)}
        />
        <span className="font-semibold text-gray-800">{name}</span>
      </div>
      <HiChevronDown className="mr-3 inline-flex h-6 w-6 text-gray-800 transition delay-200 ease-in-out hover:cursor-pointer hover:text-rose-500" />
    </div>
  )
}

export default Profile
