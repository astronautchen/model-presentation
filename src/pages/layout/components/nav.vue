<script lang="ts" setup>
  import { useDark, useToggle } from '@vueuse/core';
  const isDark = useDark();
  const toggleDark = useToggle(isDark);
</script>
<template>
  <div w-full class="h-[62px] mb-[20px] r6 frc px-6 box-border bg">
    <div flex-1>
      <el-button type="primary">123</el-button>
    </div>
    <div frc>
      <div
        class="drag"
        draggable="true"
        @dragstart="handleDragStart"
        @drag="handleDrag"
        @dragend="handleDragEnd"
        >拖一下试试</div
      >
      <i
        inline-flex
        class="i-mdi-white-balance-sunny dark:i-mdi-moon-waning-crescent cp"
        mr-5
        color="#697a8d"
        @click="() => toggleDark()"
      />
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
