<template>
  <a-list
    rowKey="id"
    :grid="{gutter: 24, lg: 4, md: 2, sm: 1, xs: 1}"
    :dataSource="dataSource"
    class="card-list"
  >
    <a-list-item slot="renderItem" slot-scope="item" @click="select(item)">
      <template v-if="!item || item.title === undefined">
        <a-button class="new-btn" type="dashed" style="height: 403px">
          <a-icon type="plus"/>
          新增
        </a-button>
      </template>
      <template v-else>
        <a-card :hoverable="true" :class="{'cc-selected': item.selected}" @click="toDc">
          <a-card-meta>
            <a slot="title">{{ item.title + (item.index || '') }}</a>
            <div class="meta-content" slot="description">{{ item.des }}</div>
            <div class='overfolw-cc' slot="description">
              <div class="cc-card" slot="description">
                <div class="label">数据中心</div>
                <ul class="content dataCenters">
                  <li v-for="(center, index) in item.dataCenters">{{ center }}</li>
                </ul>
              </div>
              <div class="cc-card" slot="description">
                <div class="label">
                  <div>资源池</div>
                  <i class="resourceBundle">{{ item.resourceBundle }}</i>
                </div>
                <ul class="content">
                  <li v-for="(powerInfo, index) in item.power">
                    <span v-if="index === 'all'">总算力：{{ powerInfo }} MFLOPS</span>
                    <span v-if="index === 'on'">已售算力：{{ powerInfo }}</span>
                    <span v-if="index === 'off'">剩余算力：{{ powerInfo }}</span>
                  </li>
                  <li>GPU：{{ item.num.gpu }} 卡</li>
                  <li>VCPU：{{ item.num.vcpu }} 核</li>
                  <li>存储：{{ item.num.mem }} GB</li>
                  <li>带宽：{{ item.num.bandwidth }} M</li>
                  <li>延迟：{{ item.num.delay }} ms</li>
                </ul>
              </div>
            </div>

            <div class="cc-card" slot="description">
              <div class="label line-height-2">总销售额</div>
              <div class="content pad40L green-font"><span class="unit">{{ item.unit }}</span> {{ item.sales }}</div>
            </div>
          </a-card-meta>
        </a-card>
      </template>
    </a-list-item>
    <a-modal :width="640" v-model="visible" title="新增" @ok="handleOk"
             cancelText='取消' okText='确定'>
      <a-form :form="form" v-bind="formLayout">
        <a-form-item label="名称">
          <a-input v-decorator="['title']" />
        </a-form-item>
        <a-form-item label="描述">
          <a-textarea v-decorator="['des']"></a-textarea>
        </a-form-item>
        <a-form-item label="数据中心">
          <a-select mode="multiple" placeholder="请选择数据中心" v-decorator="[ 'dataCenters', {rules: [{ required: true, message: '请选择数据中心'}]} ]">
            <a-select-option value="和林格尔数据中心1">和林格尔数据中心1</a-select-option>
            <a-select-option value="和林格尔数据中心2">和林格尔数据中心2</a-select-option>
            <a-select-option value="和林格尔数据中心3">和林格尔数据中心3</a-select-option>
            <a-select-option value="和林格尔数据中心4">和林格尔数据中心4</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>

  </a-list>
</template>

<script>

