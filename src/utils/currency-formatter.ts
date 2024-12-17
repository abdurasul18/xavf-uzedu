export default function currencyFormatter(value: number | string | null | undefined, dash:boolean = true): string {
    if(!value) {
        return  dash ?  '-' : '0'
    }
    return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
   
}