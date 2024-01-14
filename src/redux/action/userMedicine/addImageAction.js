import { addImageConstant } from "../../constant/userMedicine/addImage"


export const addImageLoading=(data)=>{
    console.log(data,"datatatatt")
    return {
        type:addImageConstant.addImageLoad,
        payload:data
    }
}
export const addImageSuccess=(data)=>{
    console.log(data,"success")
    return {
        type:addImageConstant.addImageSuccess,
        payload:data,
    }
}
export const addImageError=(err)=>{
    return{
        type:addImageConstant.addImageError,
        payload:err
    }
}