const dataSource = []
const defaultData = {
  title: '直营店',
  des: '说明文字：最高配置4张NVIDIA 16G显存T4计算卡，372G DDR4内存',
  dataCenters: ['和林格尔数据中心1', '和林格尔数据中心2'],
  resourceBundle: '5.0',
  num: {gpu: 4, vcpu: 128, mem: 256, disk: 3000, bandwidth: 3000, delay: 33},
  power: {all: '200,305', on: '77,654', off: '122,651'},
  sales: '346,742.99',
  unit: '¥',
  selected: false
}
const aliData = {
  title: '阿里云',
  des: '说明文字：最高配置4张NVIDIA 16G显存T4计算卡，372G DDR4内存',
  dataCenters: ['和林格尔数据中心1', '和林格尔数据中心2'],
  resourceBundle: '5.0',
  num: {gpu: 4, vcpu: 128, mem: 256, disk: 3000, bandwidth: 3000, delay: 33},
  power: {all: '36,544', on: '11,600', off: '24,944'},
  sales: '346,572.15',
  unit: '¥',
  selected: false
}
const huaweiData = {
  title: '华为云',
  des: '说明文字：最高配置4张NVIDIA 16G显存T4计算卡，372G DDR4内存',
  dataCenters: ['华为云数据中心1', '华为云数据中心2'],
  resourceBundle: '5.0',
  num: {gpu: 4, vcpu: 128, mem: 256, disk: 3000, bandwidth: 3000, delay: 33},
  power: {all: '19,343', on: '8,001', off: '11,342'},
  sales: '266,990.03',
  unit: '¥',
  selected: false
}
const txData = {
  title: '腾讯云',
  des: '说明文字：最高配置4张NVIDIA 16G显存T4计算卡，372G DDR4内存',
  dataCenters: ['和林格尔数据中心1', '和林格尔数据中心2'],
  resourceBundle: '5.0',
  num: {gpu: 4, vcpu: 128, mem: 256, disk: 3000, bandwidth: 3000, delay: 33},
  power: {all: '36,544', on: '11,600', off: '24,944'},
  sales: '346,572.15',
  unit: '¥',
  selected: false
}
dataSource.push({})
dataSource.push(Object.assign( {id: 1, index: 1}, defaultData))
dataSource.push(Object.assign( {id: 2, index: 2}, defaultData))
dataSource.push(Object.assign( {id: 3, index: 3}, defaultData))
dataSource.push(Object.assign({id: 4, index: 1}, aliData))
dataSource.push(Object.assign({id: 5, index: 2}, aliData))
dataSource.push(Object.assign({id: 6, index: 3}, aliData))
dataSource.push(Object.assign({id: 7, index: 1}, huaweiData))
dataSource.push(Object.assign({id: 8, index: 2}, huaweiData))
dataSource.push(Object.assign({id: 9, index: 1}, txData))
dataSource.push(Object.assign({id: 10, index: 2}, txData))

const fields = ['title', 'des', 'dataCenters']

