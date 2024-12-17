import { AxiosPromise } from "axios"
import ApiService from "./api"
export interface IDashboardData {
    approved:number
    expired:number
    in_progress:number
    rejected:number
}
export interface IStat {
    month:number
    data :IDashboardData
}
export const DashboarService = {
    getData():AxiosPromise<IDashboardData> {
        return ApiService.get(`application/application-stats/`)
    },
    getStat():AxiosPromise<IStat[]> {
        return ApiService.get(`application/application-chart-stats/`)
    }
}