<style lang='less' scoped>
  .message{
    width: 100%;
    min-height: 100vh;
    background: #F8F9FB;
    .createTime{
      padding: 30px 0 0 0;
      font-size: 14px;
      text-align: center;
      color: #333;
    }
    .content{
      width: 80%;
      padding: 20px;
      background: #FFF;
      line-height: 25px;
      box-sizing: 0 0 5px #E4E5E6;
      text-align: justify;
      user-select: text;
      margin: 20px auto;
      white-space: pre-line;
    }
    .url-content{
      width: 80%;
      padding: 20px;
      margin: 20px auto;
      background: #FFF;
      line-height: 25px;
      box-sizing: 0 0 5px #E4E5E6;
      text-align: center;
      .tips-title{
        font-size: 16px;
        color: #000;
        font-weight: 800;
        margin: 5px auto;
      }
      .tips-content{
        font-size: 13px;
        color: #666;
      }
      .url{
        font-size: 15px;
        margin: 5px auto 20px;
        color: #4D94CB;
        font-weight: 800;
      }
    }
    .btns{
      width: 80%;
      margin: 20px auto;
      .btn{
        margin: 10px auto;
      }
    }
  }
</style>
<template>
  <div class="message">
    <nav-bar :title="getFormatMessage.body && getFormatMessage.body.title" back></nav-bar>
    <div class="createTime">{{getFormatMessage.createTime}}</div>
    <div class="content" v-html="getFormatMessage.body && getFormatMessage.body.content">
    </div>
    <div class="url-content" v-if="getFormatMessage.body && getFormatMessage.body.url">
      <div class="tips-title">该推送包含以下网址</div>
      <div class="tips-content">安全性未知，是否打开浏览</div>
      <div class="url">{{getFormatMessage.body && getFormatMessage.body.url}}</div>
      <Button type="primary" @click="openUrl(getFormatMessage.body && getFormatMessage.body.url)">打开</Button>
    </div>
    <div v-show="message.webUrl" style="text-align:center;padding:20px 0;">
      <canvas id="webUrl"></canvas>
      <h3>扫描上方二维码打开网页版</h3>
      <h3>分享及查看更多参数细节</h3>
    </div>
    <div class="btns">
      <Button class="btn" long type="error" size="large" @click="deleteEvent">删除该消息</Button>
    </div>
    
    
  </div>
</template>
<script>
  import { api } from '@/api'
  import { shell } from 'electron'
  import moment from 'moment'
  import QRCode from 'qrcode'
  import navBar from '@/components/navBar'
  export default{
    name: 'message',
    components: {
      navBar
    },
    data () {
      return {
        id: null,
        message: {}
      }
    },
    mounted () {
      this.id = this.$route.params.id
      if (!this.id) return this.$router.back()
      this.getMessage()
    },
    computed: {
      getFormatMessage () {
        this.message.createTime = moment(new Date(this.message.createTime)).format('YYYY/MM/DD HH:mm:ss')
        if (this.message.body) this.message.body.content = this.message.body.content.replace(new RegExp(this.message.body.copyText, 'g'), `<span style="font-weight:900">${this.message.body.copyText}</span>`)
        return this.message
      }
    },
    methods: {
      getMessage () {
        let self = this
        api.notification.message(this.id).then(obj => {
          self.message = obj.message || {}
          if (self.message.webUrl) {
            QRCode.toCanvas(document.getElementById('webUrl'), self.message.webUrl, {
              errorCorrectionLevel: 'H',
              type: 'image/jpeg',
              quality: 0.3,
              margin: 1
            })
          }
        }).catch(() => {
          self.$router.back()
        })
      },
      deleteEvent () {
        let self = this
        api.notification.delMessage(this.id).then(obj => {
          self.$Message.success('删除成功')
          self.$router.back()
        })
      },
      openUrl (url) {
        shell.openExternal(url)
      }
    }
  }
</script>