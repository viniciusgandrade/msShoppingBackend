"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductsController = void 0;
const responsesHttp_1 = require("../../../helpers/responsesHttp");
class GetProductsController {
    // eslint-disable-next-line no-useless-constructor
    constructor(getProductsRepository) {
        this.getProductsRepository = getProductsRepository;
    }
    async handle(httpRequest) {
        try {
            const filterProps = httpRequest.body;
            const products = await this.getProductsRepository.getProducts(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            filterProps);
            return (0, responsesHttp_1.success)('Sucesso ao buscar produto', 200, products);
        }
        catch (error) {
            return (0, responsesHttp_1.errorResponse)(error.message);
        }
    }
}
exports.GetProductsController = GetProductsController;
