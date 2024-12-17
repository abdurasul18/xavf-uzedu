import { defineStore } from 'pinia'
import { AccountService } from '../services/account'
import { IUserLogin } from '../services/auth'

export const useAuthStore = defineStore('auth', () => {
    const user = useStorage('user_data', {}) as Ref<IUserLogin | undefined>
    const token = useStorage("access_token", "")
    const refresh = useStorage("refresh_token", "")
    const isAuthenticated = computed(() => !!token.value)
    const login = (data: IUserLogin) => {
        token.value = data.token
        user.value = data
    }
    const logout = () => {
        user.value = undefined
        token.value = ""
        user.value = undefined
    }
    async function getUser() {
        try {
            let res = await AccountService.getUser()
            user.value = res.data.data
        }
        finally {

        }
    }
    return {
        user,
        token,
        isAuthenticated,
        login,
        logout,
        getUser,
    }
})
