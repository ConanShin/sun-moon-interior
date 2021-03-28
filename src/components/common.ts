// @ts-ignore
import {categories} from '@/cafe24info'

const pyToCategoryId: any = categories.portfolio

export const pyToCategory = (py: string) => {
    return pyToCategoryId[py]
}

export const productToPy = (product: any) => {
    const categoryId = Object.values(pyToCategoryId).find(categoryId => product.category.map((productCategory: any) => productCategory.category_no).includes(categoryId))
    return Object.keys(pyToCategoryId).find(key => categoryId === pyToCategoryId[key])

}

export const productToCategory = (product: any) => {
    const category = product.category.find((category: any) => Object.values(pyToCategoryId).includes(category.category_no))
    if (category) return category.category_no
    else return null
}

export const makeHash = (length: number) => {
    let result             = ''
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}