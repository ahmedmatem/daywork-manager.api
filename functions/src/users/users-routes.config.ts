import {Application} from "express"
import {isAuthenticated} from "../auth/authenticated"
import {isAuthorized} from "../auth/authorized"
import {all, create, get, patch, remove} from "./users.controller"

export function usersRoutesConfig(app: Application) {
  // create new user
  app.post("/users",[
    isAuthenticated,
    isAuthorized({hasRole: ['admin', 'manager']}),
    create
  ])

  // lists all users
  app.get("/users", [
    isAuthenticated,
    isAuthorized({hasRole: ["admin", "manager"]}),
    all,
  ]);

  // get :id user
  app.get("/users/:id", [
    isAuthenticated,
    isAuthorized({hasRole: ["admin", "manager"], allowSameUser: true}),
    get,
  ]);

  // updates :id user
  app.patch("/users/:id", [
    isAuthenticated,
    isAuthorized({hasRole: ["admin", "manager"], allowSameUser: true}),
    patch,
  ]);

  // deletes :id user
  app.delete("/users/:id", [
    isAuthenticated,
    isAuthorized({hasRole: ["admin", "manager"]}),
    remove,
  ]);
}
