import { Ref } from "vue";

export function watchPagination(params: Ref<{
    body: { [key: string]: any },
    query: { [key: string]: any }
}>, page: Ref<number>, callback: any, immediate = false) {
    watch(() => params.value, (newVal, oldVal) => {

        let data1 = JSON.stringify({ ...newVal, query: { ...newVal.query, page: 0 } })
        let data2 = JSON.stringify({ ...(oldVal || {}), query: { ...oldVal?.query || {}, page: 0 } })
        if (params.value.query.page !== 0 && data1 !== data2) {
            page.value = 1
        }
        else {
            callback(params.value)
        }
    }, { deep: true, immediate })
}