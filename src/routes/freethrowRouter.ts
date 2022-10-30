import express from 'express';
import { toShotgroupEntry } from '../utils/parser';

const router = express.Router();


router.post('/', (req, res) => {
    try {
        const newShotgroupEntry = toShotgroupEntry(req.body)
    } catch (error) {
        
    }
    res.send(200)
})