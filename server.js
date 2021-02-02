require('dotenv').config()
const { PORT = 4000, NODE_ENV = "development" } = process.env;
const express = require('express')
const logger = require('morgan')
const app = express()

// Add the middleware code needed to accept incoming data and add it to req.body
app.use(logger('dev'));
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//CORS
const cors = require("cors");
const corsOptions = require("./configs/cors.js");

////////////
//MIDDLEWARE
////////////
NODE_ENV === "production" ? app.use(cors(corsOptions)) : app.use(cors());


// --- IMPORT THE COOKBOOK CONTROLLER ---
const cookbookRouter = require('./controllers/cookbookRoutes')
app.use('/api/cookbooks/', cookbookRouter)

// --- IMPORT THE AUTHOR CONTROLLER ---
const authorRouter = require('./controllers/authorRoutes')
app.use('/api/authors/', authorRouter)

app.listen(4000, () => console.log('Server running on port 4000!'))
