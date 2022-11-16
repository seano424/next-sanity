export type RibbonProps = {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  size?: 'small' | 'medium' | 'large'
  color?: 'amber' | 'green' | 'purple' | 'cyan'
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Styles Lookup
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export default function Ribbon(props: RibbonProps) {
  const { color = 'cyan', size = 'large', position = 'top-right' } = props

  const sizeClasses: Record<typeof size, string> = {
    small: 'w-32',
    medium: 'w-48',
    large: 'w-64',
  }

  const colorClasses: Record<
    typeof color,
    {
      shades: string
      ribbon: string
    }
  > = {
    amber: {
      shades: 'bg-amber-800',
      ribbon: 'bg-amber-300 text-amber-800',
    },
    cyan: {
      shades: 'bg-cyan-800',
      ribbon: 'bg-cyan-300 text-cyan-800',
    },
    purple: {
      shades: 'bg-purple-800',
      ribbon: 'bg-purple-300 text-purple-800',
    },
    green: {
      shades: 'bg-green-800',
      ribbon: 'bg-green-300 text-green-800',
    },
  }

  const positionClasses: Record<
    typeof position,
    {
      wrapper: string
      shadeOne: string
      shadeTwo: string
      ribbon: string
    }
  > = {
    'top-left': {
      wrapper: '-top-2 -left-2',
      shadeOne: 'top-0 right-0',
      shadeTwo: 'bottom-0 left-0',
      ribbon: 'left-0 bottom-0 origin-bottom-left -rotate-45',
    },
    'top-right': {
      wrapper: '-top-2 -right-2',
      shadeOne: 'top-0 left-0',
      shadeTwo: 'bottom-0 right-0',
      ribbon: 'right-0 bottom-0 origin-bottom-right rotate-45',
    },
    'bottom-left': {
      wrapper: '-bottom-2 -left-2',
      shadeOne: 'top-0 left-0',
      shadeTwo: 'bottom-0 right-0',
      ribbon: 'left-0 top-0 origin-top-left rotate-45',
    },
    'bottom-right': {
      wrapper: '-bottom-2 -right-2',
      shadeOne: 'top-0 right-0',
      shadeTwo: 'bottom-0 left-0',
      ribbon: 'right-0 top-0 origin-top-right -rotate-45',
    },
  }

  return (
    <div
      className={`absolute ${positionClasses[position].wrapper} aspect-square overflow-hidden rounded-sm ${sizeClasses[size]}`}
    >
      <div
        className={`absolute w-2 ${positionClasses[position].shadeOne} aspect-square ${colorClasses[color].shades}`}
      ></div>
      <div
        className={`absolute w-2 ${positionClasses[position].shadeTwo} aspect-square bg-amber-800 ${colorClasses[color].shades}`}
      ></div>
      <a
        href="#"
        className={`text-sm font-semibold tracking-wider py-2 absolute text-center ${positionClasses[position].ribbon} w-square-diagonal shadow-sm ${colorClasses[color].ribbon}`}
      >
        Wooohooo
      </a>
    </div>
  )
}
