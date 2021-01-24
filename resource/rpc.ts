import { Request, Response, NextFunction } from 'express'
import { IncomingHttpHeaders } from 'http'

import { methodContract } from './method'
import { rpcError } from './createError'


interface rpcHandleCb {
    (req: Request, res: Response, next: NextFunction): void
}

interface targetItemBody {
    name: string
    args: any
}

interface rpcCustomHeader extends IncomingHttpHeaders {
    'x-buffer-rpc-name'?: string;
}

export default (allMethods: Array<methodContract>, utils: object, ...rest: Array<any>): rpcHandleCb => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!req.body) {
            next(new Error('no req.body found, is app.use(bodyParser.json()) hooked up?'))
            return
        }
        const { name: bodyName, args }: targetItemBody = req.body
        const headers: rpcCustomHeader = req.headers
        const name: string = req.params.method || headers['x-buffer-rpc-name'] || bodyName

        const matchingMethod: methodContract = allMethods.find(method => method.name === name)
        if (matchingMethod.name == "methods") {
            res.send([
                {
                    name: 'methods',
                    docs: 'list all available methods',
                },
                ...allMethods.map(({ name, docs }) => ({
                    name,
                    docs,
                })),
            ])
            return
        } else if (matchingMethod) {
            const parsedArgs: any = args ? JSON.parse(args) : []
            let promise: Promise<any>
            try {
                const fnResult: Promise<any> = Array.isArray(parsedArgs) ? matchingMethod.fn(req, res, utils, ...parsedArgs) : matchingMethod.fn(req, res, utils, parsedArgs)

                promise = fnResult
            } catch (error: any) {
                promise = Promise.reject(error)
            }
            promise.then((result: any) => res.send({ result })).catch((error: rpcError) => {
                if (error.rpcError) {
                    const bugsnag = req.app.get('bugsnag')
                    if (bugsnag) {
                        bugsnag.notify(error)
                    }
                    res.status(error.statusCode || 400).send({
                        error: error.message,
                        code: error.code,
                        handled: error.handled,
                    })
                    return
                } else {
                    next(error)
                    return
                }
                return
            })
        } else {
            res.status(404).send({
                error: 'unknown method',
                code: 404,
                handled: true,
            })
            return
        }
    }
}