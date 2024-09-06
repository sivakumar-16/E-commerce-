import express, { Request, Response } from 'express'
import cors from 'cors'
import { checkConnection } from './dbConfig'

const app = express()
app.use(cors())
const PORT = 3000

app.get('/',(req:Request,res:Response)=>{
    res.send('successfully conected')
})

app.listen(PORT,()=>{
    console.log(`server is conected on ${PORT} 🫣`);
    checkConnection()
})

