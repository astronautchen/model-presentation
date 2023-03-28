<script lang="ts" setup>
  // import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const handelMenu = () => {
    document.getElementById('menuWrap')?.classList.toggle('visible');
  };
</script>
<template>
  <div id="menuWrap" class="w-[280px] box-border">
    <div class="icon text-white" cp><i inline-flex i="mdi-chevron-left" @click="handelMenu" /></div>
    <div class="menu">
      <div class="logo mb-[26px]">
        <el-image src="/src/assets/images/Logo.png" style="width: 173px; height: 41px"></el-image>
      </div>
      <el-menu
        :default-active="route.path"
        class="el-menu-vertical-demo"
        text-color="#697A8D"
        active-text-color="#696CFF"
        router
      >
        <el-menu-item index="/model">
          <i inline-flex i="mdi-emoticon-devil-outline" class="mr-[14px]" />
          <span>MO展示</span>
        </el-menu-item>
        <el-menu-item index="/">
          <i inline-flex i="mdi-square-rounded-badge-outline" class="mr-[14px]" />
          <span>MO广场</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  // #menuWrap.visible {
  //   width: 0px;
  //   .menu{

  //     transform: translateX(-100%);
  //   }
  // }
  #menuWrap {
    position: relative;
    transition: all 0.4s ease;
    flex-shrink: 0;
    .icon {
      @include round(40px);
      @include flex(center, center);
      border: 7px solid var(--menu-icon);
      position: absolute;
      right: 0px;
      top: 24px;
      background-color: $primary;
      box-sizing: border-box;
    }
  }
  .menu {
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.12);
    padding: 14px 0px;
    padding-left: 17px;
    padding-right: 14px;
    box-sizing: border-box;
    width: 260px;
    height: 100%;
    background-color: var(--menu-color);
  }
  :deep(.el-menu) {
    border-right: none;
  }
  :deep(.el-menu-item) {
    border-radius: 6px;
  }
</style>
