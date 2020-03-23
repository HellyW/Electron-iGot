<style lang='less'>
  /* CSS */
  /* @import '//at.alicdn.com/t/font_1550410_ds47zz4372q.css'; */
  @import './assets/iconfont.css';
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box !important;
    -moz-box-sizing: border-box !important;
    -webkit-box-sizing: border-box !important;
    font-weight: 300;
    user-select: none;
  }

  .drag{
    -webkit-app-region: drag;
  }

  .no-drag{
    -webkit-app-region: no-drag;
  }

  #app{
    width: 100vw;
    height: 100vh;
  }
  .windows * ::-webkit-scrollbar {
    /*高宽分别对应横竖滚动条的尺寸*/
    width: 6px;     
    height: 1px;
  }

  .windows * ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 3px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #3F3F3F;
  }

  .windows * ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    display: none;
  }

  .window-options{
      padding: 20px 10px;
      position: absolute;
      top: 0;
      right: 0;
      color: #080821;
      -webkit-app-region: no-drag;
      .window-option{
        padding: 2px;
        cursor: pointer;
      }
    }


  .guide-text{
    width: 90%;
    margin: 5px auto;
    line-height: 16px;
    font-size: 12px;
  }
</style>
<template>
  <div id="app" :class="getClass">
    <router-view></router-view>
  </div>
</template>

<script>
  import { ipcRenderer, shell } from 'electron'
  import { api } from '@/api'
  export default {
    name: 'bark',
    mounted () {
      this.listenIPCEvent()
      this.updateApp()
    },
    computed: {
      getClass () {
        return process.platform === 'darwin' ? '' : 'windows'
      },
      getVersion () {
        return '1.1.2'
      }
    },
    methods: {
      listenIPCEvent () {
        ipcRenderer.on('getMessage', (event, id) => {
          this.$router.push(`/message/${id}`)
        })
      },
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
      }
    }
  }
</script>

