import axios, { AxiosResponse } from "axios";
import ApiService, { createQuery } from "./api"
import { IUser } from "./user";
export interface IUserLogin extends IUser {
 

}
export type IRole = 'applicant' | 'regional_administrator' | 'secretary' | 'council' | 'chairman'
const AuthService = {
  /**
   * Login the user and store the access token to TokenService.
   *
   * @returns access_token
   * @throws AuthenticationError
   **/
  login: async function (data: any): Promise<AxiosResponse<{ data: IUserLogin }>> {
    return ApiService.post(`/user/login`, data)
  },
  getChallenge(): Promise<AxiosResponse<{ challenge: string }>> {
    return axios.get(`${import.meta.env.VITE_API_API_URL}/account/eimzo-challenge/`)
  },

}

export { AuthService }
