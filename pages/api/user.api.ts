import api from "@/utils/baseHttp";
import { IUser } from "../types/user.type";

export const getUsers = (
  page: number | string,
  pageSize: number | string
) => {
    return api.get<IUser['data']>("user/getAll", {
    params: {
      page: page,
      pageSize: pageSize,
    },
  });
};

export const updateUser = (id: string, name: string) => {
  return api.post<IUser>("user/Update", {
    email: id, 
    name: name,
  })
}
