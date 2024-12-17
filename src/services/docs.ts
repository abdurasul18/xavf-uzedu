import { AxiosPromise } from "axios"
import ApiService, { createQuery } from "./api"
import { IResponse } from "./types"
import { IUserLogin } from "./auth"
export interface ICriterion {
    name: string
    rate: number
    id: string
    category: {
        name: string
        id: string
    }
}
export interface IFile {
    document_id: string
    extension: string
    id: string
    mime_type: string
    name: string
    path: string
    size: number
}
export interface IDocument {
    amount: number
    created_at: string
    createdBy: IUserLogin
    description: string
    district: { name: string, id: string }
    district_id: string
    files: IFile[]
    id: string
    key: string
    order_date: string
    order_number: string
    rate: string
    region: { name: string, id: string }
    region_id: string
    start_date: string
    title: string
    updated_at: string
    updated_by: string
    criterion: ICriterion[]

}
export interface IStat {
    count: number
    rate: number
}
export const DocumentService = {
    getCriterion(): IResponse<ICriterion> {
        return ApiService.get(`document/criterion`)
    },
    createDoc(data: any) {
        let formData = new FormData()
        for (const key in data) {
            if (key == 'files') {
                data[key].forEach((file: any) => {
                    formData.append(key, file)
                })
            }
            else if(key == 'criterionIds') {
               data.criterionIds.forEach((id: string, index:number) => {
                     formData.append(`criterionIds[${index}]`, id)
               })

            }
            else {
                formData.append(key, data[key])

            }
        }
        return ApiService.formData('/document/create', formData)
    },
    getList(params: {
        per_page?: number,
        page?: number,
    }): IResponse<IDocument> {
        return ApiService.get(`document/index?include=criterion&per-page=${params.per_page}&page=${params.page}`)
    },
    getDocByKey(key: string): AxiosPromise<{ data: IDocument }> {
        return ApiService.get(`document/get?key=${key}&expand=criterion`)
    },
    getStat(): IResponse<IStat> {
        return ApiService.get('document/statistics')
    },
    viewPdf(html: string) {
        return ApiService.post(`document/pdf`, {
            html
        })
    }
}