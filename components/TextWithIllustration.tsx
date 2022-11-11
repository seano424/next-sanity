import React from 'react'

interface TextWithIllustrationProps {
  _key: string
  _type: string
  heading: string
  image: {
    _type: string
    asset: {
      _ref: string
      _type: string
    }
  }
}

export default function TextWithIllustration(props: TextWithIllustrationProps) {
  return <div>TextWithIllustration</div>
}
