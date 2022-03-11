import React from 'react'

interface Props {
  notes: { [key: string]: any }
}

const Notes = ({ notes }: Props) => {
  return (
    <div>
      <h1>Notes</h1>
      {notes.map((note: any) => {
        return (
          <div key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.markdown}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Notes
