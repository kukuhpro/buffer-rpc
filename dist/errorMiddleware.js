"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (error, req, res, next) {
    if (res.headersSent) {
        return next(error);
    }
    res.status(500).send({
        error: error.message,
        code: 5000,
        handled: false,
    });
    return;
});
//# sourceMappingURL=errorMiddleware.js.map