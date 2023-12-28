import { authApi } from "@/utils/baseHttp";
import { LoginAcc } from "./type";

export const LogOutFn = async(LogOut: LoginAcc) => {
    return await authApi({
        method: 'post',
        url: 'user/logout',
        data: LogOut
    })
}
