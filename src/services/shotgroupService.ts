import { ShotgroupEntry} from "../types"
const Shotgroup = require('./../models/shotGroup')



const findAll = async(entry:string): Promise<[ShotgroupEntry]> => {
    const shotgroups = await Shotgroup.find({user:entry})    
    return shotgroups
}

const addShotgroup = async (entry:ShotgroupEntry): Promise<ShotgroupEntry> => {

    const newShotgroup = new Shotgroup({
        username:entry.username,
        type: entry.type,
        shotsmade: entry.shotsmade,
        shotsattempted: entry.shotsattempted,
        date: entry.date,
        user: entry.user_id
    })    
    const savedShotgroup =  await newShotgroup.save()
    return savedShotgroup
}

export default {addShotgroup, findAll}