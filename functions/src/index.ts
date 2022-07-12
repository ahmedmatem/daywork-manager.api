import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
import * as express from "express"
import * as bodyParser from "body-parser"
import * as cors from "cors"
import {usersRoutesConfig} from "./users/users-routes.config"
import { dayworksRoutesConfig } from "./dayworks/dayworks-routes.config"
import { workersRoutingsConfig } from "./workers/workers-routes.config"

require('dotenv').config()

admin.initializeApp()

const app = express()
app.use(bodyParser.json())
app.use(cors({origin: true}))

// Routes configurations
usersRoutesConfig(app)
dayworksRoutesConfig(app)
workersRoutingsConfig(app)

export const api = functions.https.onRequest(app)
