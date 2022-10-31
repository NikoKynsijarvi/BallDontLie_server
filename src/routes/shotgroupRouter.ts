import express from 'express';
import { toShotgroupEntry } from '../utils/parser';
import shotgroupService from '../services/shotgroupService';
const User = require('./../models/user')


const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const shotgroups = shotgroupService.findAll(req.params.id)
        if(shotgroups){
            res.send(shotgroups)
        }else {
            res.status(404).send()
        }
    } catch (error) {
        
    }
})

router.post('/', async(req, res) => {
    try {
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