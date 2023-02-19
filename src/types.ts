export interface UserType{
    username: string,
    password: string,
    id: number
}

export interface ReturnedUserType {
    username: string
}

export interface ShotgroupType {
    username: string,
    type: ShotType,
    shotsmade: number,
    shotsattempted: number,
    date: string
}

export interface GamestatisticsType {
    points: number,
    rebounds: number,
    assists: number,
    steals: number,
    blocks: number,
    fgpercentage: number,
    user: string
}

export interface ShotgroupEntry {
    username: string,
    type: ShotType,
    shotsmade: number,
    shotsattempted: number,
    date: string,
    user_id: string
}

export interface UserEntry {
    username: string,
    password: string,
}

export interface UserLogin {
    token: string,
    username: string
}

export enum ShotType {
    Freethrow ="ft",
    Threepoint = "3p",
    Midrange = "2p"
}