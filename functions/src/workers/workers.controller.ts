import { Request, Response } from "express"
import * as admin from 'firebase-admin'

const WORKERS_END_POINT = 'workers'

export interface Worker {
    id: string,
    name: string,
    registratedOn: string,
    registratedOnInMillis: number,
    isSyncRequired: boolean,
    autoTracking: boolean,
    trackingDays: {day: string, tracked: boolean}[]
}

export async function get(req: Request, res: Response) {
    const { id } = req.params

    const db = admin.database()
    const ref = db.ref(`${WORKERS_END_POINT}/${id}`)
    try{
        const worker = (await ref.get()).val()
        return res.status(200).send(worker)
    } catch(err){
        return handleError(res, err)
    }
}

export async function all(req: Request, res: Response) {
    const db = admin.database()
    const ref = db.ref(`${WORKERS_END_POINT}`)
    try{
        const workers = (await ref.get()).val()
        return res.status(200).send(workers)
    } catch (err){
        return handleError(res, err)
    }
}

export async function update(req: Request, res: Response) {
    const { worker } = req.body
    const db = admin.database()
    const ref = db.ref(`${WORKERS_END_POINT}/${(worker as Worker)?.id}`)
    try {
        await ref.set(worker)
        return res.status(204).send()
    } catch(err) {
        return handleError(res, err)
    }
}

function handleError(res: Response, err: any) {
    return res.status(500).send(`message: ${err.code} - ${err.message}`)
}