import { Request, Response } from 'express'

export interface fnContract {
    (req: Request, res: Response, utils: any, ...args: any): Promise<any>
}

export interface methodContract {
    name: string
    fn: fnContract
    docs: string
}

export default (name: string, ...args: Array<any>): methodContract => ({
    name,
    fn: args[1] ? args[1] : args[0],
    docs: args[1] ? args[0] : undefined,
})  