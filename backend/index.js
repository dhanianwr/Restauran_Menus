import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

const app = express()
app.use(express.json())
dotenv.config
app.use(cors({ credential: true, origin: "LINK frontend"}))

const PORT = 3224

app.listen(PORT,() =>{
    console.log("Aplikasi Berjalan di PORT 3224")
})