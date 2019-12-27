<style lang='less' scoped>
  .notification{
    width: 100%;
    height: 100%;
    .messages{
      padding: 20px;
      .message{
        padding: 10px;
        border-bottom: 1px solid #F7F7F7;
        .title{
          font-weight: 800;
          font-size: 15px;
          color: #000;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          &.no-read{
            &:before{
              display: inline-block;
              content: '';
              width: 10px;
              height: 10px;
              background: #f00;
              border-radius: 5px;
              margin: 0 5px;
            }
          }
        }
        .describe{
          font-size: 12px;
          color: #BDBDBD;
          margin: 5px 0;
          font-weight: 500;
        }
        .content{
          padding: 5px;
          font-size: 14px;
          color: #7A7A7A;
          text-align: justify;
          user-select: text;
        }
      }
    }
  }
</style>
<template>
  <div class="notification">
    <nav-bar>
      <div slot="extras">
        
      </div>
    </nav-bar>
    <Scroll :on-reach-bottom="getMessages" height="720">
      <div class="messages">
        <div class="message" v-for="message,index in messages" :key="index" @click="getMessage(message.id)">
          <div class="title" :class="{'no-read': !message.read}">{{message.body.title || message.app}}</div>
          <div class="describe"><Time :time="message.createTime"></Time>{{message.body.title ? ` · ${message.app}` : ''}}</div>
          <div class="content">{{message.body.content}}</div>
        </div>
      </div>
    </Scroll>
  </div>
</template>
<script>
  import { api } from '../../api'
  import { ipcRenderer } from 'electron'
  import navBar from '@/components/navBar'
  export default{
    name: 'notification',
    data () {
      return {
        params: {
          index: 1,
          size: 20
        },
        messages: [],
        subscribe: true
      }
    },
    computed: {
      subscribeStatus () {
        return `iconfont ${this.subscribe ? 'icon-wurao1' : 'icon-wurao'}`
      }
    },
    components: {
      navBar
    },
    mounted () {
      let self = this
      this.params.index = 1
      this.getMessages()
      ipcRenderer.on('message', event => {
        self.params.index = 1
        self.getMessages()
      })
    },
    methods: {
      getMessages () {
        let self = this
        return new Promise(resolve => {
          api.notification.messages(this.params).then(obj => {
            self.messages = self.params.index === 1 ? obj.messages || [] : self.messages.concat(obj.messages || [])
            self.params.index++
            resolve()
          })
        })
      },
      getMessage (id) {
        this.$router.push(`/message/${id}`)
      }
    }
  }
</script>