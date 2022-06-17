export interface Place {
  // unique identifier for this place
  name: string
  // human readable version of the name
  humanName: string

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
  // unique identifier for this item at this place
  name: string
  // human readable version of the name
  humanName: string

  createdAt?: string
  deleted?: boolean
  deletedAt?: string
  imageUrl?: string
  lastUpdatedAt?: string
  notes?: string
  orderAgain?: string
}
