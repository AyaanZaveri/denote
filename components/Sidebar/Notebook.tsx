import React from 'react'

const Notebook = ({ title }: { title: string }) => {
  return (
    <div className="w-full rounded-md p-1 pl-2 hover:cursor-pointer  hover:bg-stone-100">
      <span className="text-stone-800">{title}</span>
    </div>
  )
}

export default Notebook
