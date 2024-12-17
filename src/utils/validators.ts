import { dmyToDate } from './date'

export const email = (email: string | null) => {
  return !!String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

export const date = (value: any) => {
  if (!value) return false
  return /^(0?[1-9]|[12][0-9]|3[01])[-](0[1-9]|1[0-2])[-](19[0-9][0-9]|20[012345][0-9])$/.test(
    value
  )
}

export const validBithday = (date: string) => {
  if (!date) return true
  let dateVal = dmyToDate(date)
  let age = new Date(Date.now() - new Date(dateVal).getTime()).getFullYear() - 1970
  return age >= 16 && age <= 90
}

export const validPassportDate = (date:string)=>{
  if(!date) return true
  let dateVal = dmyToDate(date)
  let year =new Date(dateVal).getFullYear()
  return year >= 1950 && year <= new Date().getFullYear()
}
