import { BaseResponse } from "@/utils/baseResponse"

export type ListManager = {
            MemberId: number,
            MemberFullname: string ,
            MemberEmail: string,
            ManagerId:  number,
            ManagerFullName: string,
            ManagerEmail: string,
}
export type Response = {
    GET: BaseResponse<ListManager[]>
}