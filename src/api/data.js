import axios from './axios'

export const getMenu = (param) => {
    return axios.request({
        url: '/permission/getMenu',
        method: 'post',
        data: param
    })
}

export const getData = () => {
    return axios.request({
        url: '/home/getData'
    })
}

export const getUserList = (param) => {
    return axios.request({
        url: '/user/getUserList',
        method: 'get',
        params: param
    })
}