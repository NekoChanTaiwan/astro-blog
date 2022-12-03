export interface Frontmatter {
  title: string
  description: string
  publishedAt: string

  // options
  updatedAt?: string
  tags: string[]
  comments?: boolean
  pinned?: boolean
  draft?: boolean

  // generated by plugins
  slug: string
  minutesRead: string
}
