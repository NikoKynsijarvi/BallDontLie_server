import { User } from "../types"

const user:User = {
    username: "Niko",
    password: "1234",
    id: 1
}

const getEntries = (): User => {
    return user
}

export default {getEntries}