import { AxiosPromise } from "axios"
import ApiService from "./api"
import { IRole, IUserLogin } from "./auth"


export const AccountService = {
    getUser(): AxiosPromise<{data:IUserLogin}> {
        return ApiService.get('user/get-me/')
    },
  
}