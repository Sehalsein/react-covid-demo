export interface IApiLoginRequestBody {
    email: string
    password: string
}

export interface IApiLoginResponse {
    email: string
    token: string
    history?: any
}

export interface IApiUserProfile {
    message?: string
    result?: Result
}

export interface Result {
    user?: User
}

export interface User {
    email?: string
}
