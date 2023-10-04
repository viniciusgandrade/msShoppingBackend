import {
  errorResponse,
  notFound,
  success,
} from '../../../helpers/responsesHttp'
import { Product } from '../../../models/Product'
import { HttpRequest, HttpResponse, IController } from '../../protocols'
import { GetProductProps, IGetProductRepository } from './protocols'

export class GetProductController implements IController<Product> {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly getProductRepository: IGetProductRepository) {}

  async handle(
    httpRequest: HttpRequest<GetProductProps>,
  ): Promise<HttpResponse<Product | unknown>> {
    try {
      const { id } = httpRequest.body

      const product = await this.getProductRepository.getProduct(id)

      if (!product) return notFound('Não foi possivel achar produto')

      return success('Produto retornado com sucesso', 200, product)
    } catch (error: any) {
      return errorResponse(error.message)
    }
  }
}
