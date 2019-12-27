<style lang='less' scoped>
  .subscribe{
    width: 100%;
    height: 100%;
    background: #FBFBFB;
    .my-subscribe-icon{
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
        }
      }
    }
  }
</style>
<template>
  <div class="subscribe">
    <nav-bar>
      <div slot="extras">
        <div class="my-subscribe-icon" @click="mySubscribe">
          <Icon custom="iconfont icon-wo" size="20"></Icon>
        </div>
      </div>
    </nav-bar>
    <Scroll :on-reach-bottom="getFsendLinks" height="720">
      <div class="links">
        <div class="guide">
          <div class="guide-text warning">免责声明：以下服务第三方提供，其中推送的相关广告、项目信息等，均由第三方信息发布者自行提供。本站点对此等信息的准确性、完整性、合法性或真实性均不承担任何责任。此外，对任何使用或提供本站点信息的商业活动及其风险不承担任何责任。</div>
          </div>
        <div class="link" v-for="link,index in links">
          <Card :title="link.name">
            <div class="link-content">
              <img class="link-qrcode" :src="link.subscribe">
              <div class="guide-text">微信扫描上方小程序订阅</div>
              <div class="guide-text warning">确认订阅后您需对该服务推送信息产生的结果自行承担风险</div>
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
    name: 'subscribe',
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
          api.link.marketLinks(this.params).then(obj => {
            self.links = self.params.index === 1 ? obj.links || [] : self.links.concat(obj.links || [])
            self.params.index++
            resolve()
          })
        })
      },
      mySubscribe () {
        this.$router.push('/subscribe/my')
      }
    }
  }
</script>