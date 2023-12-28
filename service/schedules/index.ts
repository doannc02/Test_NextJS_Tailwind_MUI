import { authApi } from "@/utils/baseHttp";
import { RequestBody } from "./type";

export const createSchedules = async(request: RequestBody['SAVE']) : Promise<any> => {
    console.log(request)
    const { data } = await authApi(
      {
        method: 'post',
        url: 'Schedules/create',
        data: request
      }
    )
    return data;
  }