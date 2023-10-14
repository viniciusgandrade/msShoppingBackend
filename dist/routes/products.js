"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsRoute = void 0;
const prisma_get_products_1 = require("../repositories/product/prisma-get-products");
const get_products_1 = require("../controllers/Products/get-products/get-products");
const prisma_get_product_1 = require("../repositories/product/prisma-get-product");
const get_product_1 = require("../controllers/Products/get-product/get-product");
async function getProductsRoute(app) {
    app.get('/getProducts', async (request, reply) => {
        const prismaGetProductsRepository = new prisma_get_products_1.PrismaGetProducts();
        const getProductsController = new get_products_1.GetProductsController(prismaGetProductsRepository);
        const products = await getProductsController.handle({
            body: request?.query,
        });
        reply.status(products.code).send(products.body);
    });
    app.get('/product/:id', async (request, reply) => {
        const prismaGetProductRepository = new prisma_get_product_1.PrismaGetProductRepository();
        const getProductController = new get_product_1.GetProductController(prismaGetProductRepository);
        const product = await getProductController.handle({
            body: request?.params,
        });
        reply.code(product.code).send(product.body);
    });
}
exports.getProductsRoute = getProductsRoute;
