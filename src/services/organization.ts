import { AxiosPromise } from "axios"
import ApiService, { createQuery } from "./api"
import { ICategory } from "./category"
import { IDistrict, IRegion } from "./region"
import { IResponse, QueryType } from "./types"

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
    rate: string
    region: IRegion
    region_id: string
    title: string
    category: ICategory
}

export const OrganizationService = {
    getList(query?: QueryType): IResponse<IOrganization> {
        return ApiService.get(`organization/index?${createQuery(query)}&expand=category`)
    },
    getById(id: string): AxiosPromise<{data: IOrganization}> {
        return ApiService.get(`organization/view?id=${id}`)
    },
    create(data: any) {
        return ApiService.post('organization/create', data)
    },
    update(id: string, data: any) {
        return ApiService.post(`organization/update?id=${id}`, data)
    },
    delete(id: string) {
        return ApiService.delete(`organization/delete?id=${id}`)
    }

}