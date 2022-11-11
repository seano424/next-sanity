import React from 'react'

interface HeroProps {
  heading?: string
  image?: {
    _type: string
    asset: {
      _ref: string
      _type: string
    }
  }
  _type: string
  tagline?: string
  _key?: string
}

export default function Hero(props: HeroProps) {
  return <div>Hero</div>
}
