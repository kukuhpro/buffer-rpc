import faker from 'faker'


import createError, { rpcError } from '../resource/createError'

describe('createError', () => {
    test('should create an error with default status code', () => {
        const message: string = faker.random.words()
        const error: rpcError = createError({ message })

        expect(error.message).toBe(message)
        expect(error.statusCode).toBe(400)
        expect(error.handled).toBe(true)
        expect(error.rpcError).toBe(true)
    })

    test('should create an error with a custom status code', () => {
        const message: string = faker.random.words()
        const statusCode: number = faker.random.number()
        const error = createError({
            message,
            statusCode,
        })
        expect(error.message).toBe(message)
        expect(error.statusCode).toBe(statusCode)
        expect(error.handled).toBe(true)
        expect(error.rpcError).toBe(true)
    })

    test('should create an error with default code', () => {
        const message: string = faker.random.words()
        const code: number = 1000
        const error = createError({
            message,
        })
        expect(error.message).toBe(message)
        expect(error.code).toBe(code)
        expect(error.handled).toBe(true)
        expect(error.rpcError).toBe(true)
    })

    test('should create an error with custom code', () => {
        const message: string = faker.random.words()
        const code: number = faker.random.number()
        const error = createError({
            message,
            code,
        })
        expect(error.message).toBe(message)
        expect(error.code).toBe(code)
        expect(error.handled).toBe(true)
        expect(error.rpcError).toBe(true)
    })

    test('should create an error that is handled = false', () => {
        const message: string = faker.random.words()
        const handled: boolean = faker.random.boolean()
        const error = createError({
            message,
            handled,
        })
        expect(error.message).toBe(message)
        expect(error.statusCode).toBe(400)
        expect(error.handled).toBe(handled)
        expect(error.rpcError).toBe(true)
    })
})