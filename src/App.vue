<script lang="ts" setup></script>
<template>
  <el-config-provider>
    <RouterView />
  </el-config-provider>
</template>

<style>
  html,
  body {
    height: 100%;
    width: 100%;
    font-size: 16px;
    background-color: var(--bg-color);
    overflow: hidden;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    height: 100%;
    width: 100%;
  }
</style>
