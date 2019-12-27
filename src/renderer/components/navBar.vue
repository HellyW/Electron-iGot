<style lang='less' scoped>
  .nav-bar{
    position: sticky;
    top: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #EFEFE8;
    background: #FFF;
    .nav-bar-title{
      position: relative;
      top: 0;
      left: 0;
      .title{
        font-size: 14px;
        font-weight: 800;
        text-align: center;
        padding: 0 30px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .fns{
        position: absolute;
        top: 0;
        right: 0;
        padding: 0 20px;
        .fn{
          display: inline-block;
          &.floatLeft{
            float: left;
          }
        }
        &.onLeft{
          left: 0;
          right: auto;
        }
        .extras{
          padding: 0 5px;
        }
        .back{
          padding: 0 5px;
          cursor: pointer;
        }
      }
    }
  }
</style>
<template>
  <div class="nav-bar drag">
    <div class="nav-bar-title">
      <div class="title">{{getNavTitle}}</div>
      <div class="fns no-drag" :class="{'onLeft': !$isMac}">
        <div class="extras fn">
          <slot name="extras"></slot>
        </div>
        <div v-if="back" class="back fn" @click="backEvent" :class="{'floatLeft': !$isMac}">
          <Icon custom="iconfont icon-fanhui" size="20"></Icon>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'navBar',
    props: {
      title: String,
      back: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      getNavTitle () {
        return this.title || this.$route.meta.title
      }
    },
    methods: {
      backEvent () {
        this.$router.back()
      }
    }
  }
</script>