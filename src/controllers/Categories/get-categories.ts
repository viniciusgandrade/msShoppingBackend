import { errorResponse, success } from '../../helpers/responsesHttp'
import { Categories } from '../../models/Categories'
import { HttpRequest, HttpResponse, IController } from '../protocols'
import { IGetCategoriesRepository } from './protocol'

export class GetCategoriesController implements IController<unknown> {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly prismaGetCategoriesRepository: IGetCategoriesRepository,
  ) {}

  async handle(): Promise<HttpResponse<unknown>> {
    try {
      const categories =
        await this.prismaGetCategoriesRepository.getCategories()

      return success('Sucesso ao ler categorias', 201, categories)
    } catch (error: any) {
      return errorResponse(error.message)
    }
  }
}
