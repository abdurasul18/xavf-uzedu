import { AxiosPromise } from "axios"
import ApiService, { createQuery } from "./api"
import { IResponse, QueryType } from "./types"
export interface IStat {
    rate:number
    title:string
}
export const DashboarService = {
    getStat(query: any): IResponse<IStat> {
        return ApiService.get(`organization/statistics-rate?${createQuery(query)}`)
    }
}