import { UserEntry } from "./types"

type Fields={username:unknown, password:unknown}

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

const parseUsername = (username:unknown):string => {
    if(!username || !isString(username)){
        throw new Error('Incorrect or missing something')
    }
    return username
}

const parsePassword = (password:unknown):string => {
    if(!password || !isString(password)){
        throw new Error('Incorrect or missing something')
    }
    return password
}
export const toNewUserEntry=({username, password}: Fields): UserEntry=> {
    const newEntry: UserEntry = {
        username: parseUsername(username),
        password: parsePassword(password)
    }
    return newEntry
}