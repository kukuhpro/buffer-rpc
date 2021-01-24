"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (allMethods, utils) {
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
    return function (req, res, next) {
        if (!req.body) {
            next(new Error('no req.body found, is app.use(bodyParser.json()) hooked up?'));
            return;
        }
        var _a = req.body, bodyName = _a.name, args = _a.args;
        var headers = req.headers;
        var name = req.params.method || headers['x-buffer-rpc-name'] || bodyName;
        var matchingMethod = allMethods.find(function (method) { return method.name === name; });
        if (matchingMethod.name == "methods") {
            res.send(__spreadArrays([
                {
                    name: 'methods',
                    docs: 'list all available methods',
                }
            ], allMethods.map(function (_a) {
                var name = _a.name, docs = _a.docs;
                return ({
                    name: name,
                    docs: docs,
                });
            })));
            return;
        }
        else if (matchingMethod) {
            var parsedArgs = args ? JSON.parse(args) : [];
            var promise = void 0;
            try {
                var fnResult = Array.isArray(parsedArgs) ? matchingMethod.fn.apply(matchingMethod, __spreadArrays([req, res, utils], parsedArgs)) : matchingMethod.fn(req, res, utils, parsedArgs);
                promise = fnResult;
            }
            catch (error) {
                promise = Promise.reject(error);
            }
            promise.then(function (result) { return res.send({ result: result }); }).catch(function (error) {
                if (error.rpcError) {
                    var bugsnag = req.app.get('bugsnag');
                    if (bugsnag) {
                        bugsnag.notify(error);
                    }
                    res.status(error.statusCode || 400).send({
                        error: error.message,
                        code: error.code,
                        handled: error.handled,
                    });
                    return;
                }
                else {
                    next(error);
                    return;
                }
                return;
            });
        }
        else {
            res.status(404).send({
                error: 'unknown method',
                code: 404,
                handled: true,
            });
            return;
        }
    };
});
//# sourceMappingURL=rpc.js.map