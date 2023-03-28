<script lang="ts" setup>
  import { onBeforeUnmount, onMounted, ref } from 'vue';
  import Experience from '@/components/three/Experience.js';
  let experience: any = null;
  onMounted(() => {
    experience = new Experience(document.querySelector('canvas.webgl'));
    console.log('1,', document.getElementById('father'));
    experience.label.initLabel(document.getElementById('father'), [[1.0, 0.0036051, 0.31656]]);
  });
  onBeforeUnmount(() => {
    experience.destroy();
    experience.label.clearElement(document.getElementById('father'));
    experience = null;
  });
  const rotate = ref(false);
  const changeAutoRotate = (val: boolean) => {
    experience.camera.setAutoRotate(val);
  };
</script>
<template>
  <div id="father" class="relative full">
    <canvas class="webgl full absolute left-0 top-0"></canvas>
    <div class="c-#f00 absolute left-0 top-0 info-card r6">
      <div>撒打发立刻就拉萨的开发add是放到</div>
      <div> 阿斯顿分厘卡士大夫立刻 阿斯蒂芬卢卡斯</div>
      <div
        ><span mr-3>自动旋转</span
        ><el-switch v-model="rotate" @change="changeAutoRotate"></el-switch
      ></div>
      <el-button @click="experience.camera.setCameraOrient('front')">前视图</el-button>
      <el-button @click="experience.camera.setCameraOrient('back')">后视图</el-button>
    </div>
    <!-- <div class="point point-0">
      <div class="label">1</div>
      <div class="text"> Lorem ipsum, dolor sit amet consectetur adipisicing elit </div>
    </div> -->
  </div>
</template>
<style lang="scss">
  .point {
    position: absolute;
    top: 50%;
    left: 50%;
  }
  .point .label {
    position: absolute;
    top: -20px;
    left: -20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #00000077;
    border: 1px solid #ffffff77;
    color: #ffffff;
    font-family: Helvetica, Arial, sans-serif;
    text-align: center;
    line-height: 40px;
    font-weight: 100;
    font-size: 14px;
  }
  .point .text {
    position: absolute;
    top: 30px;
    left: -120px;
    width: 200px;
    padding: 20px;
    border-radius: 4px;
    background: #00000077;
    border: 1px solid #ffffff77;
    color: #ffffff;
    line-height: 1.3em;
    font-family: Helvetica, Arial, sans-serif;
    font-weight: 100;
    font-size: 14px;
  }
  .point .text {
    /* ... */
    opacity: 0;
  }
  .point:hover .text {
    opacity: 1;
  }
  .point .text {
    /* ... */
    transition: opacity 0.3s;
  }
  .point .text {
    /* ... */
    pointer-events: none;
  }
  .point .label {
    /* ... */
    cursor: help;
  }
  .point .label {
    /* ... */
    transform: scale(0, 0);
    transition: transform 0.3s;
  }

  .point.visible .label {
    transform: scale(1, 1);
  }
</style>
<style lang="scss" scoped>
  .info-card {
    width: 250px;
    height: 350px;
    background-color: #2326267e;
    color: white;
    padding: 16px;
  }
</style>
