import { AxiosPromise } from "axios"
import ApiService, { createQuery } from "./api"
import { ICategory } from "./category"
import { IDistrict, IRegion } from "./region"
import { IResponse, QueryType } from "./types"
import { ICriterion } from "./criterion"
import { IUser } from "./user"

export const EQUAL_TO_LICENSE_KATEGORY = {
    428: 4,
    4413: 2,
    4412: 3,
}
export interface IOrganization {
    address: string
    director_contact: string
    director_fio: string
    district: IDistrict
    district_id: string
    id: string
    inn: string
    license_date: string
    license_number: string
    rate: number
    region: IRegion
    region_id: string
    title: string
    category: ICategory
    organizationCriterions?: {
        id: string
        file: IFile
        criterion: ICriterion
    }[]
    organization_addresses?: { name: string }[]
}

export interface ICheck {
    file: IFile
    finish_date: string
    id: string
    order_number: string
    organization_id: string
    reason: string
    start_date: string
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
export interface IRateHistory {
    action: 100 | 200
    createdBy: IUser
    created_at: string
    criterion: ICriterion
    file?: IFile
    id: string
}
export interface IOrgByInn {
    document_id: string
    expiry_date: string
    name: string
    pin: string
    register_id: string
    register_number: string
    registration_date: string
    status: string
    tin: string
    type: 2
    activity_addresses: { address: string, region_id: string, sub_region_id: string }[]
    activity_types: { id: string, name_en: string, name_ru: string, name_uz: string }[]
    organization: {
        name_en: string
        name_ru: string
        name_uz: string
    }
}
export const OrganizationService = {
    getList(query?: QueryType): IResponse<IOrganization> {
        return ApiService.get(`organization/index?${createQuery(query)}&expand=category`)
    },
    getById(id: string): AxiosPromise<{ data: IOrganization }> {
        return ApiService.get(`organization/view?id=${id}&expand=category,organizationCriterions,organization_addresses`)
    },
    create(data: any) {
        return ApiService.post('organization/create', data)
    },
    update(id: string, data: any) {
        return ApiService.post(`organization/update?id=${id}`, data)
    },
    delete(id: string) {
        return ApiService.delete(`organization/delete?id=${id}`)
    },
    // check
    getCheckList(id: string): IResponse<ICheck> {
        return ApiService.get(`organization/check-list?organization_id=${id}`)
    },
    createCheck(data: any) {
        let formData = new FormData()
        for (const key in data) {
            formData.append(key, data[key])
        }
        return ApiService.formData('organization/create-check', formData)
    },
    // updateCheck(id: string, data: any) {
    //     return ApiService.post(`organization/check-update?id=${id}`, data)
    // },
    // Rate
    rate(data: any) {
        return ApiService.post('organization/rate', data)
    },
    rateHistory(id: string): IResponse<IRateHistory> {
        return ApiService.get(`organization/rate-history?organization_id=${id}`)
    },
    // 
    getData(tin: string): AxiosPromise<{ data: IOrgByInn[] }> {
        return ApiService.post(`organization/get-data`, {
            tin
        })
    },
}