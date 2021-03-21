const pyToCategoryId: any = {
    '20': 26,
    '30': 28,
    '40': 44,
    '50': 45
}

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