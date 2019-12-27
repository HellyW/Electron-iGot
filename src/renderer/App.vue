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
  import { ipcRenderer } from 'electron'
  export default {
    name: 'bark',
    mounted () {
      this.listenIPCEvent()
    },
    computed: {
      getClass () {
        return process.platform === 'darwin' ? '' : 'windows'
      }
    },
    methods: {
      listenIPCEvent () {
        ipcRenderer.on('getMessage', (event, id) => {
          this.$router.push(`/message/${id}`)
        })
      }
    }
  }
</script>

