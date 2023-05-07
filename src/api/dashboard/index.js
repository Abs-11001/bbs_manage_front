import request from "@/utils/request";

// 获取数据驾驶舱数据
export function getDashboard(data) {
  return request({
    url: '/bbs/dashboard/getData',
    method: 'get',
    params: data
  })
}