import express from 'express';
import userRouter from "./routes/userRouter"
import {connect} from "mongoose"

const app = express();
app.use(express.json());

const url = "process.env.MONGODB_URI"

console.log('connecting to', url)

const PORT = 3000;

connect(url)
  .then(_result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use('/api/user', userRouter)



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
