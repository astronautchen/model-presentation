<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const value = ref('');
  const options = [
    {
      value: 'Option1',
      label: 'Option1'
    },
    {
      value: 'Option2',
      label: 'Option2'
    },
    {
      value: 'Option3',
      label: 'Option3'
    },
    {
      value: 'Option4',
      label: 'Option4'
    },
    {
      value: 'Option5',
      label: 'Option5'
    }
  ];
</script>
<template>
  <div w-full class="r6 p-6 box-border bg fcr">
    <el-select v-model="value" class="mb-6" placeholder="Select">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <div flex flex-wrap>
      <div v-for="i in 15" :key="i" class="card cp" @click="router.push('/model-detail')">
        <el-image src="/src/assets/models/bwt300c.png" style="width: 60px" r6></el-image>
        <div class="c-#697A8D mt-3">调制解调器</div>
        <div class="c-#566A7F text-[22px] mt-1">BWT300C</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .card {
    width: 166px;
    height: 166px;
    border-radius: 6px;
    background-color: rgba(245, 245, 249, 1);
    margin-right: 1.2rem;
    margin-bottom: 1.2rem;
    box-sizing: border-box;
    padding: 1.25rem;
    transition: all 0.3s ease-in-out;
    user-select: none;
  }
  .card:hover {
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.12);
    // transform: scale(1.1);
  }
</style>
