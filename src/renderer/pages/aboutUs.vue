<style lang='less' scoped>
  .about-us{
    .container{
      text-align: center;
      padding: 0;
      width: 80%;
      margin: 0 auto;
      .logo{
        width: 80px;
        height: 80px;
        margin: 10px 0;
      }
      .app{
        margin: 5px auto;
        font-weight: 800;
      }
      .version{
        font-weight: 400;
        font-size: 12px;
      }
      .intro{
        font-size: 14px;
        width: 100%;
        margin: 10px auto;
        line-height: 20px;
        text-align: justify;
        text-indent: 28px;
      }
      .group{
        width: 200px;
      }
      .btn{
        margin: 10px auto;
      }
    }
  }
</style>
<template>
  <div class="about-us">
    <nav-bar back></nav-bar>
    <div class="container">
      <img class="logo" src="@/assets/logo.png">
      <h3 class="app">iGot</h3>
      <p class="intro">iGot 是一款免费的聚合推送客户端，提供webhook。支持开发者、IT爱好者接入使用。支持自定义各种个性化场景。脑洞有多大，功能就有多强。期待你的投稿~~</p>
      <img class="group" src="@/assets/tucao.jpg">
      <Button class="btn" type="success" long size="large" @click="tucao">交流社区</Button>
      <Button class="btn" type="error" long size="large" @click="updateApp">检查更新</Button>
      <Button class="btn" type="warning" long size="large" @click="logout">退出登录</Button>
    </div>
  </div>
</template>
<script>
  import navBar from '@/components/navBar'
  import { api } from '@/api'
  import { ipcRenderer, shell } from 'electron'
  export default{
    name: 'aboutUs',
    components: {
      navBar
    },
    data () {
      return {
      }
    },
    computed: {
    },
    methods: {
      updateApp () {
        ipcRenderer.send('appUpdate')
      },
      tucao () {
        shell.openExternal('https://support.qq.com/product/111465')
      },
      logout () {
        let self = this
        api.user.logout().then(() => {
          localStorage.removeItem('USER_TOKEN')
          self.$Message.success('注销成功')
          self.$router.push('/')
        })
      }
    }
  }
</script>