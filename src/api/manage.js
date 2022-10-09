import request from '@/utils/request'
import { builder, getQueryParameters } from '@/mock/util'
import Mock from 'mockjs2'
const Random = Mock.Random
Random.extend({
  booleanZh: function(date) {
    const constellations = ['是', '否']
    return this.pick(constellations)
  },
  productType: function(date) {
    const constellations = ['智算', '超算']
    return this.pick(constellations)
  },
  productName: function(date) {
    const constellations = ['Tesla P4', 'Tesla P100','Tesla P40']
    return this.pick(constellations)
  },
  productDesc: function(date) {
    const constellations = ['高性能异构环境，适用小规模AI训练和HPC计算 ']
    return this.pick(constellations)
  },
  rbs: function(date) {
    const constellations = ['所有资源池可用']
    return this.pick(constellations)
  },
  centers: function(date) {
    const constellations = ['所有数据中心可用']
    return this.pick(constellations)
  },
  discountName: function(date) {
    const constellations = ['满100减20', '满300减20', '满500减20', '满1000减200', '200抵扣劵', '100抵扣劵', 'V100免费体验7天', 'P10特价']
    return this.pick(constellations)
  },
  discountType: function(date) {
    const constellations = ['现金', '满减送', '免费券', '特价券']
    return this.pick(constellations)
  },
  discountRange: function(date) {
    const constellations = ['所有商品']
    return this.pick(constellations)
  },
  supplier: function(date) {
    const constellations = ['阿里云', '直营店1', '直营店2', '直营店3']
    return this.pick(constellations)
  }
})
const totalCount = 5701
const api = {
  user: '/user',
  role: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree'
}

export default api

export function getUserList (parameter) {
  return request({
    url: api.user,
    method: 'get',
    params: parameter
  })
}

export function getRoleList (parameter) {
  return request({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getServiceList (parameter) {
  const parameters = parameter

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      id: Mock.mock('@id'),
      snId: 'sn' + Mock.mock('@id'),
      no: 'No' + Mock.mock('@id'),
      description: '这是一段描述',
      callNo: Mock.mock('@integer(1, 999)'),
      status: Mock.mock('@integer(0, 3)'),
      type: Mock.mock('@word'),
      updatedAt: Mock.mock('@datetime'),
      createdAt: Mock.mock('@datetime'),
      calculateForce: Mock.mock('@integer(10000, 300000)'),
      gpu: Mock.mock('@integer(10, 100)'),
      cpu: Mock.mock('@integer(100, 1000)'),
      memory: Mock.mock('@integer(100, 1000)'),
      storage: Mock.mock('@integer(100, 1000)'),
      bandwidth: Mock.mock('@integer(10, 100)'),
      delay: Mock.mock('@integer(1, 100)'),
      '10': Mock.mock('@integer(1, 10)'),
      '100': Mock.mock('@integer(10, 100)'),
      '100v2': Mock.mock('@integer(10, 100)'),
      '1000': Mock.mock('@integer(100, 1000)'),
      '10000': Mock.mock('@integer(1000, 10000)'),
      published: Random.booleanZh(),
      productType: Random.productType(),
      productName: Random.productName(),
      productDesc: Random.productDesc(),
      discountName: Random.discountName(),
      discountType: Random.discountType(),
      discountRange: Random.discountRange(),
      supplier: Random.supplier(),
      validRange: Mock.mock('@date') + ' - ' + Mock.mock('@date'),
      rbs: Random.rbs(),
      centers: Random.centers(),
      editable: false
    })
  }

  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}

export function getPermissions (parameter) {
  return request({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}

export function getOrgTree (parameter) {
  return request({
    url: api.orgTree,
    method: 'get',
    params: parameter
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveService (parameter) {
  return request({
    url: api.service,
    method: parameter.id === 0 ? 'post' : 'put',
    data: parameter
  })
}

export function saveSub (sub) {
  return request({
    url: '/sub',
    method: sub.id === 0 ? 'post' : 'put',
    data: sub
  })
}
