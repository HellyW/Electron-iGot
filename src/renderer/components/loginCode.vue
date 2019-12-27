<!-- 短信验证码 -->
<style lang='less' scoped>
  .loginCode{
    text-align: left;
    .item{
      display: inline-block;
      width: 45px;
      height: 45px;
      margin: 8px 3px;
      text-align: center;
      font-size: 26px;
      font-weight: 800;
    }
  }
</style>
<template>
  <div class='loginCode'>
    <input v-for='(input,index) in length' v-model='code[index]' type='text' :key='index' maxlength='1' class='item' @focus='focusEvent(index)' @input='inputEvent'></input>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default{
    name: 'loginCode',
    props: {
      value: {
        type: String,
        default: ''
      },
      length: {
        type: Number,
        default: 6
      }
    },
    data () {
      return {
        code: this.value.split('') || [],
        acIndex: this.value.length
      }
    },
    watch: {
      code (newVal, oldVal) {
        // if(newVal==oldVal) return
        const regx = /^[0-9a-zA-Z]{1}$/
        newVal.map((v, index) => {
          if (v === undefined) return
          if (v.length > 1) v = v.subStr(0, 1)
          if (!regx.test(v.toString())) v = ''
          newVal[index] = v
        })
        this.$emit('input', newVal.join(''))
        if (newVal.join('').trim().length === this.length) this.$emit('confirm', newVal.join(''))
      },
      acIndex (newVal, oldVal) {
        if (newVal === oldVal) return
        this.setInputFocus()
      }
    },
    mounted () {
      this.setInputFocus()
    },
    methods: {
      setInputFocus () {
        (document.getElementsByClassName('loginCode')[0]).getElementsByTagName('input')[this.acIndex].focus()
      },
      focusEvent (index) {
        // 清空该输入框
        this.acIndex = index
        Vue.set(this.code, index, '')
      },
      inputEvent () {
        if (this.acIndex >= this.length - 1) return
        this.acIndex++
      }
    }
  }
</script>