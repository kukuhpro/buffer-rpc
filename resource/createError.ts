export interface rpcError extends Error {
    rpcError: boolean
    code: number
    statusCode: number
    handled: boolean
}

export default ({
    message,
    code = 1000,
    statusCode = 400,
    handled = true,
}): rpcError => {
    const error: any = new Error(message)
    error.rpcError = true
    error.code = code
    error.statusCode = statusCode
    error.handled = handled
    return error
}