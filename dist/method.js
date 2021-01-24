"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (name) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return ({
        name: name,
        fn: args[1] ? args[1] : args[0],
        docs: args[1] ? args[0] : undefined,
    });
});
//# sourceMappingURL=method.js.map