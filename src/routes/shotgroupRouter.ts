import express from 'express';
import { toShotgroupEntry } from '../utils/parser';
import shotgroupService from '../services/shotgroupService';
const User = require('./../models/user')
const jwt = require('jsonwebtoken')



const router = express.Router();

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
            ///////////////Continue token based auth
        const user = User.findById(decodedToken.id)
        console.log(user);
        
        const newShotgroupEntry = toShotgroupEntry(req.body)
        const username = newShotgroupEntry.username
        const existingUser = await User.findOne({username});        
        if(!existingUser){
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
            user_id: existingUser._id
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