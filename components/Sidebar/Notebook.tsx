import React, { useState } from 'react'
import { CgMoreAlt } from 'react-icons/cg'
import { Popover } from "@headlessui/react";

const Notebook = ({ title }: { title: string }) => {
  const [showOptions, setShowOptions] = useState(false)

  return (
    <div className="group inline-flex w-full items-center justify-between rounded-md p-1 pl-2 hover:cursor-pointer hover:bg-gray-100">
      <span className="text-gray-800">{title}</span>
      <div>
        <CgMoreAlt
          onClick={() => setShowOptions(!showOptions)}
          className="mr-1 hidden h-5 w-5 rounded text-gray-600 hover:bg-gray-200 group-hover:block"
        />
      </div>
    </div>
  )
}

export default Notebook
