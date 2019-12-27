<style lang='less' scoped>
  .push-way{
    width: 100%;
    height: 100vh;
    overflow: hidden;
    overflow-y: scroll;
    background: #FBFBFB;
    .push-way-container{
      .push-ways{
        padding: 20px;
        .card{
          margin: 10px auto;
          background: #FFF;
          border-radius: 5px;
          padding: 10px;
          cursor: move;
          .content{
            padding: 20px;
            .key{
              font-weight: 800;
            }
            .btns{
              margin: 5px;
              text-align: right;
              span.btn{
                padding: 5px;
                color: #034EB3;
                cursor: pointer;
                font-weight: 800;
              }
            }
            .qrcode{
              width: 100%;
              text-align: center;
              img.wechat-qrcode{
                width: 180px;
                height: 180px;
              }
            }
          }
        }
      }
    }
  }
</style>
<template>
  <div class="push-way">
    <nav-bar></nav-bar>
    <div class="push-way-container">
      <div class="push-ways">
        <div class="guide">
          <div class="guide-text" style="font-weight:800">拖拽可调整推送顺序</div>
          <div class="guide-text">当前将按照<span v-for="order,index in orders" :key="index" style="font-weight:800">{{ways[order]}}{{index!==orders.length-1 ? '、' : ''}}</span>顺序依次向您推送消息。所有方式均无法送达时，需要您登陆小程序及第三方客户端查看。</div>
        </div>
        <draggable v-model="orders" @change="changeOrders">
          <transition-group>
            <div v-for="order,index in orders" class="card" :key="index">
                <div class="app">
                  <Icon :custom="'iconfont icon-push-way-'+order" size="25"></Icon>
                  <span style="font-weight:800">{{ways[order]}}</span>
                </div>
                <div class="content" v-if="pushWay[order].status!==0">
                  <div class="key">{{pushWay[order].key}} [{{pushWay[order].status===1 ? '待验证' : '已绑定'}}]</div>
                  <div class="btns">
                    <span class="btn" @click="unBind(order)">解绑</span>
                    <span v-if="pushWay[order].status===1 && order !== 'wechat'" class="btn" @click="verify(order)">验证</span>
                  </div>
                </div>
                <!-- 所有未绑定的需显示绑定输入框和能力 -->
                <div class="content" v-else>
                  <div class="input-key" v-if="order !== 'wechat'">
                    <Input v-model="keys[order]" :placeholder="order==='email' ? '请输入合法有效的邮箱地址' : '请输入正确的推送key'"></Input>
                    <div class="btns">
                      <span class="btn" @click="bind(order)">绑定</span>
                    </div>
                  </div>
                  <!-- 微信公众号 显示qrcode -->
                  <div class="qrcode" v-else-if="wechatUrl">
                    <img class="wechat-qrcode" :src="wechatUrl">
                    <p>请扫描上方二维码完成绑定</p>
                  </div>
                </div>
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script>
  import { api } from '@/api'
  import draggable from 'vuedraggable'
  import navBar from '@/components/navBar'
  export default {
    name: 'pushWay',
    components: {
      navBar,
      draggable
    },
    data () {
      return {
        keys: {},
        pushWay: {},
        orders: [],
        wechatUrl: null,
        ways: {
          bark: 'bark App',
          email: 'Email 邮件',
          wechat: '微信公众号'
        }
      }
    },
    mounted () {
      this.getPushWay()
    },
    methods: {
      getPushWay () {
        let self = this
        api.pushWay.getPushWay().then(obj => {
          self.orders = obj.pushWay.orders || []
          self.pushWay = obj.pushWay || {}
          if (self.pushWay.wechat.status !== 2) self.getWeChatOAImg()
        })
      },
      getWeChatOAImg () {
        let self = this
        if (this.wechatUrl) return
        api.pushWay.wechatBind().then(obj => {
          self.wechatUrl = obj.qrcode
        })
      },
      changeOrders () {
        let self = this
        api.pushWay.setOrders(this.orders).then(() => {
          self.$Message.success('修改成功')
        }).catch(() => {
          self.getPushWay()
        })
      },
      unBind (type) {
        let self = this
        api.pushWay.unBind(type).then(() => {
          self.$Message.success('解绑成功')
          self.getPushWay()
        })
      },
      verify (type) {
        let self = this
        api.pushWay.verify(type).then(() => {
          self.$Message.success('发送成功，请点开推送完成验证')
          setTimeout(() => {
            self.getPushWay()
          }, 3000)
        }).catch(() => {
          self.getPushWay()
        })
      },
      _getBarkKeyFromUrl (url) {
        const barUrlRegx = /^https:\/\/api\.day\.app\/(([^/].)*).*$/
        const barkIdRegx = /^[0-9A-Za-z]+$/
        const _barkId = url.trim().replace(barUrlRegx, '$1')
        return barkIdRegx.test(_barkId) ? _barkId : null
      },
      bind (type) {
        let self = this
        if (!this.keys[type]) return this.$Message.error('请输入需绑定的key或邮件地址')
        let key = this.keys[type]
        switch (type) {
          case 'bark': {
            key = self._getBarkKeyFromUrl(key)
            if (key === null) self.$Message.error('请输入正确的推送key')
            break
          }
          case 'email': {
            const emailRegx = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            if (!emailRegx.test(key)) {
              key = null
              self.$Message.error('请输入合法的邮箱地址')
            }
            break
          }
        }
        if (!key) return
        api.pushWay.bind(type, key).then(() => {
          self.$Message.success('绑定成功，请继续点击验证')
          self.getPushWay()
        })
      }
    }
  }
</script>