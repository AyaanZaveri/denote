import React from 'react'

interface Props {
  title: string
  tag: string
  markdown: string
}

const Note = ({ title, tag, markdown }: Props) => {
  return (
    <div className='bg-stone-100 border p-4 rounded-lg'>
      <span>{title}</span>
    </div>
  )
}

export default Note
