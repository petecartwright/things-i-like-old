export interface Place {
  name: string
  orderAgain?: string
  location?: string
  imageUrl?: string
  notes?: string
  websiteUrl?: string
  deliversToTheHouse?: boolean
  lastUpdatedAt?: string
  createdAt?: string
  items?: Item[]
  deleted?: boolean
  deletedAt?: string
}

export interface Item {
  name: string
  orderAgain?: string
  imageUrl?: string
  notes?: string
  lastUpdatedAt?: string
  createdAt?: string
  deleted?: boolean
  deletedAt?: string
}
