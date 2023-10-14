"use strict";
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.compressImage = exports.multerConfig = void 0;
const multer_1 = __importDefault(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1.default.config.update({
    accessKeyId: 'AKIA3I4LWLQ6VD2K577R',
    secretAccessKey: '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',
    region: 'sa-east-1',
});
const s3 = new aws_sdk_1.default.S3();
const upload = (params) => {
    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
};
exports.multerConfig = {
    dest: node_path_1.default.resolve(__dirname, '..', 'tmps', 'imgs'),
    storage: multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, node_path_1.default.resolve(__dirname, '..', 'tmps', 'imgs'));
        },
        filename: (req, file, cb) => {
            const fileName = Date.now().toString() + '-' + file.originalname;
            cb(null, fileName);
        },
    }),
    limits: {
        fileSize: 3 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpg', 'image/jpeg', 'image/pjpeg', 'image/png'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid Format'));
        }
    },
};
const compressImage = async (photo) => {
    try {
        const name = String(Date.now());
        const data = await (0, sharp_1.default)(photo)
            .resize(720)
            .toFormat('webp')
            .webp({ quality: 75 })
            .toBuffer();
        const params = {
            Bucket: 'msshopping',
            Key: name,
            Body: data,
            ACL: 'public-read',
            ContentEncoding: 'webp',
            ContentType: `image/webp`,
        };
        const finalPath = await upload(params);
        (0, exports.deleteImage)(node_path_1.default.resolve(process.cwd(), 'src', 'temp', 'imgs', name + '.webp'));
        return finalPath.Location;
    }
    catch (err) {
        (0, exports.deleteImage)(node_path_1.default.resolve(process.cwd(), 'src', 'temp', 'imgs', name));
    }
};
exports.compressImage = compressImage;
const deleteImage = (filePath) => {
    node_fs_1.default.access(filePath, node_fs_1.default.constants.R_OK, (err) => {
        if (!err) {
            const pathFile = filePath;
            node_fs_1.default.unlink(pathFile, (err) => {
                console.log(err);
            });
        }
    });
};
exports.deleteImage = deleteImage;
