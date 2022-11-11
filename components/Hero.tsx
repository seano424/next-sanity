import React from 'react'
import { urlFor } from '../lib/sanity'
import { HeroData } from '../lib/interfaces'
import Image from 'next/image'

export default function Hero(props: HeroData) {
  return (
    <div className="relative">
      <Image
        className="w-full"
        src={urlFor(props.image?.asset).width(1600).height(600).url()}
        placeholder="blur"
        blurDataURL={urlFor(props.image?.asset)
          .width(1600)
          .height(600)
          .blur(50)
          .url()}
        alt={props.heading ?? 'Hero Image'}
        height={600}
        width={1600}
      />
      <div className="absolute inset-0 flex justify-center items-center">
        <h2 className="text-6xl text-white uppercase">{props.heading}</h2>
      </div>
    </div>
  )
}
