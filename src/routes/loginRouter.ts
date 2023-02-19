import express from 'express';
import { toNewUserEntry } from '../utils/parser';
import loginService from '../services/loginService';

const router = express.Router();

const isUserLogin = (obj:any)  => {
    if(obj.token !== undefined && obj.token !== undefined){
        return true
    }
    else{
        return false
    }
}

router.post("/", (req, res) => {
    try {
        const newUserEntry = toNewUserEntry(req.body)
        loginService.loginUser(newUserEntry).then((user) => {
            if(user===401){
                return res.status(401).json({
                    error: 'invalid username or password'
                  })
            }
            if(isUserLogin(user)){
                return res.status(200).send(user)
            }
        })
        
    } catch (error:unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
})

export default router