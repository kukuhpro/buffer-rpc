import { Request, Response } from 'express'
import faker from 'faker'

import method, { fnContract } from '../resource/method'

describe('method', () => {
    test('should create a method', () => {
        const name: string = faker.random.word()
        const fn = (req: Request, res: Response, utils: any, ...args: any): Promise<any> => {
            return Promise.resolve(1)
        }
        expect(method(name, fn)).toEqual({
            name,
            fn,
        })
    })

    test('should create a method with docs', () => {
        const name: string = faker.random.word()
        const fn: fnContract = (req: Request, res: Response, utils: any, ...args: any): Promise<any> => {
            return Promise.resolve(1)
        }
        const docs: string = faker.random.words()
        expect(method(name, docs, fn)).toEqual({
            name,
            fn,
            docs,
        })
    })
})