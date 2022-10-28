import express from 'express';
import userRouter from "./routes/userRouter"
import loginRouter from "./routes/loginRouter";
import {connect} from "mongoose"
const config = require('./utils/config')

const app = express();
app.use(express.json());

console.log('connecting to', config.MONGODB_URI)

connect(config.MONGODB_URI!)
  .then(_result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use('/api/user', userRouter)
app.use('/api/login', loginRouter)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
