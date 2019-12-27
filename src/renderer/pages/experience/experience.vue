<style lang='less' scoped>
  .experience{
    .add-experience-icon{
      font-weight: 800;
      cursor: pointer;
    }
  }
</style>
<template>
  <div class="experience">
    <nav-bar>
      <div slot="extras">
        <div class="add-experience-icon" @click="addExperience">
          <Icon custom="iconfont icon-tianjia" size="20"></Icon>
        </div>
      </div>
    </nav-bar>
  </div>
</template>
<script>
  import navBar from '@/components/navBar'
  import { ipcRenderer } from 'electron'
  export default{
    name: 'experience',
    components: {
      navBar
    },
    methods: {
      addExperience () {
        ipcRenderer.send('addExperience')
      }
    }
  }
</script>