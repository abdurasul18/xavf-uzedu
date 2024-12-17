import { AxiosPromise } from "axios";

export type IResponse<T> = AxiosPromise<{
    code: number
    message: string
    meta: {
        currentPage:number
        pageCount:number
        perPage:number
        totalCount:number
    }
    data: T[]
}>

