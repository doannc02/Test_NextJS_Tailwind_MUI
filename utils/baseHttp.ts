import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Router } from "next/router";
import { getCmsToken } from "./token";
import { errorMsg, successMsg } from "@/helper/message";

//const baseURL = "https://0a92-222-252-99-253.ngrok-free.app/api/",
const baseURL = "https:localhost:44309/api/",
  isServer = typeof window === "undefined";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const middlewareRequest = async (config: any) => {
  const tokenAccess: any = getCmsToken()

  if (config.url && config.url.includes('login')) {
    return {
      ...config,
      headers: {
        ...config.headers,
        'ngrok-skip-browser-warning': '69420',
        'Accept-Language': 'vi',
      },
    }
  }

  return {
    ...config,
    headers: {
      ...config.headers,
      'ngrok-skip-browser-warning': '69420',
      'Accept-Language': 'vi',
      Authorization: `Bearer ${tokenAccess}`,
    },
  }
}

export const middlewareResponseError = async (error: any) => {
  const {
    config,
    response: { status },
  } = error

  const originalRequest = config
console.log(error, 'error')
  if (
    status === 401 
  ) {
    errorMsg("Phiên đăng nhập đã hết hạn! Vui lòng đăng nhập lại")
    window.location.replace('/account/login')

    return Promise.reject(error)
  }

}

export const resTest = async(res : any) => {
  const { config, response } = res
    if(res.data.ErrorCode !== -1){
      console.log(res, "đây này response")
      if(res !== 'undefinded'){
        return res
      }else return Promise.reject(res)
    }
   else return Promise.reject(res)
}

api.interceptors.request.use(middlewareRequest, (error: any) =>
  Promise.reject(error)
)

api.interceptors.response.use((res) => resTest(res), middlewareResponseError)

export const authApi = (options: AxiosRequestConfig) => {
  return api({
    baseURL:baseURL ,
    ...options,
  })
}
export default api;
