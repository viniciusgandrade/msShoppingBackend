"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.success = exports.notFound = void 0;
function notFound(message) {
    return {
        code: 503,
        body: {
            msg: message,
            ok: false,
            status: 503,
        },
    };
}
exports.notFound = notFound;
function success(message, code, data) {
    return {
        body: {
            msg: message,
            ok: true,
            status: code,
            data,
        },
        code,
    };
}
exports.success = success;
function errorResponse(message) {
    return {
        code: 500,
        body: {
            msg: message,
            ok: false,
            status: 500,
        },
    };
}
exports.errorResponse = errorResponse;
