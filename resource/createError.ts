import { } from 'express'

export interface rpcError extends Error {
    rpcError: boolean
    code: number
    statusCode: number
    handled: boolean
}

interface rpcErrorConstructor {
    new(message?: string): rpcError;
    (message?: string): rpcError;
    readonly prototype: rpcError;
}

let rpcErrorContstruct: rpcErrorConstructor;

export default ({
    message,
    code = 1000,
    statusCode = 400,
    handled = true,
}): rpcError => {
    const error: rpcError = new rpcErrorContstruct(message)
    error.rpcError = true
    error.code = code
    error.statusCode = statusCode
    error.handled = handled
    return error
}