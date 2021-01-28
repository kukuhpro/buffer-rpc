import { Request, Response, NextFunction } from 'express'

export default (error: Error, req: Request, res: Response, next: NextFunction): void => {
    if (res.headersSent) {
        return next(error)
    }
    res.status(500).json({
        error: error.message,
        code: 500,
        handled: false,
    })
    return
}