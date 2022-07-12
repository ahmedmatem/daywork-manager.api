import { Application } from "express"
import { isAuthenticated } from "../auth/authenticated"
import { isAuthorized } from "../auth/authorized"
import { all, get, update } from "./workers.controller"

export function workersRoutingsConfig(app: Application) {
    // get :id worker
    app.get(
        '/workers/:id',
        isAuthenticated,
        isAuthorized({hasRole: ['admin', 'manager'], allowSameUser: true}),
        get
    )

    // list all workers
    app.get(
        '/workers',
        isAuthenticated,
        isAuthorized({hasRole: ['admin', 'manager']}),
        all
    )

    // update :id worker
    app.patch(
        '/workers/:id',
        isAuthenticated,
        isAuthorized({hasRole: ['admin', 'manager'], allowSameUser: true}),
        update
    )
}