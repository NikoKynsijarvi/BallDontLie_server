import express from 'express';
import userService from '../services/userService';
import { toNewUserEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(userService.getEntries());
});

router.post('/', (req, res) => {
  try {
    const newUserEntry = toNewUserEntry(req.body)
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