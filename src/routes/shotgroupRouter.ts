import express from 'express';
import { toShotgroupEntry } from '../utils/parser';
import shotgroupService from '../services/shotgroupService';
const User = require('./../models/user')
const jwt = require('jsonwebtoken')



const router = express.Router();

router.get('/statistics/:id', async (req, res) => {
    try {        
        const id  = req.params['id']

        const user = await User.findById(id)
        if(!user){
            return res.status(404).send("Invalid id")
        }
        
        const statistics = await shotgroupService.formatStatistics(id)
        if(statistics){
            res.status(200).send(statistics)
        }else {
            res.status(404).send()
        }
    } catch (error) {
        res.status(404).send(error)
    }
})

router.get('/:id', async(req, res) => {
    try {        
        const id  = req.params['id']

        const shotgroups = await shotgroupService.findAll(id)
        if(shotgroups){
            res.status(200).send(shotgroups)
        }else {
            res.status(404).send()
        }
    } catch (error) {
        console.log(error);
        
    }
})

const getTokenFrom = (request:any) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }

router.post('/', async(req, res) => {
    try {
        const token = getTokenFrom(req);
        const decodedToken = jwt.verify(token, process.env.SECRET)
            if (!token || !decodedToken.id) {
                return res.status(401).json({ error: 'token missing or invalid' })
            }
        const user = await User.findById(decodedToken.id)
        console.log(user);
        
        const newShotgroupEntry = toShotgroupEntry(req.body)
        if(!user){
            return res.status(400).send("No user found")
        }
        if(newShotgroupEntry.shotsattempted < newShotgroupEntry.shotsmade){
            return res.status(400).send("Shots made can not be more than shots attempted")
        }
        const shotgroupEntry ={
            username:newShotgroupEntry.username,
            type: newShotgroupEntry.type,
            shotsattempted: newShotgroupEntry.shotsattempted,
            shotsmade: newShotgroupEntry.shotsmade,
            date: newShotgroupEntry.date,
            user_id: user._id
        }
        shotgroupService.addShotgroup(shotgroupEntry).then((newshotgroup) => {
            return res.status(201).send(newshotgroup)
        })
    } catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
})

export default router