import { Product } from '../../../models/Product'
import { FilterProps } from '../../../models/filter'

export interface ProductsReturn {
  products: Product[]
  totalPages: number
}

export interface IGetProductsRepository {
  getProducts(filter: FilterProps): Promise<ProductsReturn>
}
