import express from 'express';
import userRouter from "./routes/userRouter"
import loginRouter from "./routes/loginRouter";
import shotgroupRouter from "./routes/shotgroupRouter"
import bbcourtsRouter from "./routes/bbcourtsRouter"
import {connect} from "mongoose"
const config = require('./utils/config')
const cors = require('cors')


const app = express();
app.use(cors())
app.use(express.json());

console.log('connecting to', config.MONGODB_URI)

const unknownEndpoint = (_request:any, response:any) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

connect(config.MONGODB_URI!)
  .then(_result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use('/api/user', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/shotgroup', shotgroupRouter)
app.use('/api/courts', bbcourtsRouter)
app.use(unknownEndpoint)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
