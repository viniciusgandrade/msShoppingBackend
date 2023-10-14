"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabaseRoute = void 0;
const path_1 = __importDefault(require("path"));
const prismaClient_1 = require("../api/prismaClient");
const sendToS3_1 = require("../api/sendToS3");
const authDrive_1 = require("../auth/drive/authDrive");
const getTypes_1 = require("../helpers/getTypes");
const csvtojson_1 = __importDefault(require("csvtojson"));
async function seedDatabaseRoute(app) {
    app.get('/seedDatabase', async (request, reply) => {
        const jsonCSV = await (0, csvtojson_1.default)().fromFile(path_1.default.resolve(__dirname, '..', 'temp', 'data.csv'));
        const files = await (0, authDrive_1.authorize)()
            .then((authClient) => (0, authDrive_1.listFiles)(authClient, jsonCSV.map((i) => i.Fotos)))
            .catch(console.error);
        const filteredFiles = jsonCSV
            ?.map((item) => {
            const type = (0, getTypes_1.getTypes)(item.Tipo.toLocaleLowerCase());
            return {
                sizes: item.Tamanho.includes(',')
                    ? item.Tamanho.split(',')
                    : [item.Tamanho],
                name: item.Nome,
                price: Number(item['Preço']),
                type,
                fileId: files?.find((file) => file.name === item.Fotos)?.id,
            };
        })
            .filter((item) => item.fileId);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const photos = await (0, authDrive_1.authorize)()
            .then((auth) => (0, authDrive_1.donwloadPhotos)(filteredFiles, auth))
            .catch(console.error);
        const ret = [];
        for (const photo of photos) {
            const finalPath = await (0, sendToS3_1.compressImage)(photo.path);
            const allCategories = await prismaClient_1.prisma.categories.findMany();
            const createdProduct = await prismaClient_1.prisma.product.create({
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                data: {
                    imgUrl: finalPath,
                    name: photo.name,
                    price: photo.price,
                    categoriesId: allCategories.find((categorie) => categorie.type === photo.type?.type)?.id,
                    sizes: photo.sizes,
                },
            });
            ret.push(createdProduct);
        }
        reply.send(ret);
    });
}
exports.seedDatabaseRoute = seedDatabaseRoute;
