export interface Place {
  name: string

  createdAt?: string
  deleted?: boolean
  deletedAt?: string
  deliversToTheHouse?: boolean
  imageUrl?: string
  items?: Item[]
  lastUpdatedAt?: string
  location?: string
  notes?: string
  orderAgain?: string
  websiteUrl?: string
}

export interface Item {
  name: string

  createdAt?: string
  deleted?: boolean
  deletedAt?: string
  imageUrl?: string
  lastUpdatedAt?: string
  notes?: string
  orderAgain?: string
}
