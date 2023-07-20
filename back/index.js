//require express
import express from 'express'
//require cors
import cors from 'cors'
//require connectDB
import connectDB from './config/connectDB.js'

import router from './routes/route.js'


//init express 
const app = express()

//Middleware 
app.use(express.json())

//cors 
app.use(cors())
app.options('*', cors())

//connectDB
connectDB();



app.use("/api", router);


//create port 
const port = process.env.PORT || 5000
//launch the server
app.listen(port, (error) =>
    error
        ? console.log(error)
        : console.log(`Server is running on port ${port}`)
)
