import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { fileURLToPath } from 'url'
import path from 'path'
import ProductRoute from './router/ProductRoute.js'

//Config
const app = express()
app.use(express.json())
dotenv.config
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

//Config Upload File
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/public", express.static(path.join(__dirname, "public")));

//Server
app.listen(process.env.PORT,() =>{
    console.log("Aplikasi Berjalan di PORT 3223")
})

//Router
app.use(ProductRoute)