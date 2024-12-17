import { createI18n } from 'vue-i18n'
import { locale as uz } from '../locale/uz'
import { locale as ru } from '../locale/ru'
const defaultLocale = useStorage('locale', 'uz')
export const i18n = createI18n({
  locale: defaultLocale.value,
  fallbackLocale: 'uz',
  messages: { uz, ru },
  legacy: false,
})

