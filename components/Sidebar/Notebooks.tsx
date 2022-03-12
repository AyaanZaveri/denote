import React, { useEffect } from 'react'
import Notebook from './Notebook'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from '../../firebase'
import { addDoc, collection, query, setDoc, where } from 'firebase/firestore'
import { CgSpinner } from 'react-icons/cg'
import { useAuthState } from 'react-firebase-hooks/auth'
import { HiOutlinePlusSm } from 'react-icons/hi'

const Notebooks = () => {
  const [user] = useAuthState(auth)

  const notebookRef = collection(db, 'notebooks')

  const notebookQuery = user
    ? query(notebookRef, where('userID', '==', user?.uid))
    : null

  const [value, loading, error] = useCollection(notebookQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  const addNotebook = async () => {
    const title = prompt('Enter a title for your notebook.')

    await addDoc(collection(db, 'notebooks'), {
      title: title ? title : 'Untitled Notebook',
      userID: user?.uid,
    })
  }

  // console.log(value?.docs.map((doc) => doc.data()))

  return (
    <div>
      <span className="mt-5 inline-flex items-center gap-2 text-left text-xl font-bold text-gray-800">
        Notebooks{' '}
        {loading ? (
          <CgSpinner className="h-5 w-5 animate-spin text-gray-800" />
        ) : (
          <HiOutlinePlusSm
            onClick={addNotebook}
            className="h-5 w-5 rounded border border-gray-300 transition delay-200 ease-in-out hover:cursor-pointer hover:border-rose-500 hover:bg-rose-500 hover:text-gray-50"
          />
        )}
      </span>
      <div className="mt-1 flex w-full flex-col">
        {value && !loading
          ? value?.docs.map((doc) => (
              <a key={doc.id} href={`/notebook/${doc.id}`}>
                <Notebook key={doc.id} title={doc.data().title} />
              </a>
            ))
          : null}
      </div>
    </div>
  )
}

export default Notebooks
