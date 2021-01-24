"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rpcErrorContstruct;
exports.default = (function (_a) {
    var message = _a.message, _b = _a.code, code = _b === void 0 ? 1000 : _b, _c = _a.statusCode, statusCode = _c === void 0 ? 400 : _c, _d = _a.handled, handled = _d === void 0 ? true : _d;
    var error = new rpcErrorContstruct(message);
    error.rpcError = true;
    error.code = code;
    error.statusCode = statusCode;
    error.handled = handled;
    return error;
});
//# sourceMappingURL=createError.js.map