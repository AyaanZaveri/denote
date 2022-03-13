import React, { useState } from 'react'
import { CgMoreAlt } from 'react-icons/cg'
import { Popover } from '@headlessui/react'
import { TrashIcon } from '@heroicons/react/outline'

const Notebook = ({ id, title }: { id: string; title: string }) => {
  const [showOptions, setShowOptions] = useState(false)

  return (
    <div className="group inline-flex w-full items-center justify-between rounded-md p-1 pl-2 hover:cursor-pointer hover:bg-gray-100 ">
      <a key={id} href={`/notebook/${id}`}>
        <span className="text-gray-800">{title}</span>
      </a>
      <div>
        <Popover className="z-20 flex items-center">
          <Popover.Button>
            <CgMoreAlt
              onClick={() => setShowOptions(!showOptions)}
              className="mr-1 h-5 w-5 rounded text-gray-600 hover:bg-gray-200 group-hover:block"
            />
          </Popover.Button>

          <Popover.Panel className="absolute z-30 mb-16">
            <div className="h-12 w-32 border bg-white">
              <div className="inline-flex text-gray-800 hover:text-blue-500">
                <TrashIcon className="h-5 w-5" />
                Delete
              </div>
            </div>
          </Popover.Panel>
        </Popover>
      </div>
    </div>
  )
}

export default Notebook
