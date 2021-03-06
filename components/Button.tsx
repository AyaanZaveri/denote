import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

interface Props {
  children?: string | number
  variant: string
  icon?: string
  solid?: boolean
  onClick?: () => void
}

const variants: { [key: string]: string } = {
  ring: 'inline-flex items-center rounded-md border border-zinc-200 bg-white px-3 py-2 text-zinc-600 shadow-sm transition ease-in-out hover:bg-zinc-50 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200 active:bg-blue-100',
  ringDark:
    'inline-flex items-center rounded-md border border-zinc-200 px-3 py-2 text-zinc-600 shadow-xl transition ease-in-out focus:border-blue-700 focus:outline-none focus:ring focus:ring-blue-300 active:bg-zinc-900 border-zinc-600 bg-zinc-700 text-white hover:bg-zinc-800',
}

const Button = ({ children, variant, icon, solid = false, onClick }: Props) => {
  const Icon: ComponentType<{ className: string }> = solid
    ? dynamic(
        () => import('@heroicons/react/solid').then((mod) => mod[icon!]) as any
      )
    : dynamic(
        () =>
          import('@heroicons/react/outline').then((mod) => mod[icon!]) as any
      )

  return (
    <div>
      <button className={variants[variant]} onClick={onClick}>
        {icon ? <Icon className={`-ml-1 mr-2 h-5 w-5`} /> : ''}
        {children}
      </button>
    </div>
  )
}

export default Button
