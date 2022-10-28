import { UserType, UserEntry } from "../types"
const User = require('./../models/user')
const bcrypt = require('bcrypt')

const addUser = async (entry: UserEntry): Promise<UserType> => {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(entry.password, saltRounds)
    const user = new User ({
        username: entry.username,
        passwordHash,
      })
    
    const savedUser = await user.save()

    return savedUser

}

export default { addUser}