export default {
  name: 'SuperManagement',
  data () {
    return {
      dataSource,
      visible: false,
      formLayout: {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 7 }
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 13 }
          }
        },
      form: this.$form.createForm(this)
    }
  },
  mounted() {
    if (this.$route.path === '/my-shop') {
      this.dataSource = [
        {},
        {
          id: 1,
          index: 1,
          title: '阿里云',
          des: '说明文字：最高配置4张NVIDIA 16G显存T4计算卡，372G DDR4内存',
          dataCenters: ['和林格尔数据中心1', '和林格尔数据中心2'],
          resourceBundle: '5.0',
          num: {gpu: 4, vcpu: 128, mem: 256, disk: 3000, bandwidth: 3000, delay: 33},
          power: {all: '36,544', on: '11,600', off: '24,944'},
          sales: '346,572.15',
          unit: '¥',
          selected: false
        },
        {
          id: 2,
          index: 2,
          title: '阿里云',
          des: '说明文字：最高配置4张NVIDIA 16G显存T4计算卡，372G DDR4内存',
          dataCenters: ['和林格尔数据中心1', '和林格尔数据中心2'],
          resourceBundle: '5.0',
          num: {gpu: 4, vcpu: 128, mem: 256, disk: 3000, bandwidth: 3000, delay: 33},
          power: {all: '36,544', on: '11,600', off: '24,944'},
          sales: '346,572.15',
          unit: '¥',
          selected: false
        },
        {
          id: 3,
          index: 3,
          title: '阿里云',
          des: '说明文字：最高配置4张NVIDIA 16G显存T4计算卡，372G DDR4内存',
          dataCenters: ['和林格尔数据中心1', '和林格尔数据中心2'],
          resourceBundle: '5.0',
          num: {gpu: 4, vcpu: 128, mem: 256, disk: 3000, bandwidth: 3000, delay: 33},
          power: {all: '36,544', on: '11,600', off: '24,944'},
          sales: '346,572.15',
          unit: '¥',
          selected: false
        }
      ]
    }
  },
  methods: {
    select (item) {
      this.dataSource.forEach(d => {
        d.selected = d.id === item.id
      })
      if (!item.title) {
        this.handleAdd();
      }
    },
    handleAdd () {
      this.visible = true
    },
    toDc() {
      if (this.$route.path === '/operations/basic-list') {
        this.$router.push('/yunyinOperations/data-center')
      }
      if (this.$route.path === '/my-shop') {
        this.$router.push('/my-center')
      }
    },
    handleOk () {
      const formValue = this.form.getFieldsValue(fields);
      this.dataSource.splice(1, 0, {
        title: formValue.title,
        des: formValue.des,
        dataCenters: formValue.dataCenters,
        resourceBundle: '5.0',
        num: {gpu: 8, vcpu: 128, mem: 1024, disk: 3000, bandwidth: 3000, delay: 13},
        power: {all: '3,067,588', on: '123,346', off: '2,944,242'},
        sales: '646,572.15',
        unit: '¥',
        selected: false
      })
      this.visible = false
      this.form.resetFields()
    },
    handleCancel () {
      this.visible = false
      this.form.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/components/index.less";
@theme-color: #02A04E;
.cc-selected {
  border: 1px solid @theme-color;
  :deep(.ant-card-meta-title) {
    &>a {
      color: @theme-color !important;
    }
  }
}
:deep(.ant-btn-dashed:hover),
:deep(.ant-btn-dashed:focus) {
  border-color: @theme-color !important;
  color: @theme-color;
}
.green-font {
  color: @theme-color !important;
  font-size: 20px;
}
.pad40L {
  padding-left: 40px;
  .unit{
    font-size: 14px;
  }
}
.line-height-2 {
  line-height: 2;
}
.cc-card {
  .resourceBundle{
    color: #fff;
    display: block;
    width: 40px;
    text-align: center;
    border-radius: 13px 0;
    background-color: #ff6a00;
  }
  .label {
    flex: 1;
  }
  margin-bottom: 1.75em;
  display: flex;
  .content {
    flex: 2;
    color: rgba(0, 0, 0, 0.85);
  }
  .dataCenters li{
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(0,0,0,0.15);
    &:not(:first-child) {
      padding-top: 8px;
    }
  }
}
.card-list {

  :deep(.ant-row .ant-col) {
    padding-left: 30px !important;
    padding-right: 30px !important;
    .ant-list-item {
      padding: 20px 0;
    }
  }
  :deep(.ant-card) {
    height: 411px;
    .overfolw-cc {
      height: 224px;
      &.overfolw-cc::-webkit-scrollbar { width: 0 !important }
      overflow: -moz-scrollbars-none;
      overflow-y: auto;
    }

    //.ant-card-meta-description {
    //  &::-webkit-scrollbar { width: 0 !important }
    //  overflow: -moz-scrollbars-none;
    //  max-height: 360px;
    //  overflow-y: auto;
    //}
  }
  :deep(.ant-card-body:hover) {
    .ant-card-meta-title>a {
      color: @theme-color;
    }
  }

  :deep(.ant-card-meta-title) {
    margin-bottom: 12px;

    &>a {
      display: inline-block;
      max-width: 100%;
      color: rgba(0,0,0,.85);
    }
  }

  :deep(.meta-content) {
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    height: 50px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;

    margin-bottom: 1.75em;
  }
}

.card-avatar {
  width: 48px;
  height: 48px;
  border-radius: 48px;
}

.ant-card-actions {
  background: #f7f9fa;

  li {
    float: left;
    text-align: center;
    margin: 12px 0;
    color: rgba(0, 0, 0, 0.45);
    width: 50%;

    &:not(:last-child) {
      border-right: 1px solid #e8e8e8;
    }

    a {
      color: rgba(0, 0, 0, .45);
      line-height: 22px;
      display: inline-block;
      width: 100%;
      &:hover {
        color: @primary-color;
      }
    }
  }
}

.new-btn {
  background-color: #fff;
  border-radius: 2px;
  width: 100%;
  height: 188px;
}

</style>
