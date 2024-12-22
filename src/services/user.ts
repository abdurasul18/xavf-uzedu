import ApiService, { createQuery } from "./api"
import { IRegion } from "./region"
import { IResponse, QueryType } from "./types"

export interface IUser {
    first_name:string
    id:string
    last_name:string
    middle_name:string
    region_id:string
    role:100|200|300
    status:string
    token:string
    username:string
    region:IRegion
}

export const UserService = {
    getList(query?: QueryType): IResponse<IUser> {
        return ApiService.get(`user/index?${createQuery(query)}&expand=region`)
    },
    create(data: any) {
        return ApiService.post('user/create', data)
    },
    update(id: string, data: any) {
        return ApiService.post(`user/update?id=${id}`, data)
    },
    delete(id: string) {
        return ApiService.delete(`user/delete?id=${id}`)
    }

}