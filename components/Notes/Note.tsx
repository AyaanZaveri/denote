import React from 'react'
import luxon, { DateTime } from 'luxon'

interface Props {
  id: string
  timestamp: {
    seconds: number
  }
  title: string
  tag: string
  markdown: string
}

const Note = ({ id, timestamp, title, tag, markdown }: Props) => {
  // create a function to convert unix seconds to time with luxon

  const seconds = timestamp?.seconds

  const convertTime = (unixTime: number) => {
    const date = DateTime.fromSeconds(unixTime)
    return date.toFormat('LLLL dd, yyyy')
  }

  return (
    <a href={`/note/${id}`}>
      <div className="relative cursor-pointer rounded-lg border border-stone-300 bg-stone-100 p-4 transition ease-in-out hover:border-stone-400">
        <div className="flex flex-col">
          <span className="font-semibold text-stone-800">{title}</span>
          <span className="text-sm text-stone-500">
            {convertTime(seconds)}
          </span>
        </div>
        <span className="absolute bottom-0 right-0 m-1 mr-2 text-[12px]">
          {tag}
        </span>
      </div>
    </a>
  )
}

export default Note
