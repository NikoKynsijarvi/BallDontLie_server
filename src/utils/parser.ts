import { UserEntry, ShotgroupType, ShotType } from "./../types"

type Fields={username:unknown, password:unknown}
type ShotgroupFields = {username: unknown, type:unknown, shotsmade: unknown, shotsattempted:unknown, date:unknown}

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

const isNumber = (shotsattempted:unknown):shotsattempted is number => {
    return typeof shotsattempted === 'number' || shotsattempted instanceof Number;
}

const parseUsername = (username:unknown):string => {
    if(!username || !isString(username)){
        throw new Error('Incorrect or missing something')
    }
    return username
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };

const parsePassword = (password:unknown):string => {
    if(!password || !isString(password)){
        throw new Error('Incorrect or missing something')
    }
    return password
}

const parseShotsmade = (shotsmade:unknown):number => {
    if(!shotsmade || !isNumber(shotsmade)){
        throw new Error('Incorrect or missing something')
    }
    return shotsmade
}
const parseShotsattempted = (shotsattempted:unknown):number => {
    if(!shotsattempted || !isNumber(shotsattempted)){
        throw new Error('Incorrect or missing something')
    }
    return shotsattempted
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isShotType = (param: any): param is ShotType => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(ShotType).includes(param);
  };

const parseShotType = (type: unknown):ShotType => {
    if(!type || !isShotType(type)){
        throw new Error('Incorrect or missing type: ' + type);
    }
    return type
}

export const toNewUserEntry=({username, password}: Fields): UserEntry=> {
    const newEntry: UserEntry = {
        username: parseUsername(username),
        password: parsePassword(password)
    }
    return newEntry
}

export const toShotgroupEntry = ({username, type, shotsmade, shotsattempted, date}:ShotgroupFields): ShotgroupType => {
    const newEntry: ShotgroupType = {
        username: parseUsername(username),
        type: parseShotType(type),
        shotsmade: parseShotsmade(shotsmade),
        shotsattempted: parseShotsattempted(shotsattempted),
        date: parseDate(date)
    }
    return newEntry
}

