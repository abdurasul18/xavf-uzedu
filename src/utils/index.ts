import { ddmmyyyy } from '/@src/utils/date'
import moment from 'moment'
import { NQrCode } from "naive-ui"
import { h, render } from 'vue'

export function calculateExperiance(
  experienceArray: { beginDate: string; endDate: string; isUng: boolean }[]
) {
  let totalYears = 0
  let totalMonths = 0
  let totalDays = 0

  for (const experience of experienceArray) {
    const beginDate = new Date(
      moment(experience.beginDate, 'DD-MM-YYYY').format('MM-DD-YYYY')
    )
    const endDate = experience.endDate
      ? new Date(moment(experience.endDate, 'DD-MM-YYYY').format('MM-DD-YYYY'))
      : new Date()

    const diffMilliseconds = +endDate - +beginDate
    const diffDate = new Date(diffMilliseconds)

    totalYears += diffDate.getUTCFullYear() - 1970
    totalMonths += diffDate.getUTCMonth()
    totalDays += diffDate.getUTCDate() - 1
  }

  // Adjust for excess days
  if (totalDays >= 30) {
    totalMonths += Math.floor(totalDays / 30)
    totalDays = totalDays % 30
  }

  // Adjust for excess months
  if (totalMonths >= 12) {
    totalYears += Math.floor(totalMonths / 12)
    totalMonths = totalMonths % 12
  }
  // IN SYSTEM
  let totalYearsUNG = 0
  let totalMonthsUNG = 0
  let totalDaysUNG = 0
  const experienceArrayUNG = experienceArray.filter((el) => el.isUng)
  for (const experience of experienceArrayUNG) {
    const beginDate = new Date(
      moment(experience.beginDate, 'DD-MM-YYYY').format('MM-DD-YYYY')
    )
    const endDate = experience.endDate
      ? new Date(moment(experience.endDate, 'DD-MM-YYYY').format('MM-DD-YYYY'))
      : new Date()

    const diffMilliseconds = +endDate - +beginDate
    const diffDate = new Date(diffMilliseconds)

    totalYearsUNG += diffDate.getUTCFullYear() - 1970
    totalMonthsUNG += diffDate.getUTCMonth()
    totalDaysUNG += diffDate.getUTCDate() - 1
  }

  // Adjust for excess days
  if (totalDaysUNG >= 30) {
    totalMonthsUNG += Math.floor(totalDaysUNG / 30)
    totalDaysUNG = totalDaysUNG % 30
  }

  // Adjust for excess months
  if (totalMonthsUNG >= 12) {
    totalYearsUNG += Math.floor(totalMonthsUNG / 12)
    totalMonthsUNG = totalMonthsUNG % 12
  }
  return {
    all: {
      year: totalYears,
      month: totalMonths,
      day: totalDays,
    },
    inSystem: {
      year: totalYearsUNG,
      month: totalMonthsUNG,
      day: totalDaysUNG,
    },
  }
}

const deepFind =
  (pred: any) =>
    (xs: any): any => {
      for (let x of xs) {
        if (pred(x)) {
          return x
        }
        return deepFind(pred)(x.child || [])
      }
    }
export const findById = (id: any) => (obj: any) => deepFind((o: any) => o.id == id)([obj])


function hexToRgb(hex: string): number[] | null {
  if (!hex) return [0, 0, 0]
  // Remove the hash (#) if it exists
  hex = hex.replace(/^#/, '');

  // Parse the hex values
  const bigint = parseInt(hex, 16);

  // Extract RGB components
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return [r, g, b];
}

function calculateLuminance(rgb: number[]): number {
  const [r, g, b] = rgb.map(value => {
    value /= 255; // Normalize to range [0, 1]
    return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
  });

  // Calculate luminance using the relative luminance formula
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function getContrastColor(hexBackgroundColor: string): string {
  if (!hexBackgroundColor?.startsWith('#')) {
    return '#000000'
  }
  const rgb = hexToRgb(hexBackgroundColor);

  if (rgb === null) {
    return '#000000'; // Default to black text if hex code is invalid
  }

  const luminance = calculateLuminance(rgb);

  // Use a threshold to decide whether to use light or dark text
  return luminance > 0.5 ? '#000000' : '#ffffff';
}


export function fullNameToShortName(fullname: string) {
  if (!fullname) return ''
  let fioArr = fullname.split(" ")
  return `${getFirstChar(fioArr[1])}.${getFirstChar(fioArr[2])}. ${fioArr[0]}`
}

function getFirstChar(val: string) {
  let tempVal = val
  const chars = ["o'", "o‘", "o`", "sh", "ch", "g'", "g‘", "g`"]
  if (chars.some(el => tempVal.toLowerCase().startsWith(el))) {
    return val[0] + val[1]
  }
  return val[0]
}

// 
export function generateQrCodeFromString(data: {
  value: string,
  color: string,
  size: number
}) {
  let qrWrap = document.createElement('div')
  let vNodeQr = h(NQrCode, data)
  render(vNodeQr, qrWrap)
  const canvas = qrWrap.querySelector('canvas')
  const imgSrc = canvas?.toDataURL('image/png')
  return imgSrc || ''
}

export function tableToObject(table: { key: string, value: any }[]) {
  let obj: any = {}
  table.forEach(el => {
    if (el.value) {
      obj[el.key] = el.value
    }
  })
  return obj
}


