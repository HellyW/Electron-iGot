<style lang='less' scoped>
 .login{
    -webkit-app-region: drag;
    width: 100vw;
    height: 100vh;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    .login-box{
      width: 80%;
      text-align: center;
      -webkit-app-region: no-drag;
      .login-code{
        width: 160px;
        height: 160px;
        margin: 15px 0;
      }
      .login-guide{
        margin: 10px auto;
        font-size: 25px;
        font-weight: 300;
      }
      .login-tips{
        font-size: 14px;
      }
      .login-input{
        margin: 15px auto;
      }
    }
    
 }
</style>

<template>
  <div class="login" >
    <div v-if="!$isMac" class="window-options no-drag">
      <Icon custom="window-option iconfont icon-guanbi1" size="20" @click="closeAppEvent"></Icon>
    </div>
    <div class="login-box">
      <img class="login-code" src="../assets/login-code.jpg">
      <h3 class="login-guide">请使用微信扫一扫</h3>
      <p class="login-tips">请输入手机端生成的六位随机登陆码</p>
      <login-code v-model="code" class="login-input" @confirm="login"></login-code>
    </div>
  </div>
</template>

<script>
  import loginCode from '../components/loginCode'
  import { ipcRenderer } from 'electron'
  import { api } from '../api'
  export default {
    name: 'login',
    components: {
      loginCode
    },
    data () {
      return {
        code: ''
      }
    },
    mounted () {
      this.autoLogin()
    },
    methods: {
      login () {
        if (!this.code) return this.$Message.error('请输入登录码')
        let self = this
        api.user.login(this.code).then(obj => {
          ipcRenderer.send('subscribe', obj.token)
          self.$router.push({
            name: 'notification'
          })
        })
      },
      autoLogin () {
        if (!localStorage.getItem('USER_TOKEN')) return
        let self = this
        api.notification.messages({
          index: 1,
          size: 20
        }).then(obj => {
          ipcRenderer.send('subscribe', localStorage.getItem('USER_TOKEN'))
          self.$router.push({
            name: 'notification'
          })
        })
      },
      closeAppEvent () {
        ipcRenderer.send('closeApp')
      }
    }
  }
</script>

