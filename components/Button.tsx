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
  ring: 'inline-flex items-center rounded-md border border-stone-200 bg-white px-3 py-2 text-stone-600 shadow-sm transition ease-in-out hover:bg-stone-50 focus:border-rose-500 focus:outline-none focus:ring focus:ring-rose-200 active:bg-rose-100',
  ringDark:
    'inline-flex items-center rounded-md border border-stone-200 px-3 py-2 text-stone-600 shadow-xl transition ease-in-out focus:border-rose-700 focus:outline-none focus:ring focus:ring-rose-300 active:bg-stone-900 border-stone-600 bg-stone-700 text-white hover:bg-stone-800',
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
