import ApiService from "./api"
export interface IDistrict {
    id:string
    name:string
    region_id:string
    status:string
    top:string
}
export interface IRegion {
    name:string
    id:string
}
export const RegionService = {
    getCountry() {
        return ApiService.get('/common/countries/')
    },
    getRegions() {
        return ApiService.get('/organization/regions/')
    },
    getDistricts(regionId: string) {
        return ApiService.get(`organization/districts?region_id=${regionId}`)
    },

}