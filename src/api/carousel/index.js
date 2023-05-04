import request from "@/utils/request";

// 添加评论
export function addImageCarousel(data) {
    return request({
        url: '/bbs/carousel/addImageCarousel',
        method: 'post',
        data: data
    })
}

// 通过文章id加载评论
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