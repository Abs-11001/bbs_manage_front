import request from "@/utils/request";

// 获取校内各个部门通知公告
export function getAnnouncement(query) {
    return request({
        url: '/bbs/announcement/getAnnouncement',
        method: 'get',
        params: query
    })
}

// 获取要展示的板块
export function getAnnouncementKey() {
    return request({
        url: '/bbs/announcement/getAnnouncementKey',
        method: 'get'
    })
}

// 通过uuid获取通知公告的具体内容
export function getAnnouncementData(query) {
    return request({
        url: '/bbs/announcement/getAnnouncementData',
        method: 'get',
        params: query
    })
}

// 通过uuid获取通知公告的相关信息
export function getAnnouncementWithUuid(query) {
    return request({
        url: '/bbs/announcement/getAnnouncementWithUuid',
        method: 'get',
        params: query
    })
}

// 通过uuid修改通知公告的状态
export function updateAnnouncementWithUuid(data) {
    return request({
        url: '/bbs/announcement/updateAnnouncementWithUuid',
        method: 'post',
        data: data
    })
}

// 通过idx修改通知公告板块的状态
export function updateAnnouncementKey(data) {
    return request({
        url: '/bbs/announcement/updateAnnouncementKey',
        method: 'post',
        data: data
    })
}