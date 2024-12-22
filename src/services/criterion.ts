import ApiService, { createQuery } from "./api"
import { ICategory } from "./category"
import { IResponse, QueryType } from "./types"

export interface ICriterion {
    name: string
    id: string
    rate : number
    category?:ICategory
}

export const CriterionService = {
    getList(query?: QueryType): IResponse<ICriterion> {
        return ApiService.get(`criterion/index?${createQuery(query)}&expand=category`)
    },
    create(data: any) {
        return ApiService.post('criterion/create', data)
    },
    update(id: string, data: any) {
        return ApiService.post(`criterion/update?id=${id}`, data)
    },
    delete(id: string) {
        return ApiService.delete(`criterion/delete?id=${id}`)
    }

}