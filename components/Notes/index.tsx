import React from 'react'
import Note from './Note'

interface Props {
  notes: { [key: string]: any }
}

const Notes = ({ notes }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      {notes.length > 0 ? (
        notes.map((note: any) => {
          return (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              timestamp={note.timestamp}
              tag={note.tag}
              markdown={note.markdown}
            />
          )
        })
      ) : (
        <div className="text-center text-stone-500">There are no notes yet...</div>
      )}
    </div>
  )
}

export default Notes
