import React from 'react'
import Note from './Note'

interface Props {
  notes: { [key: string]: any }
}

const Notes = ({ notes }: Props) => {
  return (
    <div className='flex flex-col gap-3'>
      {notes.map((note: any) => {
        return <Note key={note.id} title={note.title} tag={note.tag} markdown={note.markdown}  />
      })}
    </div>
  )
}

export default Notes
