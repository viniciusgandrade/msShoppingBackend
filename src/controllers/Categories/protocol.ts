import { Categories } from '../../models/Categories'

export interface IGetCategoriesRepository {
  getCategories(): Promise<Categories[]>
}
