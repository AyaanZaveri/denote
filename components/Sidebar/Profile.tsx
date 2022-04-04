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
    <div className="mt-4 flex h-14 items-center justify-start rounded-lg ">
      <div className="inline-flex items-center gap-2">
        <img
          className="w-9 overflow-hidden rounded-full transition delay-200 ease-in-out hover:cursor-pointer hover:brightness-90"
          src={photoURL}
          alt=""
          onClick={() => signOut(auth)}
        />
        <div className="flex flex-col">
          <span className="text-[10px] text-zinc-600">You're signed in as</span>
          <span className="text-sm font-semibold leading-4 text-zinc-800">
            {name}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Profile
