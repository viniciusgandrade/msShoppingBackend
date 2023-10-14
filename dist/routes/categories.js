"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoriesRoute = void 0;
const prisma_get_categories_1 = require("../repositories/category/prisma-get-categories");
const get_categories_1 = require("../controllers/Categories/get-categories");
const getTypes_1 = require("../helpers/getTypes");
const prismaClient_1 = require("../api/prismaClient");
async function getCategoriesRoute(app) {
    app.get('/getCategories', async (request, reply) => {
        const prismaGetCategoriesRepository = new prisma_get_categories_1.PrismaGetCategoriesRepository();
        const getCategoriesController = new get_categories_1.GetCategoriesController(prismaGetCategoriesRepository);
        const categories = await getCategoriesController.handle();
        reply.code(categories.code).send(categories.body);
    });
    app.get('/seedCategories', async () => {
        for (const key in getTypes_1.types) {
            await prismaClient_1.prisma.categories.create({
                data: {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    Sex: getTypes_1.types[key].sex,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    type: getTypes_1.types[key].type,
                },
            });
        }
        return await prismaClient_1.prisma.categories.findMany();
    });
}
exports.getCategoriesRoute = getCategoriesRoute;
