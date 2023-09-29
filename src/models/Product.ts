export interface Product {
  id?: string
  name: string
  price: number
  imgUrl: string
  type: {
    sex: string
    type: string
  }
  sizes: Array<string>
  path?: string
}
