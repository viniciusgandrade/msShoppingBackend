export interface Product {
  id?: string
  name: string
  price: number
  imgUrl: string
  type?: {
    Sex: string
    type: string
  }
  sizes: Array<string>
  categoriesId: string
  path?: string
}
