import { AxiosPromise } from "axios"
import ApiService from "./api"
import { IFile } from "./organization"

export const FileService = {
    upload(file: any): AxiosPromise<{ data: IFile }> {
        let formData = new FormData()
        formData.append('file', file)
        return ApiService.formData('file/upload', formData)
    }

}