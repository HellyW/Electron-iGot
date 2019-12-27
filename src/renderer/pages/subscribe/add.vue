<style lang='less'>
  .add-subscribe{
    .subscribe-add{
      padding: 60px 30px 0;
      .tip{
        width: 100%;
        margin: 10px auto;
        font-weight: 600;
        color: #999;
        padding: 0 0 0 80px;
      }
      .btn{
        margin: 30px auto;
      }
    }
  }
</style>
<template>
  <div class="add-subscribe">
    <nav-bar back></nav-bar>
    <div class="subscribe-add">
      <Form ref="subscribeForm" :model="subscribe" :label-width="80" :rules="subscribeValidate">
        <FormItem label="服务名" prop="name">
           <Input v-model="subscribe.name" placeholder="不可超过10个字符"></Input>
        </FormItem>
        <div class="tip">服务名将会展示在推送条幅内，一经创建则不可修改。请勿使用非正式名称作为服务名</div>
        <FormItem label="是否公开">
            <i-switch v-model="subscribe.open" size="large">
                <span slot="open">公开</span>
                <span slot="close">私有</span>
            </i-switch>
            <span style="padding:0 20px;color:#f00">将扣除{{subscribe.open ? '400' : '50'}}奇点</span>
        </FormItem>
        <div class="tip">公开之后，您的订阅号将显示在外部的订阅服务市场，所有订阅您服务的用户都将收到您的消息。请务必遵守推送规则。不得传播违法信息</div>
        <div class="tip">创建私有订阅推送服务，将从账户内扣除50奇点；会员不享折扣</div>
        <div class="tip">创建公开订阅推送服务，将从账户内扣除400奇点；会员不享折扣</div>
        <Button class="btn" type="primary" long size="large" @click="addSubscribe">创建（{{subscribe.open ? '400' : '50'}}奇点）</Button>
      </Form>
    </div>
  </div>
</template>
<script>
  import { api } from '../../api'
  import navBar from '@/components/navBar'
  export default{
    name: 'addSubscribe',
    data () {
      const validateName = (rule, value, callback) => {
          if (value.length > 10) return callback(new Error('服务名不可超过10个字符'))
          callback()
      }
      return {
        subscribe: {},
        subscribeValidate: {
          name: [{ required: true, message: '服务名必填，不可为空', trigger: 'blur' },
          { validator: validateName, trigger: 'blur' }]
        }
      }
    },
    components: {
      navBar
    },
    methods: {
      addSubscribe () {
        let self = this
        this.$refs['subscribeForm'].validate((valid) => {
          if (!valid) return
          api.link.addLink(self.subscribe).then(obj => {
            self.$router.push(`/api?id=${obj.key}`)
            self.$Message.success('创建成功')
          })
        })
      }
    }
  }
</script>