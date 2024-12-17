import { NDateLocale, NLocale } from 'naive-ui'

export const uzLt: NLocale = {
  name: 'uzLt',
  global: {
    undo: 'Bekor qilish',
    redo: 'Qayta bajarish',
    confirm: 'Tasdiqlash',
    clear: 'Tozalash',
  },
  Popconfirm: {
    positiveText: 'Tasdiqlash',
    negativeText: 'Bekor qilish',
  },
  Cascader: {
    placeholder: 'Tanlang',
    loading: 'Kuting',
    loadingRequiredMessage: (v) => v,
  },
  Time: {
    dateFormat: 'yyyy-MM-dd',
    dateTimeFormat: 'yyyy-MM-dd HH:mm:ss',
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'yyyy-MM',
    dateFormat: 'yyyy-MM-dd',
    dateTimeFormat: 'yyyy-MM-dd HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    clear: 'Tozalash',
    now: 'Hozirgi vaqt',
    confirm: 'Tasdiqlash',
    selectTime: 'Vaqtni tanlang',
    selectDate: 'Sanani tanlang',
    datePlaceholder: 'Sanani tanlang',
    datetimePlaceholder: 'Sana va vaqtni tanlang',
    monthPlaceholder: 'Oyni tanlang',
    yearPlaceholder: 'Yilni tanlang',
    quarterPlaceholder: 'Yarim yillikni tanlang',
    startDatePlaceholder: 'Boshlanish sanasi',
    endDatePlaceholder: 'Tugash sanasi',
    startDatetimePlaceholder: 'Boshlanish sanasi va vaqti',
    endDatetimePlaceholder: 'Tugash sanasi va vaqti',
    startMonthPlaceholder: 'Boshlanish oyi',
    endMonthPlaceholder: 'Tugash oyi',
    monthBeforeYear: true,
    firstDayOfWeek: 6,
    today: 'Bugun',
  },
  DataTable: {
    checkTableAll: 'Hammasini tanlash',
    uncheckTableAll: 'Tanlashni bekor qilish',
    confirm: 'Tasdiqlash',
    clear: 'Tozalash',
  },
  LegacyTransfer: {
    sourceTitle: 'Manba',
    targetTitle: 'Target',
  },
  Transfer: {
    selectAll: 'Hammasini tanlash',
    unselectAll: 'Tanlashni bekor qilish',
    clearAll: 'Tozalash',
    total: (v) => String(v),
    selected: (v) => String(v),
  },
  Empty: {
    description: 'Ma’lumot topilmadi',
  },
  Select: {
    placeholder: 'Tanlang',
  },
  TimePicker: {
    placeholder: 'Vaqtni tanlang',
    positiveText: 'OK',
    negativeText: 'Bekor qilish',
    now: 'Hozirgi vaqt',
  },
  Pagination: {
    goto: 'keyingisiga o‘tish',
    selectionSuffix: 'Sahifa',
  },
  DynamicTags: {
    add: 'Qo‘shish',
  },
  Log: {
    loading: 'Kuting',
  },
  Input: {
    placeholder: 'Kiriting',
  },
  InputNumber: {
    placeholder: 'Kiriting',
  },
  DynamicInput: {
    create: 'Yaratish',
  },
  ThemeEditor: {
    title: 'Theme Editor',
    clearAllVars: 'Tozalash All Variables',
    clearSearch: 'Tozalash Search',
    filterCompName: 'Filter Component Name',
    filterVarName: 'Filter Variable Name',
    import: 'Import',
    export: 'Export',
    restore: 'Reset to Default',
  },
  Image: {
    tipPrevious: 'Oldingi rasm (←)',
    tipNext: 'Keyingi rasm (→)',
    tipCounterclockwise: 'Counterclockwise',
    tipClockwise: 'Clockwise',
    tipZoomOut: 'Uzoqlashtirish',
    tipZoomIn: 'Yaqinlashtirish',
    tipClose: 'Yopish (Esc)',
    tipOriginalSize: 'Asil holati',
    tipDownload : "Yuklab olish turi"
  },
}
