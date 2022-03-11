import React from 'react'
import Notebook from './Notebook'

const Notebooks = () => {
  return (
    <div>
      <span className="mt-5 inline-flex items-center gap-2 text-left text-xl font-bold text-stone-800">
        Notebooks
      </span>
      <div className="mt-1 flex w-full flex-col">
        <Notebook title="🏫 School" />
        <Notebook title="⚽️ Sports" />
        <Notebook title="✖️ Math" />
      </div>
    </div>
  )
}

export default Notebooks
