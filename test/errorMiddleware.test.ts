import { getMockReq, getMockRes } from '@jest-mock/express'

import errorMiddleware from '../resource/errorMiddleware'

interface Inter {
    status(): string
}

describe('errorMiddleware', () => {
    test('should return a json error response', () => {
        const { res, next, clearMockRes } = getMockRes()
        const req = getMockReq()

        const err: Error = new Error("Error from getting into this test")

        errorMiddleware(err, req, res, next)
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                error: err.message
            })
        )
    })

    test('should calling next function', () => {
        const { res, next, clearMockRes } = getMockRes()
        const req = getMockReq()

        const err: Error = new Error("Error from getting into this test")
        res.headersSent = true
        errorMiddleware(err, req, res, next)
        expect(next).toHaveBeenCalled()
    })
})