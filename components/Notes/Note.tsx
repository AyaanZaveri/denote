import React from 'react'

interface Props {
  id: string
  title: string
  tag: string
  markdown: string
}

const Note = ({ id, title, tag, markdown }: Props) => {
  return (
    <a href={`/note/${id}`}>
      <div className="relative cursor-pointer rounded-lg border border-stone-300 bg-stone-100 p-4 transition ease-in-out hover:border-stone-400">
        <div className='flex flex-col'>
          <span className="font-semibold text-stone-800">{title}</span>
          <span className="text-sm text-stone-500">{title}</span>
        </div>
        <span className="absolute bottom-0 right-0 m-1 mr-2 text-[12px]">
          {tag}
        </span>
      </div>
    </a>
  )
}

export default Note
