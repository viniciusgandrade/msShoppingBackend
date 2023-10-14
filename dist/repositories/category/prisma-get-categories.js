"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaGetCategoriesRepository = void 0;
const prismaClient_1 = require("../../api/prismaClient");
class PrismaGetCategoriesRepository {
    async getCategories() {
        const categories = await prismaClient_1.prisma.categories.findMany();
        return categories;
    }
}
exports.PrismaGetCategoriesRepository = PrismaGetCategoriesRepository;
