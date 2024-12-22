import ApiService, { createQuery } from "./api"
import { IResponse, QueryType } from "./types"

export interface ICategory {
    name :string
    id:string
}

export const CategoryService = {
    getList(query?: QueryType): IResponse<ICategory> {
        return ApiService.get(`category/index?${createQuery(query)}`)
    },
    create(data:any){
        return ApiService.post('category/create',data)
    },
    update(id:string,data:any){
        return ApiService.post(`category/update?id=${id}`,data)
    },
    delete(id:string){
        return ApiService.delete(`category/delete?id=${id}`)
    }

}