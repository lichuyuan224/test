// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/operations/basic-list',
    children: [
      {
        path: '/operateCenter/bigScreen',
        name: 'operateBigScreen',
        component: () => import('@/views/big-screen'),
        meta: { title: '指挥中心大屏'}
      },
      {
        path: '/operations',
        name: 'operations',
        component: RouteView,
        redirect: '/operations/basic-list',
        meta: { title: '超算供应商', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/operations/basic-list',
            name: 'operations1',
            component: () => import('@/views/cc-yunyin-center/super-management'),
            meta: { title: '超算供应商管理',}
          },{
            path: '/operations/basic-list2',
            name: 'operations2',
            component: () => import('@/views/list/TableList'),
            meta: { title: '超算供应商注册',}
          }
          ,{
            path: '/operations/basic-list3',
            name: 'operations3',
            component: () => import('@/views/list/TableList'),
            meta: { title: '上架超算资源池商品',}
          },{
            path: '/operations/basic-list4',
            name: 'operations4',
            component: () => import('@/views/list/TableList'),
            meta: { title: '上架超算算力商品',}
          }
        ]
      },
      {
        path: '/productapproval',
        name: 'productapproval',
        component: RouteView,
        redirect: '/productapproval/basic-list',
        meta: { title: '审核中心', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/productapproval/basic-list',
            name: 'productapproval1',
            component: () => import('@/views/list/TableList'),
            meta: { title: '审核商品上架请求',}
          },{
            path: '/productapproval/basic-list2',
            name: 'productapproval2',
            component: () => import('@/views/list/TableList'),
            meta: { title: '审核资源池商品上架请求',}
          },{
            path: '/productapproval/basic-list3',
            name: 'productapproval3',
            component: () => import('@/views/list/TableList'),
            meta: { title: '审核调度流程发布请求',}
          }
        ]
      },
      {
        path: '/productcapacitymanagement',
        name: 'productcapacitymanagement',
        component: RouteView,
        redirect: '/productcapacitymanagement/basic-list',
        meta: { title: '商品容量管理', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/productcapacitymanagement/basic-list',
            name: 'productcapacitymanagement1',
            component: () => import('@/views/list/TableList'),
            meta: { title: '业务统一告警的配置',}
          },{
            path: '/productcapacitymanagement/basic-list2',
            name: 'productcapacitymanagement2',
            component: () => import('@/views/list/TableList'),
            meta: { title: '商品库存告警',}
          },{
            path: '/productcapacitymanagement/basic-list3',
            name: 'productcapacitymanagement3',
            component: () => import('@/views/list/TableList'),
            meta: { title: '商品订单告警',}
          },{
            path: '/productcapacitymanagement/basic-list4',
            name: 'productcapacitymanagement4',
            component: () => import('@/views/list/TableList'),
            meta: { title: '商品下单相关告警',}
          }
        ]
      },
      {
        path: '/aisystem',
        name: 'aisystem',
        component: RouteView,
        redirect: '/aisystem/basic-list',
        meta: { title: 'AI推荐系统', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/aisystem/basic-list',
            name: 'aisystem1',
            component: () => import('@/views/list/TableList'),
            meta: { title: '创建用户画像',}
          },{
            path: '/aisystem/basic-list2',
            name: 'aisystem2',
            component: () => import('@/views/list/TableList'),
            meta: { title: '用户使用习惯，常用参数的采集',}
          },{
            path: '/aisystem/basic-list3',
            name: 'aisystem3',
            component: () => import('@/views/list/TableList'),
            meta: { title: '用户数据的数据仓库的管理',}
          },{
            path: '/aisystem/basic-list4',
            name: 'aisystem4',
            component: () => import('@/views/list/TableList'),
            meta: { title: '支持推荐算法',}
          },{
            path: '/aisystem/basic-list5',
            name: 'aisystem5',
            component: () => import('@/views/list/TableList'),
            meta: { title: '推荐数据验证',}
          },
        ]
      },
      {
        path: '/discountmanagement',
        name: 'discountmanagement',
        component: RouteView,
        redirect: '/discountmanagement/basic-list',
        meta: { title: '促销管理', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/discountmanagement/basic-list',
            name: 'discountmanagement1',
            component: () => import('@/views/list/TableList'),
            meta: { title: '优惠券',}
          },{
            path: '/discountmanagement/basic-list2',
            name: 'discountmanagement2',
            component: () => import('@/views/list/TableList'),
            meta: { title: '满减送',}
          },{
            path: '/discountmanagement/basic-list3',
            name: 'discountmanagement3',
            component: () => import('@/views/list/TableList'),
            meta: { title: '限时优惠',}
          },{
            path: '/discountmanagement/basic-list4',
            name: 'discountmanagement4',
            component: () => import('@/views/list/TableList'),
            meta: { title: '组合套餐',}
          },{
            path: '/discountmanagement/basic-list5',
            name: 'discountmanagement5',
            component: () => import('@/views/list/TableList'),
            meta: { title: '礼品卡',}
          },
        ]
      },
      {
        path: '/activitymanagement',
        name: 'activitymanagement',
        component: RouteView,
        redirect: '/activitymanagement/basic-list',
        meta: { title: '活动管理', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/activitymanagement/basic-list',
            name: 'activitymanagement1',
            component: () => import('@/views/list/TableList'),
            meta: { title: '新人礼',}
          },{
            path: '/activitymanagement/basic-list2',
            name: 'activitymanagement2',
            component: () => import('@/views/list/TableList'),
            meta: { title: '签到奖励',}
          },{
            path: '/activitymanagement/basic-list3',
            name: 'activitymanagement3',
            component: () => import('@/views/list/TableList'),
            meta: { title: '邀请奖励',}
          },{
            path: '/activitymanagement/basic-list4',
            name: 'activitymanagement4',
            component: () => import('@/views/list/TableList'),
            meta: { title: '充值礼包',}
          },{
            path: '/activitymanagement/basic-list5',
            name: 'activitymanagement5',
            component: () => import('@/views/list/TableList'),
            meta: { title: '消费奖励',}
          },
        ]
      },
      {
        path: '/admanagement',
        name: 'admanagement',
        component: RouteView,
        redirect: '/admanagement/basic-list',
        meta: { title: '广告和新闻管理', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/admanagement/basic-list',
            name: 'admanagement1',
            component: () => import('@/views/list/TableList'),
            meta: { title: '广告的创建',}
          },{
            path: '/admanagement/basic-list2',
            name: 'admanagement2',
            component: () => import('@/views/list/TableList'),
            meta: { title: '广告的计费和购买',}
          },{
            path: '/admanagement/basic-list3',
            name: 'admanagement3',
            component: () => import('@/views/list/TableList'),
            meta: { title: '广告的位置管理',}
          },{
            path: '/admanagement/basic-list4',
            name: 'admanagement4',
            component: () => import('@/views/list/TableList'),
            meta: { title: '定向广告管理',}
          }
        ]
      },{
        path: '/statistics',
        name: 'statistics',
        component: RouteView,
        redirect: '/statistics/basic-list',
        meta: { title: '统计分析', icon: 'table', permission: ['table'] },
        children: [{
            path: '/statistics/basic-list2',
            name: 'statistics2',
            component: () => import('@/views/list/TableList'),
            meta: { title: '仪表盘',}
          },{
            path: '/statistics/basic-list3',
            name: 'statistics3',
            component: () => import('@/views/list/TableList'),
            meta: { title: '报表',}
          }
        ]
      },
      {
        path: '/hashratebilling',
        name: 'hashratebilling',
        component: RouteView,
        redirect: '/hashratebilling/basic-list',
        meta: { title: '算力计费', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/hashratebilling/basic-list',
            name: 'hashratebilling1',
            component: () => import('@/views/list/TableList'),
            meta: { title: '算例的价格模型',}
          },{
            path: '/hashratebilling/basic-list2',
            name: 'hashratebilling2',
            component: () => import('@/views/list/TableList'),
            meta: { title: '费用可视化',}
          },{
            path: '/hashratebilling/basic-list3',
            name: 'hashratebilling3',
            component: () => import('@/views/list/TableList'),
            meta: { title: '费用报表',}
          }
        ]
      },
      {
        path: '/compliance',
        name: 'compliance',
        component: RouteView,
        redirect: '/compliance/basic-list',
        meta: { title: '合规和优化', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/compliance/basic-list',
            name: 'compliance1',
            component: () => import('@/views/list/TableList'),
            meta: { title: '资源使用率优化',}
          },{
            path: '/compliance/basic-list2',
            name: 'compliance2',
            component: () => import('@/views/list/TableList'),
            meta: { title: '合规性检查',}
          }
        ]
      },
      {
        path: '/workordermanagement',
        name: 'workordermanagement',
        component: RouteView,
        redirect: '/workordermanagement/basic-list',
        meta: { title: '用户工单支持', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/workordermanagement/basic-list',
            name: 'workordermanagement1',
            component: () => import('@/views/list/TableList'),
            meta: { title: '工单服务配置',}
          },{
            path: '/workordermanagement/basic-list2',
            name: 'workordermanagement2',
            component: () => import('@/views/list/TableList'),
            meta: { title: '支持流程',}
          },{
            path: '/workordermanagement/basic-list3',
            name: 'workordermanagement3',
            component: () => import('@/views/list/TableList'),
            meta: { title: '工作台',}
          },{
            path: '/workordermanagement/basic-list4',
            name: 'workordermanagement4',
            component: () => import('@/views/list/TableList'),
            meta: { title: 'SLA配置',}
          }
        ]
      },
      {
        path: '/dispatch',
        name: 'dispatch',
        component: () => import('@/views/list/TableList'),
        meta: { title: '调度任务', icon: 'table', permission: ['table'] }
      },{
        path: '/dispatch2',
        name: 'dispatch2',
        component: () => import('@/views/list/TableList'),
        meta: { title: '超算作业', icon: 'table', permission: ['table'] }
      },{
        path: '/dispatch3',
        name: 'dispatch3',
        component: () => import('@/views/list/TableList'),
        meta: { title: '调度统计', icon: 'table', permission: ['table'] }
      },
      {
        path: '/my-shop',
        name: 'my-shop',
        component: () => import('@/views/list/TableList'),
        meta: { title: '我的商铺', icon: 'table', permission: ['table'] }
      },{
        path: '/my-center',
        name: 'my-center',
        component: () => import('@/views/list/TableList'),
        meta: { title: '我的数据中心', icon: 'table', permission: ['table'] }
      },{
        path: '/my-rb',
        name: 'my-rb',
        component: () => import('@/views/list/TableList'),
        meta: { title: '我的资源池', icon: 'table', permission: ['table'] }
      },{
        path: '/my-product',
        name: 'my-product',
        component: () => import('@/views/list/TableList'),
        meta: { title: '我的商品', icon: 'table', permission: ['table'] }
      },{
        path: '/my-request',
        name: 'my-request',
        meta: { title: '我的工单', icon: 'table', permission: ['table'] },
        component: RouteView,
        redirect: '/my-request/workspace',
        children: [
          {
            path: '/my-request/workspace',
            name: 'workspace',
            component: () => import('@/views/list/TableList'),
            meta: { title: '工作台',}
          },{
            path: '/my-request/request-list',
            name: 'request-list',
            component: () => import('@/views/list/TableList'),
            meta: { title: '工单列表',}
          },
        ]
      },{
        path: '/my-activity',
        name: 'my-activity',
        component: () => import('@/views/list/TableList'),
        meta: { title: '活动管理', icon: 'table', permission: ['table'] }
      },{
        path: '/my-discount',
        name: 'my-discount',
        component: () => import('@/views/list/TableList'),
        meta: { title: '优惠券', icon: 'table', permission: ['table'] }
      },
      {
        path: '/devopsCenter/bigScreen',
        name: 'devopsBigScreen',
        component: () => import('@/views/big-screen'),
        meta: { title: '指挥中心大屏'}
      },
      {
        path: '/operations/data-center',
        component: () => import('@/views/cc-yunwei-center/data-center'),
        name: 'dataCenter',
        meta: { title: '数据中心'}
      },
      {
        path: '/product',
        name: 'product',
        component: () => import('@/views/list/TableList'),
        meta: { title: '产品目录', icon: 'table', permission: ['table'] }
      },
      {
        path: '/om',
        name: 'om',
        component: RouteView,
        redirect: '/om/basic-list',
        meta: { title: '云平台', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/om/basic-list',
            name: 'om1',
            component: () => import('@/views/list/TableList'),
            meta: { title: '私有云',}
          },{
            path: '/om/basic-list2',
            name: 'om2',
            component: () => import('@/views/list/TableList'),
            meta: { title: '云产品',}
          },
        ]
      },
      {
        path: '/rb',
        name: 'rb',
        component: () => import('@/views/list/TableList'),
        meta: { title: '资源池', icon: 'table', permission: ['table'] }
      },
      {
        path: '/params',
        name: 'params',
        component: RouteView,
        redirect: '/params/basic-list',
        meta: { title: '资源参数管理', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/params/basic-list',
            name: 'params1',
            component: () => import('@/views/list/TableList'),
            meta: { title: '虚拟机模板',}
          },{
            path: '/params/basic-list2',
            name: 'params2',
            component: () => import('@/views/list/TableList'),
            meta: { title: '计算规格',}
          },{
            path: '/params/basic-list3',
            name: 'params3',
            component: () => import('@/views/list/TableList'),
            meta: { title: 'IP地址管理',}
          },{
            path: '/params/basic-list4',
            name: 'params4',
            component: () => import('@/views/list/TableList'),
            meta: { title: '命名规范',}
          },
        ]
      },
      {
        path: '/orginazation',
        name: 'orginazation',
        component: RouteView,
        redirect: '/orginazation/basic-list',
        meta: { title: '运维组织架构', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/orginazation/basic-list',
            name: 'orginazation1',
            component: () => import('@/views/list/TableList'),
            meta: { title: '组织架构',}
          },{
            path: '/orginazation/basic-list2',
            name: 'orginazation2',
            component: () => import('@/views/list/TableList'),
            meta: { title: '运维人员管理',}
          }
        ]
      },

      {
        path: '/resourcemanagement',
        name: 'resourcemanagement',
        component: RouteView,
        redirect: '/resourcemanagement/basic-list',
        meta: { title: '资源的运维管理', icon: 'table', permission: ['table'] },
        children: [{
            path: '/resourcemanagement/basic-list2',
            name: 'resourcemanagement2',
            component: () => import('@/views/list/TableList'),
            meta: { title: '基础资源运维变更',}
          },{
            path: '/resourcemanagement/basic-list4',
            name: 'resourcemanagement4',
            component: () => import('@/views/list/TableList'),
            meta: { title: '资源租期和回收策略',}
          },{
            path: '/resourcemanagement/basic-list5',
            name: 'resourcemanagement5',
            component: () => import('@/views/list/TableList'),
            meta: { title: '操作授权',}
          },
        ]
      },
      {
        path: '/monitor',
        name: 'monitor',
        component: RouteView,
        redirect: '/monitor/basic-list',
        meta: { title: '监控告警', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/monitor/basic-list',
            name: 'monitor1',
            component: () => import('@/views/list/TableList'),
            meta: { title: '仪表盘',}
          },{
            path: '/monitor/show-pic1',
            name: 'monitor2',
            component: () => import('@/views/big-screen'),
            meta: { title: '云资源监控大盘',}
          },{
            path: '/monitor/show-pic2',
            name: 'monitor3',
            component: () => import('@/views/big-screen'),
            meta: { title: '资源状态图',}
          },{
            path: '/monitor/show-pic3',
            name: 'monitor4',
            component: () => import('@/views/big-screen'),
            meta: { title: '告警概览',}
          },{
            path: '/monitor/basic-list2',
            name: 'monitor5',
            component: () => import('@/views/list/TableList'),
            meta: { title: '告警策略',}
          },{
            path: '/monitor/basic-list3',
            name: 'monitor6',
            component: () => import('@/views/list/TableList'),
            meta: { title: '告警',}
          },
        ]
      },
      {
        path: '/visitcontrol',
        name: 'visitcontrol',
        component: RouteView,
        redirect: '/visitcontrol/basic-list',
        meta: { title: '云资源访问控制', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/visitcontrol/basic-list',
            name: 'visitcontrol1',
            component: () => import('@/views/list/TableList'),
            meta: { title: '多协议支持',}
          },{
            path: '/visitcontrol/basic-list2',
            name: 'visitcontrol2',
            component: () => import('@/views/list/TableList'),
            meta: { title: '会话管理',}
          },{
            path: '/visitcontrol/basic-list3',
            name: 'visitcontrol3',
            component: () => import('@/views/list/TableList'),
            meta: { title: '命令审计',}
          }
        ]
      },
      {
        path: '/datacentermanagement',
        name: 'datacentermanagement',
        component: RouteView,
        redirect: '/datacentermanagement/basic-list',
        meta: { title: '数据中心管理', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/datacentermanagement/basic-list',
            name: 'datacentermanagement1',
            component: () => import('@/views/list/TableList'),
            meta: { title: '台账与信息管理',}
          },{
            path: '/datacentermanagement/basic-list2',
            name: 'datacentermanagement2',
            component: () => import('@/views/list/TableList'),
            meta: { title: '资产生命周期管理',}
          },{
            path: '/datacentermanagement/basic-list3',
            name: 'datacentermanagement3',
            component: () => import('@/views/list/TableList'),
            meta: { title: '资产统计分析',}
          },{
            path: '/datacentermanagement/basic-list3',
            name: 'datacentermanagement3',
            component: () => import('@/views/list/TableList'),
            meta: { title: '数据中心资产可视化',}
          }
        ]
      },
      {
        path: '/pay',
        name: 'pay',
        component: () => import('@/views/list/TableList'),
        meta: { title: '支付网关', icon: 'table', permission: ['table'] },
      },{
        path: '/pay1',
        name: 'pay1',
        component: () => import('@/views/list/TableList'),
        meta: { title: '资金账户', icon: 'table', permission: ['table'] },
      },{
        path: '/pay2',
        name: 'pay2',
        component: () => import('@/views/list/TableList'),
        meta: { title: '预付费与充值', icon: 'table', permission: ['table'] },
      },{
        path: '/pay3',
        name: 'pay3',
        component: () => import('@/views/list/TableList'),
        meta: { title: '支付管理', icon: 'table', permission: ['table'] },
      },{
        path: '/pay4',
        name: 'pay4',
        component: () => import('@/views/list/TableList'),
        meta: { title: '退款管理', icon: 'table', permission: ['table'] },
      },{
        path: '/pay5',
        name: 'pay5',
        component: () => import('@/views/list/TableList'),
        meta: { title: '账单管理', icon: 'table', permission: ['table'] },
      },{
        path: '/pay6',
        name: 'pay6',
        component: () => import('@/views/list/TableList'),
        meta: { title: '发票管理', icon: 'table', permission: ['table'] },
      },{
        path: '/pay7',
        name: 'pay7',
        component: () => import('@/views/list/TableList'),
        meta: { title: '在线支持', icon: 'table', permission: ['table'] },
      },
      {
        path: '/system',
        name: 'system',
        component: RouteView,
        redirect: '/system/basic-list',
        meta: { title: '系统管理', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/system/basic-list',
            name: 'system1',
            component: () => import('@/views/list/TableList'),
            meta: { title: '用户认证',}
          },{
            path: '/system/basic-list2',
            name: 'system2',
            component: () => import('@/views/list/TableList'),
            meta: { title: '密码配置',}
          },{
            path: '/system/basic-list3',
            name: 'system3',
            component: () => import('@/views/list/TableList'),
            meta: { title: '安全访问配置',}
          },{
            path: '/system/basic-list4',
            name: 'system4',
            component: () => import('@/views/list/TableList'),
            meta: { title: '数据字典',}
          },{
            path: '/system/basic-list5',
            name: 'system5',
            component: () => import('@/views/list/TableList'),
            meta: { title: '权限管理',}
          },
        ]
      },
      {
        path: '/notice',
        name: 'notice',
        component: RouteView,
        redirect: '/notice/basic-list',
        meta: { title: '通知管理', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/notice/basic-list',
            name: 'notice1',
            component: () => import('@/views/list/TableList'),
            meta: { title: '统一通知',}
          },{
            path: '/notice/basic-list2',
            name: 'notice2',
            component: () => import('@/views/list/TableList'),
            meta: { title: '短信通知',}
          },{
            path: '/notice/basic-list3',
            name: 'notice3',
            component: () => import('@/views/list/TableList'),
            meta: { title: '钉钉通知',}
          },{
            path: '/notice/basic-list4',
            name: 'notice4',
            component: () => import('@/views/list/TableList'),
            meta: { title: '微信通知',}
          },{
            path: '/notice/basic-list5',
            name: 'notice5',
            component: () => import('@/views/list/TableList'),
            meta: { title: '邮件通知',}
          },{
            path: '/notice/basic-list6',
            name: 'notice6',
            component: () => import('@/views/list/TableList'),
            meta: { title: '站内信',}
          },
        ]
      }
    ],
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
