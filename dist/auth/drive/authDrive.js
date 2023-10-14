"use strict";
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.donwloadPhotos = exports.listFiles = exports.authorize = exports.saveCredentials = void 0;
const promises_1 = require("node:fs/promises");
const path_1 = __importDefault(require("path"));
const node_fs_1 = __importDefault(require("node:fs"));
const process_1 = __importDefault(require("process"));
const local_auth_1 = require("@google-cloud/local-auth");
const googleapis_1 = require("googleapis");
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = path_1.default.join(process_1.default.cwd(), 'token.json');
const CREDENTIALS_PATH = path_1.default.join(process_1.default.cwd(), 'credentials.json');
async function loadSavedCredentialsIfExist() {
    try {
        const content = await (0, promises_1.readFile)(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return googleapis_1.google.auth.fromJSON(credentials);
    }
    catch (err) {
        console.log(err);
    }
}
async function saveCredentials(client) {
    const content = await (0, promises_1.readFile)(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await (0, promises_1.writeFile)(TOKEN_PATH, payload);
}
exports.saveCredentials = saveCredentials;
/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await (0, local_auth_1.authenticate)({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}
exports.authorize = authorize;
async function listFiles(authClient, data) {
    const drive = googleapis_1.google.drive({ version: 'v3', auth: authClient });
    const notFound = [];
    const files = [];
    for (const item of data) {
        const res = await drive.files.list({
            pageSize: 1,
            q: `name="${item}"`,
            fields: 'nextPageToken, files(id, name)',
        });
        if (!res.data.files?.length) {
            notFound.push(item);
        }
        else {
            files.push(res?.data.files[0]);
        }
    }
    if (files.length === 0) {
        console.log('No files found.');
        return;
    }
    return files.map((file) => {
        return {
            name: file.name,
            id: file.id,
        };
    });
}
exports.listFiles = listFiles;
async function donwloadPhotos(photos, authClient) {
    const drive = googleapis_1.google.drive({ version: 'v3', auth: authClient });
    const images = [];
    for (const i of photos) {
        const way = path_1.default.resolve(__dirname, '..', '..', 'temp', 'imgs', Date.now() + '.webp');
        const dest = node_fs_1.default.createWriteStream(way);
        const res = await drive.files.get({
            fileId: i.fileId,
            alt: 'media',
        }, {
            responseType: 'stream',
        });
        res.data.on('end', () => {
            images.push({
                ...i,
                path: way,
            });
        });
        res.data.pipe(dest);
    }
    return images;
}
exports.donwloadPhotos = donwloadPhotos;
