import api from "../config/api"

export const checkout = async (data: { items: { cover_img: string, price: number, quantity: number, slug: string, title: string }[], total: number, totalQty: number }) => {
    try {
        await api.post('orders', data as unknown as string)
    } catch (error: any) {
        console.log(error.message)
        throw new Error(error?.response?.data?.message || error.message)
    }
}