import express, { json } from "express"
import cors from "cors"
import router from "./routes/router.js"

const server = express()
server.use(cors())
server.use(json())
server.use(router)

server.listen(5000, () => {
    console.log("Connected in port 5000!")
})