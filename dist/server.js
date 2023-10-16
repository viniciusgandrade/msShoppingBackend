"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const prismaClient_1 = require("./api/prismaClient");
const products_1 = require("./routes/products");
const categories_1 = require("./routes/categories");
const fastify = (0, fastify_1.default)();
async function main() {
    fastify.register(cors_1.default, {
        origin: true,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    process.config();
    // fastify.register(seedDatabaseRoute)
    fastify.register(products_1.getProductsRoute);
    fastify.register(categories_1.getCategoriesRoute);
}
main()
    .then(async () => {
    await prismaClient_1.prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prismaClient_1.prisma.$disconnect();
    process.exit(1);
});
const start = async () => {
    try {
        await fastify.listen({ port: 3333, host: '0.0.0.0' });
        console.log('Listining on port 3333');
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
