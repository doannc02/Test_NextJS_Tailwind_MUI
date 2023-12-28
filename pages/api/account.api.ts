import api from "@/utils/baseHttp"
import { DisplayControlRegister, ResAccount } from "../types/account.type"

export const ApiLogin = (LoginName: string, Password: string) => {
    return api.post<ResAccount>('User/login', {
        LoginName: LoginName,
        Password: Password
    })
}

export  type  requestRegister =  {
        fullName: string ,
        email: string,
        gender: number,
        password: string,
        roleOfUserId: number,
        departmentId: number,
        birthday: string
    }

export const ApiRegister = (user : requestRegister) => {
     return api.post<string>('User/Register', {user: user})
}


export const GetDepartmentForRegister = () => {
    return api.get<DisplayControlRegister>('register');
}