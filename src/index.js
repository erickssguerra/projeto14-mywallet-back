import express, { json } from "express"
import cors from "cors"
import router from "./routes/router.js"

const server = express()
server.use(cors())
server.use(json())
server.use(router)

const port = process.env.PORT || 5000
server.listen(port, () => {
    console.log(`Server running in port ${port}.`)
})