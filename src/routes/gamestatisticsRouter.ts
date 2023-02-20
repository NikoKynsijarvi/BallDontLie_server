import express from 'express';
const jwt = require('jsonwebtoken')
const User = require('./../models/user')
import { toGamestatisticsEntry } from '../utils/parser';
import gamestatisticsService from '../services/gamestatisticsService';

const router = express.Router();


const getTokenFrom = (request:any) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }

router.post("/", (req, res) => {
    try {
        const token = getTokenFrom(req);
        const decodedToken = jwt.verify(token, process.env.SECRET)
            if (!token || !decodedToken.id) {
                return res.status(401).json({ error: 'token missing or invalid' })
            }
        const user = User.findById(decodedToken)
        if(!user){
            return res.status(400).send("No user found")
        }
        const newEntry = toGamestatisticsEntry(req.body)
        gamestatisticsService.addGamestatistics(newEntry).then((res) => {
            console.log(res);
            
        })
        
    } catch (error) {
        
    }
})