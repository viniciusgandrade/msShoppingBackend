import { success, errorResponse } from '../../../helpers/responsesHttp'
import { Product } from '../../../models/Product'
import { FilterProps } from '../../../models/filter'
import { HttpRequest, HttpResponse, IController } from '../../protocols'
import { IGetProductsRepository, ProductsReturn } from './protocols'

export class GetProductsController implements IController<unknown> {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly getProductsRepository: IGetProductsRepository) {}

  async handle(
    httpRequest: HttpRequest<FilterProps>,
  ): Promise<HttpResponse<unknown>> {
    try {
      const filterProps = httpRequest.body

      const products: ProductsReturn =
        await this.getProductsRepository.getProducts(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          filterProps!,
        )

      return success('Sucesso ao buscar produto', 200, products)
    } catch (error: any) {
      return errorResponse(error.message)
    }
  }
}
