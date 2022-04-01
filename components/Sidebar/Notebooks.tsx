import React, { useEffect } from 'react'
import Notebook from './Notebook'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from '../../firebase'
import {
  addDoc,
  collection,
  doc,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import { CgSpinner } from 'react-icons/cg'
import { useAuthState } from 'react-firebase-hooks/auth'
import { HiOutlinePlusCircle } from 'react-icons/hi'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const Notebooks = () => {
  const [user] = useAuthState(auth)

  const notebookRef = collection(db, 'notebooks')

  const notebookQuery = user
    ? query(notebookRef, where('userID', '==', user?.uid))
    : null

  const [value, loading, error] = useCollection(notebookQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  const usersRef = collection(db, 'users')
  const userQuery = query(usersRef, where('uid', '==', user?.uid))
  const [userValue, userLoading, userError] = useCollection(userQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  const addNotebook = async () => {
    const title = "Untitled Notebook"

    if (title || title === '') {
      await addDoc(collection(db, 'notebooks'), {
        title: title ? title : 'Untitled Notebook',
        userID: user?.uid,
        emoji: '📓',
      })
    }

    const notebookOrder = userValue?.docs[0]?.data().notebookOrder

    await setDoc(doc(db, 'users', `${user?.uid}`), {
      notebookOrder: [...(notebookOrder ? notebookOrder : []), title],
    })
  }

  const setNotebook = async (object: { [key: string]: string }, id: string) => {
    await setDoc(doc(collection(db, 'notebooks'), id), object)
  }

  // console.log(value?.docs.map((doc) => doc.data()))

  return (
    <div>
      <span className="mt-5 inline-flex items-center gap-1 text-left text-xl font-bold text-gray-800">
        Notebooks{' '}
        {loading ? (
          <CgSpinner className="h-5 w-5 animate-spin text-gray-800" />
        ) : (
          <HiOutlinePlusCircle
            onClick={addNotebook}
            className="h-5 w-5 text-gray-500 transition delay-200 ease-in-out hover:rotate-90 hover:cursor-pointer hover:text-blue-500"
          />
        )}
      </span>
      <div className="mt-2 flex w-full flex-col gap-1">
        <DragDropContext onDragEnd={() => {}}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-col gap-1"
              >
                {value && !loading
                  ? value?.docs.map((doc, index) => (
                      <Draggable
                        key={doc.id}
                        draggableId={doc.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex flex-col gap-1"
                          >
                            <Notebook
                              key={doc.id}
                              id={doc.id}
                              data={doc.data()}
                              setNotebook={setNotebook}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))
                  : null}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  )
}

export default Notebooks
