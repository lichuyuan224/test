<template>
  <div>
  <a-card v-if="showImg" style="margin-bottom:24px;padding:0" class="img-box" :bordered="false">
    <img id="" style="width: 100%;" v-if="showImg" :src="imgUrl">
  </a-card>
  <a-card :bordered="false"> 
    <div class="table-operator" v-if="!createRight">
      <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
      <a-button icon="edit" :disabled="selectedRowKeys.length === 0">编辑</a-button>
      <a-button icon="delete" :disabled="selectedRowKeys.length === 0">删除</a-button>
    </div>
    <div style="margin-bottom: 10px">
      <a-row>
        <a-col :span="4">
          <a-select
            show-search
            placeholder="状态： 全部"
            style="width: 250px"
          >
          </a-select>
        </a-col>
        <a-col :span="4">
          <a-select
            show-search
            placeholder="执行人： 全部"
            style="width: 250px"
          >
          </a-select>
        </a-col>
        <a-col :span="4">
          <a-date-picker placeholder="执行时间" style="width: 250px" />
        </a-col>
        <a-col :span="4">
          <a-input placeholder="搜索..." allow-clear style="width: 250px" />
        </a-col>
        <a-col :span="2" :offset="6" v-if="createRight">
          <a-button type="primary" @click="handleAdd">快速创建</a-button>
        </a-col>
      </a-row>


    </div>
    <s-table
      ref="table"
      size="default"
      rowKey="key"
      :columns="columns"
      :data="loadData"
      :alert="true"
      :rowSelection="rowSelection"
      showPagination="auto"
    >
      <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>
      <span slot="name" slot-scope="text, record, index">
        <a href="">{{ text }}</a>
      </span>
      <span slot="dashboardName" slot-scope="text, record, index">
        <a href="javascript:;" @click="$router.push('/monitor/show-pic4')">{{ text }}</a>
      </span>
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="description" slot-scope="text">
        <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
      </span>
    </s-table>

    <create-form
      ref="createModal"
      :visible="visible"
      :loading="confirmLoading"
      :model="mdl"
      @cancel="handleCancel"
      @ok="handleOk"
    />
    <step-by-step-modal ref="modal" @ok="handleOk" />
  </a-card>
  </div>

</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { getRoleList, getServiceList } from '@/api/manage'
import { diaodutongji } from '@/core/icons'

import StepByStepModal from './modules/StepByStepModal'
import CreateForm from './modules/CreateForm'

