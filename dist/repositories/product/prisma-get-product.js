"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaGetProductRepository = void 0;
const prismaClient_1 = require("../../api/prismaClient");
class PrismaGetProductRepository {
    async getProduct(id) {
        const product = await prismaClient_1.prisma.product.findFirst({
            where: {
                id,
            },
            include: {
                categorie: {
                    select: {
                        type: true,
                    },
                },
            },
        });
        return product;
    }
}
exports.PrismaGetProductRepository = PrismaGetProductRepository;
