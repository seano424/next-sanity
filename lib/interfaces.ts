export interface ArticleData {
  _createdAt: string
  _id: string
  _rev: string
  _type: string
  _updatedAt: string
  content: string
  slug: {
    _type: string
    current: string
  }
  title: string
}

export interface HeroData {
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

export interface TextWithIllustrationData {
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
