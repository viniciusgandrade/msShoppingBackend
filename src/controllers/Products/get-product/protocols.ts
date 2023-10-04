import { Product } from '../../../models/Product'

export interface IGetProductRepository {
  getProduct(id: string): Promise<Product | null>
}

export interface GetProductProps {
  id: string
}
