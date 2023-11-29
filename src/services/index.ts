import axios from "axios";
import { LanguagesParams } from "../types";

const toQueryString = (obj: Record<string, any>) => {
    let queryString = Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
    return queryString
}

export const listPackages = async (params: any) => {
    const resp = await axios(`https://api.npms.io/v2/search?${toQueryString(params)}`, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    })

    return resp.data
}

export const getPackageDetails = async (params: { names: string[] }) => {
    const resp = await axios(`https://api.npms.io/v2/package/mget`, {
        method: 'POST',
        data: JSON.stringify(params.names),
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    })

    return resp.data
}

export const listLanguages = async (packages: LanguagesParams[]) => {
    const promiseArr = packages.map(pkg => axios(`https://api.github.com/repos/${pkg.owner}/${pkg.repo}/languages`))
    const resp = await Promise.all(promiseArr)
    
    return resp.map(ele => ele.data)
}