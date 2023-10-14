"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductController = void 0;
const responsesHttp_1 = require("../../../helpers/responsesHttp");
class GetProductController {
    // eslint-disable-next-line no-useless-constructor
    constructor(getProductRepository) {
        this.getProductRepository = getProductRepository;
    }
    async handle(httpRequest) {
        try {
            const { id } = httpRequest.body;
            const product = await this.getProductRepository.getProduct(id);
            if (!product)
                return (0, responsesHttp_1.notFound)('Não foi possivel achar produto');
            return (0, responsesHttp_1.success)('Produto retornado com sucesso', 200, product);
        }
        catch (error) {
            return (0, responsesHttp_1.errorResponse)(error.message);
        }
    }
}
exports.GetProductController = GetProductController;
