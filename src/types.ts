export interface UserType{
    username: string,
    password: string,
    id: number
}

export interface UserEntry {
    username: string,
    password: string,
}

export interface UserLogin {
    token: string,
    username: string
}