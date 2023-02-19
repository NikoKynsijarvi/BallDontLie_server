import { UserEntry, UserLogin } from "../types"
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./../models/user')

const loginUser = async (entry:UserEntry): Promise<UserLogin | number> => {
    const username = entry.username;
    const user = await User.findOne({username})
    const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(entry.password, user.passwordHash)
    if (!(user && passwordCorrect)) {
        return 401
      }
    const userForToken = {
        username: user.username,
        id: user._id,
      }
    const token = jwt.sign(userForToken, process.env.SECRET)

    const loggedInUser = {
      token: token,
      username: user.username,
      user_id: user._id
    }
    return loggedInUser
}

export default {loginUser}