<style lang='less' scoped>
  .jpoint{
    .my{
      text-align: center;
      padding: 20px 10px;
      h3{
        font-weight: 600;
      }
      p{
        font-size: 30px;
        color: #f00;
        font-weight: 800;
        padding: 10px 0;
      }
    }
    .card{
      width: 90%;
      margin: 20px auto;
      background: #F2FAFE;
      border: 1px solid #B4DBFC;
      border-radius: 5px;
      padding: 8px 5px;
      h3{
        font-weight: 800;
      }
      p{
        font-size: 12px;
        margin: 4px 0;
      }
    }
  }
</style>
<template>
  <div class="jpoint">
    <nav-bar></nav-bar>
    <!-- 个人账户一览 -->
    <p style="text-align:center;margin-top:10px">当前免奇点登录特权有效期至</p>
    <p style="text-align:center">{{getFormatVipDate}}</p>
    <div class="my">
      <h3>您当前账号还余奇点</h3>
      <p>{{count}}
        <Tooltip content="更新账户奇点余额">
          <Icon :size="22" custom="iconfont icon-ziyuan" @click="getUserInfo"></Icon>
        </Tooltip>
        <span style="color:#666;font-size:13px;font-weight: 300;padding:0 3px">个</span>
      </p>
    </div>
    <div class="card">
      <Row type="flex" justify="center" align="middle">
        <Col span="18">
          <h3>看视频得奇点</h3>
          <p>观看视频广告，免费获取奇点</p>
        </Col>
        <Col span="6" style="text-align:center;">
          <Tooltip placement="left">
            <Button type="error">领取</Button>
            <div slot="content">
              <img style="width:180px;height:180px" src="@/assets/ad-code.jpg">
              <p style="text-align:center;font-weight:600">请使用微信扫一扫</p>
            </div>
          </Tooltip>
        </Col>
      </Row>
    </div>
    <div v-for="plan,index in plans" :key="index" class="card">
      <Row type="flex" justify="center" align="middle">
        <Col span="18" style="padding: 0 10px;">
          <h3>{{plan.label}}</h3>
          <p>{{plan.describe}}</p>
        </Col>
        <Col span="6" style="text-align:center;">
          <Button @click="exchange(plan.id)">兑换</Button>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
  import { api } from '../../api'
  import moment from 'moment'
  import navBar from '@/components/navBar'
  export default{
    name: 'jpoint',
    components: {
      navBar
    },
    data () {
      return {
        count: 0,
        plans: [],
        vip: Date.now()
      }
    },
    mounted () {
      this.getPlans()
      this.getUserInfo()
    },
    computed: {
      getFormatVipDate () {
        return moment(new Date(this.vip)).format('YYYY/MM/DD HH:mm:ss')
      }
    },
    methods: {
      getPlans () {
        let self = this
        api.jpoint.plans().then(obj => {
          self.plans = obj.plans
        })
      },
      getUserInfo () {
        let self = this
        api.user.info().then(obj => {
          self.count = obj.balance
          self.vip = obj.vip
          self.$Message.success('更新成功')
        })
      },
      exchange (id) {
        let self = this
        api.jpoint.exchange(id).then(obj => {
          self.$Message.success('兑换成功')
          self.getUserInfo()
        })
      }
    }
  }
</script>