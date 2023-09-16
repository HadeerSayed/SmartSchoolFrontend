export interface register{
    email:string,
    expireOn: string,
    isAuthenticated: boolean,
    message: null,
    roles:string[],
    token: string,
    userName: string
}