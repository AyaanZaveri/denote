import React, { useState } from 'react'
import { CgMoreAlt } from 'react-icons/cg'
import { Popover } from '@headlessui/react'

const Notebook = ({ id, title }: { id: string; title: string }) => {
  const [showOptions, setShowOptions] = useState(false)

  return (
    <div className="group inline-flex w-full items-center justify-between rounded-md p-1 pl-2 hover:cursor-pointer hover:bg-gray-100 ">
      <a key={id} href={`/notebook/${id}`}>
        <span className="text-gray-800">{title}</span>
      </a>
      <div>
        <Popover className="flex items-center z-20">
          <Popover.Button>
            <CgMoreAlt
              onClick={() => setShowOptions(!showOptions)}
              className="mr-1 h-5 w-5 rounded text-gray-600 hover:bg-gray-200 group-hover:block"
            />
          </Popover.Button>

          <Popover.Panel className="absolute z-30 mb-16">
            <div className="h-6 w-28 border bg-white p-5">
              <button>Delete</button>
            </div>
          </Popover.Panel>
        </Popover>
      </div>
    </div>
  )
}

export default Notebook
