export interface Household {
  id: string
  name: string
}

export interface User {
  id: string
  name: string
  image: string
  household: Household
}
