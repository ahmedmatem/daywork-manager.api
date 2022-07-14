import { Application } from "express"
import { isAuthenticated } from "../auth/authenticated"
import { isAuthorized } from "../auth/authorized"
import { getInRange, update } from "./dayworks.controller"

export function dayworksRoutesConfig(app: Application) {

    // get dayworks in :range
    app.get(
        '/dayworks/:range/:id', [
        isAuthenticated,
        isAuthorized({hasRole: ['admin', 'manager'], allowSameUser: true}),
        getInRange
    ])

    // // get all users dayworks in :range
    // app.get(
    //     '/dayworks/all/:range', [
    //     isAuthenticated,
    //     isAuthorized({hasRole: ['admin', 'manager']}),
    //     allInRange
    // ])

    // update dayworks in :range for :id user
    app.patch(
        '/dayworks/:range/:id', [
        isAuthenticated,
        isAuthorized({hasRole: ['admin', 'manager'], allowSameUser: true}),
        update
    ])
}