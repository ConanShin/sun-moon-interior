// @ts-ignore
import {categories} from '@/cafe24info'

const pyToCategoryId: any = categories.portfolio

export const pyToCategory = (py: string) => {
    console.log(pyToCategoryId[py])
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