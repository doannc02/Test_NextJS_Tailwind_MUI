import { authApi } from "@/utils/baseHttp";
import { Response } from "./type";
import { useQuery } from "@tanstack/react-query";
import { options } from "@/pages/home/components/barchart";

export const getManagers = async (): Promise<Response["GET"]> => {
  const { data } = await authApi({
    method: "get",
    url: "schedules/get-managers",
  });
  return data;
};

export const useQueryGetManagers = (options?: any) => {
  return useQuery<Response["GET"]>(
    ["schedules/get-managers"],
    () => getManagers(),
    options
  );
};
