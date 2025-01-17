import commonAPI from "./commonAPI"
import serverURL from "./serverURL"



export const saveProductAPI=async(productDetails)=>{
    return await commonAPI(`POST`,`${serverURL}/allProducts`,productDetails)
}
export const getProductAPI=async()=>{
    return await commonAPI(`GET`,`${serverURL}/allProducts`,"")
}
export const geteditProductAPI=async(id)=>{
    return await commonAPI(`GET`,`${serverURL}/allProducts/${id}`,"")
}
export const removeProductAPI=async(id)=>{
    return await commonAPI(`DELETE`,`${serverURL}/allProducts/${id}`,{})
}
export const updateProductAPI=async(productDetails)=>{
    return await commonAPI('PUT',`${serverURL}/allProducts/${productDetails.id}`,productDetails)
}


export const saveCategoryAPI=async(categoryDetails)=>{
    return await commonAPI(`POST`,`${serverURL}/categories`,categoryDetails)
}
export const getcategoryAPI=async()=>{
    return await commonAPI(`GET`,`${serverURL}/categories`,"")
}
export const removeCategoryAPI=async(id)=>{
    return await commonAPI(`DELETE`,`${serverURL}/categories/${id}`,{})
}

export const saveSaleAPI=async(salesDetails)=>{
    return await commonAPI(`POST`,`${serverURL}/sales`,salesDetails)
}
export const getSaleAPI=async()=>{
    return await commonAPI(`GET`,`${serverURL}/sales`,"")
}
export const removeSalesAPI=async(id)=>{
    return await commonAPI(`DELETE`,`${serverURL}/sales/${id}`,{})
}