const statusMap = {
  0: {
    status: 'default',
    text: '关闭'
  },
  1: {
    status: 'processing',
    text: '运行中'
  },
  2: {
    status: 'success',
    text: '已上线'
  },
  3: {
    status: 'error',
    text: '异常'
  }
}

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    CreateForm,
    StepByStepModal
  },
  data() {
    return {
      // create model
      visible: false,
      confirmLoading: false,
      createRight: false,
      mdl: null,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      showImg: false,
      imgUrl: '',
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)

        console.log('loadData request parameters:', requestParameters)
        return new Promise(resolve => {
          setTimeout(() => {
            if(this.$route.path === '/monitor/basic-list') {
              requestParameters.totalCount = 8
            }else if(this.$route.path === '/monitor/basic-list2' || this.$route.path === '/monitor/basic-list3') {
              requestParameters.totalCount = 4
            }else {
              requestParameters.totalCount = null
            }
            console.log(111)
            resolve(getServiceList(requestParameters).result)
          }, 1000)
        })
      },
      selectedRowKeys: [],
      selectedRows: [],
      columns: []
    }
  },
  filters: {
    statusFilter(type) {
      return statusMap[type].text
    },
    statusTypeFilter(type) {
      return statusMap[type].status
    }
  },
  created() {
    getRoleList({ t: new Date() })
  },
  computed: {
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  methods: {
    handleAdd() {
      this.mdl = null
      this.visible = true
    },
    handleEdit(record) {
      this.visible = true
      this.mdl = { ...record }
    },
    handleOk() {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          if (values.id > 0) {
            // 修改 e.g.
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve()
              }, 1000)
            }).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info('修改成功')
            })
          } else {
            // 新增
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve()
              }, 1000)
            }).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info('新增成功')
            })
          }
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel() {
      this.visible = false

      const form = this.$refs.createModal.form
      form.resetFields() // 清理表单数据（可不做）
    },
    handleSub(record) {
      if (record.status !== 0) {
        this.$message.info(`${record.no} 订阅成功`)
      } else {
        this.$message.error(`${record.no} 订阅失败，规则已关闭`)
      }
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    resetSearchForm() {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  },
  mounted() {
    this.createRight = this.$route.path === '/dispatch'
    this.showImg = this.$route.path === '/dispatch'
    this.imgUrl = diaodutongji

    if (this.$route.path === '/rb' || this.$route.path === '/my-rb') {
      this.columns.push(...[
        {
          title: '名称',
          dataIndex: 'no',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '描述',
          dataIndex: 'description',
          scopedSlots: { customRender: 'description' }
        },
        {
          title: '总算力(MFLOPS)',
          dataIndex: 'calculateForce'
        }, {
          title: 'GPU(卡)',
          dataIndex: 'gpu'
        }, {
          title: 'VCPU(核)',
          dataIndex: 'cpu'
        }, {
          title: '存储(TB)',
          dataIndex: 'storage'
        }, {
          title: '内存(GB)',
          dataIndex: 'memory'
        }, {
          title: '带宽(Mb/s)',
          dataIndex: 'bandwidth'
        }, {
          title: '延迟(ms)',
          dataIndex: 'delay'
        }, {
          title: '是否上架',
          dataIndex: 'published'
        },
        {
          title: '更新时间',
          dataIndex: 'updatedAt',
          sorter: true
        },
        {
          title: '创建时间',
          dataIndex: 'createdAt',
          sorter: true
        }])
    } else if (this.$route.path === '/operations/basic-list4' || this.$route.path === '/my-product') {
      this.columns.push(...[
        {
          title: '商品ID',
          dataIndex: 'id'
        }, {
          title: '类型',
          dataIndex: 'productType'
        },
        {
          title: '名称',
          dataIndex: 'productName',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '描述',
          dataIndex: 'productDesc',
          scopedSlots: { customRender: 'description' }
        }, {
          title: 'VCPU(核)',
          dataIndex: 'cpu'
        }, {
          title: '内存(GB)',
          dataIndex: 'memory'
        }, {
          title: '显存(GB)',
          dataIndex: '100'
        }, {
          title: '显存数量',
          dataIndex: '10'
        }, {
          title: '资源池',
          dataIndex: 'rbs'
        }, {
          title: '数据中心',
          dataIndex: 'centers'
        }, {
          title: '是否上架',
          dataIndex: 'published'
        }, {
          title: '库存数量',
          dataIndex: '100v2'
        },
        {
          title: '上架时间',
          dataIndex: 'createdAt',
          sorter: true
        }])
    } else if (this.$route.path === '/discountmanagement/basic-list' || this.$route.path === '/my-discount') {
      this.columns.push(...[
        {
          title: '名称',
          dataIndex: 'discountName',
          scopedSlots: { customRender: 'name' }
        }, {
          title: '类型',
          dataIndex: 'discountType'
        }, {
          title: '序列号',
          dataIndex: 'snId'
        }, {
          title: '超算供应商',
          dataIndex: 'supplier'
        }, {
          title: '生效时间',
          dataIndex: 'validRange'
        }, {
          title: '规则',
          dataIndex: 'discountName'
        }, {
          title: '商品范围',
          dataIndex: 'discountRange'
        },
        {
          title: '发布时间',
          dataIndex: 'createdAt',
          sorter: true
        }])
    } else if (this.$route.path === '/my-activity') {
      this.columns.push(...[
        {
          title: '名称',
          dataIndex: 'activityName',
          scopedSlots: { customRender: 'name' }
        }, {
          title: '生效时间',
          dataIndex: 'validRange'
        }, {
          title: '折扣率',
          dataIndex: 'discountRate'
        }, {
          title: '商品范围',
          dataIndex: 'discountRange'
        },
        {
          title: '状态',
          dataIndex: 'activityStatus'
        }])
    } else if (this.$route.path === '/monitor/basic-list2') {
      this.columns.push(...[
        {
          title: '告警策略名称',
          dataIndex: 'alartPolicyName',
          scopedSlots: { customRender: 'name' }
        }, {
          title: '资源类型',
          dataIndex: 'resourceType'
        }, {
          title: '告警策略类型',
          dataIndex: 'alartPolicyType'
        }, {
          title: '创建者',
          dataIndex: 'alartPolicyCreator'
        }, {
          title: '创建时间',
          dataIndex: 'createdAt',
          sorter: true
        }])
    } else if (this.$route.path === '/monitor/basic-list3') {
      this.columns.push(...[
        {
          title: '告警名称',
          dataIndex: 'alartName',
          scopedSlots: { customRender: 'name' }
        }, {
          title: '警报级别',
          dataIndex: 'alartLevel'
        }, {
          title: '告警策略名称',
          dataIndex: 'alartPolicyName'
        },
         {
          title: '告警范围',
          dataIndex: 'alartInclude'
        },
         {
          title: '告警对象',
          dataIndex: 'alartObj'
        },
         {
          title: '状态',
          dataIndex: 'alartStatus'
        }, {
          title: '创建者',
          dataIndex: 'alartPolicyCreator'
        }, {
          title: '创建时间',
          dataIndex: 'createdAt',
          sorter: true
        }])
    } else if (this.$route.path === '/monitor/basic-list') {
      this.columns.push(...[
        {
          title: '名称',
          dataIndex: 'dashboardName',
          scopedSlots: { customRender: 'dashboardName' }
        }, {
          title: '描述',
          dataIndex: 'dashboardDes'
        }, {
          title: '云平台类型',
          dataIndex: 'dashboardType'
        }, {
          title: '授权',
          dataIndex: 'dashboardPremission'
        }, {
          title: '创建者',
          dataIndex: 'dashboardUser'
        }, {
          title: '创建时间',
          dataIndex: 'createdAt'
        }])
    } else {
      this.columns.push(...[
        {
        title: '名称',
        dataIndex: 'no',
        scopedSlots: { customRender: 'name' }
      },
        {
          title: '描述',
          dataIndex: 'description',
          scopedSlots: { customRender: 'description' }
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        }, {
          title: '类型',
          dataIndex: 'type'
        },
        {
          title: '更新时间',
          dataIndex: 'updatedAt',
          sorter: true
        },
        {
          title: '创建时间',
          dataIndex: 'createdAt',
          sorter: true
        }])
    }
  }
}
</script>
<style lang="less" scoped>
  :deep(.img-box.ant-card) {
    .ant-card-body {
      padding:0;
    }
  }

</style>