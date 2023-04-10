<script lang="ts" setup>
  import menuVue from './components/menu.vue';
  import navVue from './components/nav.vue';
</script>

<template>
  <div flex full class="border-radius">
    <menu-vue />

    <div flex-1 pt-3 class="pr-5 pb-5" flex flex-col>
      <nav-vue />
      <div relative full of-y-auto flex-1>
        <router-view absolute />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .header {
    background-image: var(--theme-main-bg-header);
  }
  .border-radius {
    border-radius: 40px 0 0;
    overflow: hidden;
  }
</style>
