import axios from "axios"

const commonAPI=async(httpMethod,url,reqBody)=>{
    const reqConfig={
        method:httpMethod,
        url:url,
        data:reqBody
    }
    return await axios(reqConfig).then(response=>{
        return response
    }).catch(er=>{
        return er
    })
}
export default commonAPI