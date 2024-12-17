import ApiService from "./api"

export const RegionService = {
    getCountry() {
        return ApiService.get('/common/countries/')
    },
    getRegions() {
        return ApiService.get('/document/regions/')
    },
    getDistricts(regionId:string) {
        return ApiService.get(`document/districts?region_id=${regionId}`)
    },
  
}