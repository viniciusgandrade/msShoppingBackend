"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCategoriesController = void 0;
const responsesHttp_1 = require("../../helpers/responsesHttp");
class GetCategoriesController {
    // eslint-disable-next-line no-useless-constructor
    constructor(prismaGetCategoriesRepository) {
        this.prismaGetCategoriesRepository = prismaGetCategoriesRepository;
    }
    async handle() {
        try {
            const categories = await this.prismaGetCategoriesRepository.getCategories();
            return (0, responsesHttp_1.success)('Sucesso ao ler categorias', 201, categories);
        }
        catch (error) {
            return (0, responsesHttp_1.errorResponse)(error.message);
        }
    }
}
exports.GetCategoriesController = GetCategoriesController;
