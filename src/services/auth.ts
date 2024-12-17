import axios, { AxiosResponse } from "axios";
import ApiService, { createQuery } from "./api"
export interface IUserLogin {
  branch_id:string
  first_name:string
  id:string
  last_name:string
  status:string
  token:string

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
