<style lang='less' scoped>
  .about-us{
    .container{
      text-align: center;
      padding: 30px 0;
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
      <h5 v-if="getVersion" class="version">{{getVersion}}</h5>
      <p class="intro">iGot 是一款免费的聚合推送客户端，提供webhook。支持开发者、IT爱好者接入使用。支持自定义各种个性化场景。脑洞有多大，功能就有多强。期待你的投稿~~</p>
      <img class="group" src="@/assets/qq.jpeg">
      <Button class="btn" type="error" long size="large" @click="updateApp">检查更新</Button>
      <Button class="btn" type="warning" long size="large" @click="logout">退出登录</Button>
    </div>
  </div>
</template>
<script>
  import navBar from '@/components/navBar'
  import { api } from '@/api'
  import { shell } from 'electron'
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
      getVersion () {
        return '1.1.0'
      }
    },
    methods: {
      updateApp () {
        let self = this
        api.client.getVersion().then(obj => {
          if (obj.version.version === this.getVersion) return self.$Message.success('当前已是最新版本')
          self.$Modal.info({
            title: `当前最新版本为${obj.version.version}`,
            content: `该版本主要升级内容为【${obj.version.intro}】旧版本的客户端可能会影响您的使用和体验，建议您尽快完成升级。升级需您手动下载客户端并安装`,
            okText: '立即下载',
            onOk: () => {
              shell.openExternal(`${(obj.version.url && obj.version.url[self.$isMac ? 'mac' : 'win']) || 'https://wahao.github.io/Bark-MP-helper/#/zh-cn/?id=igot-client'}`)
            }
          })
        })
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