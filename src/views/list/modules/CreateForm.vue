<template>
  <a-modal
    title="新建"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <a-form-item v-show="model && model.id > 0" label="主键ID">
          <a-input v-decorator="['id', { initialValue: 0 }]" disabled />
        </a-form-item>
        <a-form-item label="类型" v-if="showProductType">
          <a-select placeholder="请选择" v-decorator="['ProductType', {rules: [{required: true}]}]">
            <a-select-option v-for="item in ['智算', '超算']" :value="item">{{item}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="名称">
          <a-input v-decorator="['name', {rules: [{required: true}]}]" />
        </a-form-item>
        <a-form-item label="描述" v-if='showDesc'>
          <a-input v-decorator="['description', {rules: [{required: true}]}]" />
        </a-form-item>
        <a-form-item v-if="showNumber"
                     label="vCPU(核)"
        >
          <a-input-number :min="0" :max="1000" v-decorator="['num1', {rules: [{required: true}]}]" />
        </a-form-item>
        <a-form-item v-if="showNumber"
                     label="内存(GB)"
        >
          <a-input-number :min="0" :max="1000" v-decorator="['num2', {rules: [{required: true}]}]" />
        </a-form-item>
        <a-form-item v-if="showNumber"
                     label="显存(GB)"
        >
          <a-input-number :min="0" :max="1000" v-decorator="['num3', {rules: [{required: true}]}]" />
        </a-form-item>
        <a-form-item v-if="showNumber"
                     label="显存数量"
        >
          <a-input-number :min="0" :max="1000" v-decorator="['num4', {rules: [{required: true}]}]" />
        </a-form-item>
        <a-form-item label="数据中心" v-if="showCenter">
          <a-select placeholder="请选择" default-value="0" v-decorator="['center', {rules: [{required: true}]}]">
            <a-select-option value="0">和林格尔数据中心1</a-select-option>
            <a-select-option value="1">和林格尔数据中心2</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="资源池" v-if="showRbs">
          <a-select placeholder="请选择" default-value="0" v-decorator="['rbs', {rules: [{required: true}]}]">
            <a-select-option value="0">资源池1</a-select-option>
            <a-select-option value="1">资源池2</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item v-if="showPublished" label="是否上架">
          <a-checkbox v-decorator="['published', {rules: [{required: true}]}]"></a-checkbox>
        </a-form-item>
        <a-form-item v-if="showNumber"
          label="库存数量"
        >
          <a-input-number :min="0" :max="1000" v-decorator="['num', {rules: [{required: true}]}]" />
        </a-form-item>
        <a-form-item label="类型" v-if="showDiscountType">
          <a-select placeholder="请选择" v-decorator="['Supplier', {rules: [{required: true}]}]">
            <a-select-option v-for="item in ['满100减20', '满300减20', '满500减20', '满1000减200', '200抵扣劵', '100抵扣劵', 'V100免费体验7天', 'P10特价']" :value="item">{{item}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="超算供应商" v-if="showSupplier">
          <a-select placeholder="请选择" v-decorator="['DiscountType', {rules: [{required: true}]}]">
            <a-select-option v-for="item in ['阿里云', '直营店1', '直营店2', '直营店3']" :value="item">{{item}}</a-select-option>

          </a-select>
        </a-form-item>
        <a-form-item label="商品范围" v-if="showProductRange">
          <a-select placeholder="请选择" v-decorator="['ProductRange', {rules: [{required: true}]}]">
            <a-select-option v-for="item in ['所有商品']" :value="item">{{item}}</a-select-option>

          </a-select>
        </a-form-item>
        <a-form-item
          v-if="showRange"
          label="生效时间">
          <a-range-picker
            name="buildTime"
            style="width: 100%"
            v-decorator="[
              'buildTime',
              {rules: [{ required: true, message: $t('form.basic-form.date.required') }]}
            ]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['description', 'id']

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    model: {
      type: Object,
      default: () => null
    }
  },
  data () {
    this.formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      }
    }
    return {
      form: this.$form.createForm(this),
      showCenter: false,
      showRange: false,
      showDesc: true,
      showProductRange: false,
      showDiscountType: false,
      showSupplier: false,
      showPublished: false,
      showNumber: false,
      showProductType: false,
      showRbs: false
    }
  },
  created () {
    console.log('custom modal created')

    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  },
  mounted() {
    if (this.$route.path === '/rb') {
    } else if (this.$route.path === '/operations/basic-list4' || this.$route.path === '/my-product') {
      this.showCenter = true
      this.showRbs = true
      this.showPublished = true
      this.showNumber = true
      this.showProductType = true
    } else if (this.$route.path === '/discountmanagement/basic-list' || this.$route.path === '/my-discount') {
      this.showRange = true
      this.showDesc = false
      this.showSupplier = true
      this.showProductRange = true
      this.showDiscountType = true
    } else {
    }
  }
}
</script>
