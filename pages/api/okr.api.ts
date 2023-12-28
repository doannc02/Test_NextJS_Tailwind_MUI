import { authApi, }  from "@/utils/baseHttp";
import api from "@/utils/baseHttp";
import { IOkr, ResponseGetMemberList, memberOkr } from "../types/okr.type";

export const getOkrByIdOkr = (
  request : {okrId: number | string,
    userId: number | string,
    userEmail: string,
    isActived: boolean | null}
) => {
    return api.post<IOkr>("Okr",request);
};

// export const getMemberListOkr = ( request : {Page: number | string,
//   PageSize: number | string,
// }) => {
//   return api.get<ResponseGetMemberList>("Okr/GetMemberListOkr",{ params : {
//     Page: request.Page,
//     PageSize: request.PageSize
//   }} );
// }

export const getMemberListOkr = async( params : {Page: number | string, Email?: string
}) : Promise<ResponseGetMemberList> => {
 const {data} =  await authApi({
    method: 'get',
    url: `Okr/GetMemberListOkr/`,
    params
  } );
  return data
}


// search okr by email
export const searchOkrByEmail = (Value : string | number) => {
  return api.get<ResponseGetMemberList>("Okr/SearchByEmail", {
    params: {
      email : Value
    }
  })
}
