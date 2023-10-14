"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaGetProducts = void 0;
const prismaClient_1 = require("../../api/prismaClient");
class PrismaGetProducts {
    async getProducts(filter) {
        const skipProducts = Number(filter?.page) * 10 - 10;
        const sizesArray = filter.sizes !== '' ? filter.sizes?.split(',') : undefined;
        const orderByPrices = filter?.price === 'true' || filter.price === undefined;
        const higherPrices = orderByPrices ? 'desc' : 'asc';
        const count = await prismaClient_1.prisma.product.count({
            where: {
                name: {
                    contains: filter?.productName ?? '',
                    mode: 'insensitive',
                },
                categoriesId: {
                    contains: filter?.category ?? '',
                },
                sizes: {
                    hasSome: sizesArray ?? ['P', 'M', 'G', 'GG'],
                },
                categorie: {
                    Sex: {
                        // @ts-ignore
                        in: filter?.sex ?? ['masculino', 'feminina', 'unisex'],
                        mode: 'insensitive',
                    },
                },
            },
        });
        const totalPages = Math.round(count / 10);
        // @ts-ignore
        const Products = await prismaClient_1.prisma.product.findMany({
            take: 10,
            skip: skipProducts,
            where: {
                name: {
                    contains: filter?.productName ?? '',
                    mode: 'insensitive',
                },
                categoriesId: {
                    contains: filter?.category ?? '',
                },
                sizes: {
                    hasSome: sizesArray ?? ['P', 'M', 'G', 'GG'],
                },
                categorie: {
                    Sex: {
                        // @ts-ignore
                        in: filter.sex ?? ['masculino', 'feminina', 'unisex'],
                        mode: 'insensitive',
                    },
                },
            },
            orderBy: {
                price: higherPrices,
            },
            select: {
                id: true,
                imgUrl: true,
                name: true,
                price: true,
                sizes: true,
                categorie: {
                    select: {
                        Sex: true,
                        type: true,
                    },
                },
            },
        });
        return { products: [...Products], totalPages };
    }
}
exports.PrismaGetProducts = PrismaGetProducts;
