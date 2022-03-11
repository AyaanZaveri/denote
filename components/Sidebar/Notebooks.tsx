import React, { useEffect } from 'react'
import Notebook from './Notebook'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../../firebase'
import { collection } from 'firebase/firestore'
import { CgSpinner } from 'react-icons/cg'

const Notebooks = () => {
  const [value, loading, error] = useCollection(collection(db, 'notebooks'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  // console.log(value?.docs.map((doc) => doc.data()))

  return (
    <div>
      <span className="mt-5 inline-flex items-center gap-2 text-left text-xl font-bold text-stone-800">
        Notebooks{' '}
        {loading ? (
          <CgSpinner className="h-5 w-5 animate-spin text-stone-800" />
        ) : null}
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
