import { Request, Response, NextFunction } from 'express'

export default (error: Error, req: Request, res: Response, next: NextFunction): void => {
    if (res.headersSent) {
        return next(error)
    }
    res.status(500).send({
        error: error.message,
        code: 5000,
        handled: false,
    })
    return
}