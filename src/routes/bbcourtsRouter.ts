import express from 'express';
import bbcourtService from "./../services/bbcourtService"

const router = express.Router();


router.get("/", (_req, res) => {
    try {
        const courts = bbcourtService.getCourts()    
        res.send(courts)
    } catch (error) {
        console.log(error);
        
    }
})

export default router