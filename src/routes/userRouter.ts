import express from 'express';
import userService from '../services/userService';
import { toNewUserEntry } from '../utils/parser';
const User = require('./../models/user')
const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const newUserEntry = toNewUserEntry(req.body)
    const username = newUserEntry.username;
    const existingUser = await User.findOne({username});
    
    if(existingUser){
      return res.status(400).json({
        error: 'username must be unique'
      })
    }
    userService.addUser(newUserEntry).then((addedEntry) => {
      res.status(201).json(addedEntry)
    })
    
  } catch (error:unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
})

export default router;