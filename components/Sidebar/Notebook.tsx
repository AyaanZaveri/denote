import React, { useState } from 'react'
import { CgMoreAlt } from 'react-icons/cg'
import { doc, deleteDoc, collection, query, where } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import { useRouter } from 'next/router'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { Menu } from '@headlessui/react'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'

interface Props {
  id: string
  data: any
  setNotebook: (object: any, id: string) => void
}

const Notebook = ({ id, data, setNotebook }: Props) => {
  const [user] = useAuthState(auth)

  const usersRef = collection(db, 'users')
  const userQuery = query(usersRef, where('uid', '==', user?.uid))
  const [userValue, userLoading, userError] = useCollection(userQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  const removeNotebook = () => {
    deleteDoc(doc(collection(db, `notebooks`), id))
  }

  const router = useRouter()

  const { id: queryID } = router.query

  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false)

  return (
    <div
      className={`relative inline-flex w-full items-center justify-between break-all rounded-md bg-zinc-50 p-1 pl-2 transition delay-200 ease-in-out hover:cursor-pointer active:bg-zinc-200 ${
        id == queryID ? 'bg-zinc-200' : 'hover:bg-zinc-100'
      }`}
    >
      <div className="relative inline-flex items-center gap-2">
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="flex h-5 w-5 items-center justify-center rounded bg-transparent text-zinc-600 transition delay-200 ease-in-out hover:bg-zinc-200"
        >
          <span>{data.emoji}</span>
        </button>
        <a key={id} href={`/notebook/${id}`}>
          <span className="text-zinc-800">{data.title}</span>
        </a>
        <div className={`absolute top-0 z-30 mt-8`}>
          {showEmojiPicker ? (
            <Picker
              set="apple"
              onSelect={(emoji: any) => {
                setNotebook({ ...data, emoji: emoji?.native }, id)
              }}
            />
          ) : null}
        </div>
      </div>
      <div className="flex items-start outline-none">
        <Menu>
          <Menu.Button className="outline-none">
            {' '}
            <CgMoreAlt className="mr-1 h-5 outline-none w-5 rounded text-zinc-600 transition delay-200 ease-in-out hover:bg-zinc-200" />
          </Menu.Button>
          <Menu.Items className="absolute outline-none m-5 flex w-full flex-col rounded-md border bg-white p-2 text-left text-slate-800 shadow-sm">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active && 'bg-zinc-100 transiton duration-200 ease-in-out'
                  } rounded-md p-1.5 inline-flex items-center gap-2`}
                >
                  <HiOutlineTrash className="h-5 w-5 rounded-full texttransition delay-200 ease-in-out text-red-500" />
                  <span>Delete</span>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                className={`${
                  active && 'bg-zinc-100 transiton duration-200 ease-in-out'
                } rounded-md p-1.5 inline-flex items-center gap-2`}
              >
                <HiOutlinePencil className="h-5 w-5 rounded-full texttransition delay-200 ease-in-out text-red-500" />
                <span>Rename</span>
              </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    </div>
  )
}

export default Notebook
