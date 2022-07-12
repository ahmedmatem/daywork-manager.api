import { Request, Response } from 'express'
import * as admin from 'firebase-admin'

interface Daywork {
    status: boolean,
    isDefined: boolean,
    day: number,
    diffHours: number
}

const DAYWORKS_BASE_PATH = 'dw'

export async function getInRange(req: Request, res: Response) {
    const {range, id} = req.params

    const db = admin.database()
    const ref = db.ref(`${DAYWORKS_BASE_PATH}/${range}/${id}`)

    try{
        const dayworks = await ref.get()
        return res.status(200).send(dayworks.val())
    } 
    catch(err){
        return handleError(res, err)
    }
    
}

export async function update(req: Request, res: Response) {
    const {range, id} = req.params
    const {dayworks} = req.body

    console.log('Daywowrks - ' + JSON.stringify((dayworks as Daywork[])))

    const db = admin.database()
    let path = (`${DAYWORKS_BASE_PATH}/${range}/${id}`)
    const ref = db.ref(path)    

    try{
        await ref.set(dayworks)
        return res.status(204).send()
    } catch(err){
        return handleError(res, err)
    }
}

function handleError(res: Response, err: any) {
    return res.status(500).send(`message: ${err.code} - ${err.message}`)
}