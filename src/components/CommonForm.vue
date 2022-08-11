<template>
  <el-form label-width="100px" ref="form" :inline="inline">
    <el-form-item
      v-for="item in formItem"
      :key="item.label"
      :label="item.isShowLabel ? item.label : ''">
      <el-input
        v-if="item.type === 'input'"
        v-model="formData[item.model]"
        :size="item.size"
        :placeholder="`请输入${item.label}`"/>

      <el-switch
        v-if="item.type === 'switch'"
        v-model="formData[item.model]"/>

      <el-select
          v-if="item.type === 'select'"
          v-model="formData[item.model]"
          :placeholder="`请选择${item.label}`">
        <el-option
          v-for="op in item.ops"
          :key="op.value"
          :value="op.value"
          :label="op.label"/>
      </el-select>

      <el-date-picker
        v-if="item.type === 'date'"
        type="date"
        v-model="formData[item.model]"
        value-format="yyyy-MM-dd"
        :placeholder="`请选择${item.label}`"/>

      <el-time-picker
          v-if="item.type === 'time'"
          v-model="formData[item.model]"
          :placeholder="`请选择${item.label}`"/>
    </el-form-item>

    <el-form-item>
<!--      留一个槽用作不确定信息-->
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "CommonForm",
  props: {
    inline: Boolean,
    formItem: Array,
    formData: Object,
  },
  data () {
    return {
      // 被逼无奈 被迫使用不推荐的双向绑定，确实，人生不就是这样嘛，明知道这样不好，我们没有办法也知道该怎么办，只能将错就错
      // tFormData: {...this.formData}
    }
  },
  watch: {
    // 对临时变量进行watch，如果改变了就要通知vuex进行数据的更新
    // tFormData: {
    //   deep: true,
    //   handler (value) {
    //     // console.log(value)
    //     this.$emit('formChange', value)
    //   }
    // },
    // formData: {
    //   // 因为props不能及时的监测到数据的更新，所以要用watch来检测是否有新数据，如果有就赋值给另一个临时变量
    //   deep: true,
    //   handler (value) {
    //     this.tFormData = {...value}
    //   }
    // }
  }
}
</script>

<style scoped>

</style>