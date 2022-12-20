import express from 'express';
import { toGamestatisticsEntry } from '../utils/parser';

const router = express.Router();


router.post("/", (req, res) => {
    try {
        const newEntry = toGamestatisticsEntry(req.body)
    } catch (error) {
        
    }
})