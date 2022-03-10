import React from 'react'

interface Props {
  name: string | null | undefined
  photo: string | null | undefined
}

const Sidebar = ({ name, photo }: Props) => {
  return (
    <div className="h-screen w-60 border-r border-stone-300 bg-stone-50">
      {name}
    </div>
  )
}

export default Sidebar
