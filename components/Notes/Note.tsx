import React from 'react'

interface Props {
  title: string
  tag: string
  markdown: string
}

const Note = ({ title, tag, markdown }: Props) => {
  return (
    <div className='bg-stone-100 border-stone-300 hover:border-stone-400 border p-4 rounded-lg relative transition ease-in-out cursor-pointer'>
      <span className='font-semibold text-stone-800'>{title}</span>
      <span className='text-sm absolute bottom-0 right-0 m-1 mr-2'>{tag}</span>
    </div>
  )
}

export default Note
