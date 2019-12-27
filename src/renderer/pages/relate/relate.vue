<style lang='less' scoped>
  .relate-container{
    width: 100%;
    height: 100%;
    background: #FBFBFB;
    .relates{
      padding: 20px;
      .guide{
        padding: 20px 0;
      }
      .relate{
        display: flex;
        display: -webkit-flex;
        margin: 5px auto;
        background: #FFF;
        box-shadow: 0 0 5px #EBEEF4;
        padding: 15px 10px;
        align-items: center;
        .app{
          flex: 1;
          font-weight: 800;
        }
        .del-icon{
          margin: 0 5px 0 10px;
        }
      }
    }
  }
</style>
<template>
  <div class="relate-container">
    <nav-bar></nav-bar>
    <Scroll :on-reach-bottom="getRelates" height="720">
      <div class="relates">
        <div class="guide">
          <div class="guide-text">关闭提醒后，应用将不会通过您绑定的任何方式推送消息。消息只会被显示在推送中心，您可以在选择任意时刻进行查看。</div>
          <div class="guide-text">删除授权应用后，该应用将无法通过任何方式向您推送消息。除非获得您的再次授权</div>
          </div>
        <div class="relate" v-for="relate,index in relates">
          <div class="app">{{relate.app}}</div>
          <i-switch :value="relate.allow" @on-change="changeRelate(relate.id)"></i-switch>
          <Icon class="del-icon" custom="iconfont icon-xuanxiangshanchu" size="20" color="#EB3223" @click="unbindRelate(relate.id)"></Icon>
        </div>
     </div>
    </Scroll>
  </div>
</template>
<script>
  import { api } from '../../api'
  import navBar from '@/components/navBar'
  export default{
    name: 'relate',
    data () {
      return {
        params: {
          index: 1,
          size: 20
        },
        relates: []
      }
    },
    mounted () {
      this.params.index = 1
      this.getRelates()
    },
    components: {
      navBar
    },
    methods: {
      getRelates () {
        let self = this
        return new Promise(resolve => {
          api.relate.relates(this.params).then(obj => {
            self.relates = self.params.index === 1 ? obj.relates || [] : self.relates.concat(obj.relates || [])
            self.params.index++
            resolve()
          })
        })
      },
      changeRelate (id) {
        let self = this
        api.relate.change(id).then(() => {
          self.params.index = 1
          self.getRelates()
          self.$Message.success('状态修改成功')
        })
      },
      unbindRelate (id) {
        let self = this
        api.relate.unbind(id).then(() => {
          self.params.index = 1
          self.getRelates()
          self.$Message.success('解绑成功')
        })
      }
    }
  }
</script>