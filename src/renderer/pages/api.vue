<style lang='less' scoped>
  .api{
    .api-docs{
      padding: 30px;
      .item{
        .label{
          margin: 5px 0;
          font-size: 15px;
          font-weight: 500;
        }
        .tips{
          margin: 5px auto;
          font-size: 12px;
        }
        .value{
          background: #000;
          padding: 5px;
          border-radius: 4px;
          color: #FFF;
          font-weight: 800;
          user-select: text;
          p{
            font-weight: 800;
            user-select: text;
          }
        }
      }
    }
  }
</style>
<template>
  <div class="api">
    <nav-bar back></nav-bar>
    <div class="api-docs">
      <div class="item">
        <div class="label">推送key</div>
        <div class="value">{{id || "您获取的推送key"}}</div>
      </div>
      <div class="item">
        <div class="label">请求方式</div>
        <div class="value">POST / GET</div>
      </div>
      <div class="item">
        <div class="label">请求host</div>
        <div class="value">
          <p>https://push.hellyw.com</p>
        </div>
      </div>
      <div class="item">
        <div class="label">请求地址</div>
        <div class="value">
          <p>/{{id || ':id'}}</p>
        </div>
        <div class="tips">该地址get下不可用，仅用于post</div>
        <div class="value">
          <p>/{{id || ':id'}}/:content</p>
          <p>/{{id || ':id'}}/:title/:content</p>
        </div>
      </div>
      <div class="item">
        <div class="label">POST 专有请求体</div>
        <div class="value"><pre>{{ JSON.stringify(postJson, null, 4)  }}</pre></div>
      </div>
      <div class="item">
        <div class="label">通用请求体</div>
        <div class="value"><pre>{{ JSON.stringify(requestJson, null, 4)  }}</pre></div>
      </div>
    </div>
  </div>
</template>
<script>
  import navBar from '@/components/navBar'
  export default{
    name: 'api',
    data () {
      return {
        id: null,
        postJson: {
          title: '标题',
          content: '正文'
        },
        requestJson: {
          automaticallyCopy: 1,
          copyText: '自定义拷贝文本',
          url: '详情链接'
        }
      }
    },
    components: {
      navBar
    },
    mounted () {
      this.id = this.$route.query.id
    },
    methods: {
    }
  }
</script>