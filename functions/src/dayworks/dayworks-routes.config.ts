import { Application } from "express"
import { isAuthenticated } from "../auth/authenticated"
import { isAuthorized } from "../auth/authorized"
import { getInRange, update } from "./dayworks.controller"

export function dayworksRoutesConfig(app: Application) {

    // get dayworks in :range for :id user
    app.get(
        '/workers/:id/dayworks/:range', [
        isAuthenticated,
        isAuthorized({hasRole: ['admin', 'manager'], allowSameUser: true}),
        getInRange
    ])

    // update dayworks in :rabge for :id user
    app.patch(
        '/workers/:id/dayworks/:range',
        isAuthenticated,
        isAuthorized({hasRole: ['admin', 'manager'], allowSameUser: true}),
        update
    )
}