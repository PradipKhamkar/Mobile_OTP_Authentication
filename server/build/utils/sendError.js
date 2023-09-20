"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = void 0;
const sendError = (res, statusCode, message, error) => {
    res.status(statusCode).json({
        message,
        error,
    });
};
exports.sendError = sendError;
