import express from 'express';
import userService from '../services/userService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(userService.getEntries());
});



export default router;