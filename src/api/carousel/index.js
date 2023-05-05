import request from "@/utils/request";

// 添加图片轮播图资源
export function addImageCarousel(data) {
    return request({
        url: '/bbs/carousel/addImageCarousel',
        method: 'post',
        data: data
    })
}

// 获取图片轮播图列表
export function getImageCarousel(data) {
    return request({
        url: '/bbs/carousel/getImageCarousel',
        method: 'get',
        params: data
    })
}

// 修改图片轮播图数据
export function updateImageCarousel(data) {
    return request({
        url: '/bbs/carousel/updateImageCarousel',
        method: 'post',
        data: data
    })
}


// 添加文字轮播数据
export function addTextCarousel(data) {
    return request({
        url: '/bbs/carousel/addTextCarousel',
        method: 'post',
        data: data
    })
}

// 获取文字轮播数据
export function getTextCarousel(data) {
    return request({
        url: '/bbs/carousel/getTextCarousel',
        method: 'get',
        params: data
    })
}

// 修改文字轮播数据
export function updateTextCarousel(data) {
    return request({
        url: '/bbs/carousel/updateTextCarousel',
        method: 'post',
        data: data
    })
}