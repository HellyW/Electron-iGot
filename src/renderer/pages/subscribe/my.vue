<style lang='less' scoped>
  .my-subscribe{
    width: 100%;
    height: 100%;
    background: #FBFBFB;
    .add-subscribe-icon{
      font-weight: 800;
      cursor: pointer;
    }
    .links{
      padding: 20px;
      .guide{
        padding: 20px 0;
        .guide-text.warning{
          font-weight: 800;
        }
      }
      .link{
        margin: 10px auto;
        .link-content{
          padding: 20px;
          text-align: center;
          img.link-qrcode{
            width: 160px;
            height: 160px;
            margin: 10px auto;
          }
          .warning{
            font-weight: 800;
            color: #555;
          }
          .btn{
            display: inline-block;
            margin: 5px auto;
            padding: 5px;
            background: #468CE9;
            color: #FFF;
            cursor: pointer;
            font-weight: 800;
          }
        }
      }
    }
  }
</style>
<template>
  <div class="my-subscribe">
    <nav-bar back>
      <div slot="extras">
        <div class="add-subscribe-icon" @click="addSubscribe">
          <Icon custom="iconfont icon-tianjia" size="20"></Icon>
        </div>
      </div>
    </nav-bar>
    <Scroll :on-reach-bottom="getFsendLinks" height="720">
      <div class="links">
        <div class="guide">
          <div class="guide-text warning">推送须知：您的推送将由腾讯做文本安全审核，请不要推送涉及时政、社会、色情、传销等信息。您需要对您推送的消息及其产生的后果负有全部法律责任。平台会对违规推送的订阅号及个人进行封禁处理</div>
        </div>
        <div class="link" v-for="link,index in links" :key="index" @click="redirect(link.key)">
          <Card :title="link.name">
            <div class="link-content">
              <img class="link-qrcode" :src="link.subscribe">
              <div class="guide-text">微信扫描上方小程序订阅</div>
              <div class="guide-text warning">确认订阅后您需对该服务推送信息产生的结果自行承担风险</div>
              <div class="guide-text btn">点击进入API说明</div>
            </div>
          </Card>
        </div>
     </div>
    </Scroll>
  </div>
</template>
<script>
  import { api } from '../../api'
  import navBar from '@/components/navBar'
  export default{
    name: 'mySubscribe',
    data () {
      return {
        params: {
          index: 1,
          size: 20
        },
        links: []
      }
    },
    components: {
      navBar
    },
    mounted () {
      this.params.index = 1
      this.getFsendLinks()
    },
    methods: {
      getFsendLinks () {
        let self = this
        return new Promise(resolve => {
          api.link.links(this.params).then(obj => {
            self.links = self.params.index === 1 ? obj.links || [] : self.links.concat(obj.links || [])
            self.params.index++
            resolve()
          })
        })
      },
      addSubscribe () {
        this.$router.push('/subscribe/add')
      },
      redirect (key) {
        this.$router.push(`/api?id=${key}`)
      }
    }
  }
</script>