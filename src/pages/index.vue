<script lang="ts" setup>
  import { ref } from 'vue';

  const a = ref<number>();
  const list = [
    [1, 2],
    [1, 2]
  ];
</script>

<template>
  <div flex full class="border-radius">
    <div class="w-[280px] box-border">
      <div class="menu">
        <div class="icon text-white"><i inline-flex i="mdi-chevron-left" /></div>
        123
      </div>
    </div>
    <div flex-1>
      <div v-for="i in list[a!]" :key="i">{{ i }}</div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .header {
    background-image: var(--theme-main-bg-header);
  }
  .menu {
    border: 0px solid #000000;
    // box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
    padding: 14px 0px;
    padding-left: 17px;
    padding-right: 14px;
    box-sizing: border-box;
    width: 260px;
    height: 100%;
    background-color: #fff;
    position: relative;
    .icon {
      @include round(40px);
      @include flex(center, center);
      border: 7px solid #f5f5f9;
      position: absolute;
      right: -20px;
      top: 24px;
      background-color: $primary;
      box-sizing: border-box;
    }
  }
  .border-radius {
    border-radius: 40px;
    overflow: hidden;
  }
</style>
