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
      <div className='flex items-center'>
        <Menu>
          <Menu.Button>
            {' '}
            <CgMoreAlt className="mr-1 h-5 w-5 rounded text-zinc-600 transition delay-200 ease-in-out hover:bg-zinc-200" />
          </Menu.Button>
          <Menu.Items className="absolute text-left w-full flex flex-col gap-3">
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${active && 'bg-blue-500'}`}
                  href="/account-settings"
                >
                  Account settings
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${active && 'bg-blue-500'}`}
                  href="/account-settings"
                >
                  Documentation
                </a>
              )}
            </Menu.Item>
            <Menu.Item disabled>
              <span className="opacity-75">Invite a friend (coming soon!)</span>
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    </div>
  )
}

export default Notebook
