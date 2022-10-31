export interface UserType{
    username: string,
    password: string,
    id: number
}

export interface ShotgroupType {
    username: string,
    type: ShotType,
    shotsmade: number,
    shotsattempted: number,
    date: string
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