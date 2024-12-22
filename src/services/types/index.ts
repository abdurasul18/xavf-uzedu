import { AxiosPromise, AxiosResponse } from "axios";

export type IResponse<T> = AxiosPromise<{
    code: number
    message: string
    meta: {
        currentPage: number
        pageCount: number
        perPage: number
        totalCount: number
    }
    data: T[]
}>


export type QueryType = {
    [key: string]: string | number
}

