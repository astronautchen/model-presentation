# vue3 + TS + ElementPlus 示例项目框架

[![coverage report](https://gitlab.cowave.com/fed/formwork/vue3-ts-element/badges/master/coverage.svg)](https://gitlab.cowave.com/fed/formwork/vue3-ts-element/-/commits/master)

## 1 项目结构

本项目目录结构如下，其中\*标为目录，以下出现的目录为项目必须文件，不允许添加 git 忽略,其中$标可依据项目实际情况进行删除：

```
├── husky *
├── node_modules *
├── public *
├── src *
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── auto-imports.d.ts
├── CHANGELOG.md
├── commitlint.config.js
├── index.html
├── package.json
├── package-lock.json
├── prettier.config.js
├── README.md
├── tsconfig.node.json
├── tsconfig.config.json
└── vite.config.ts

```

## 1.1 脚本命令

```
npm install           # 安装依赖
npm run prepare       # husky 初始化
npm run dev           # 启动项目
npm run build         # 构建
npm run eslint        # 使用 ESLint 检查并自动修复 src 目录下所有扩展名为 .js 和 .vue 的文件
npm run prettier      # 自动格式化当前目录下的所有文件
npm run p:${version}  # 自动更新版本号 version: patch minor major(小版本 中版本 大版本)
```

### 1.1.1 代码提交流程

```
# 无需生成版本号
git add .
npm run commit
git push

# 生成版本号
git add .
npm run commit
git push
npm run p:patch
git push --follow-tags origin ${branch}    # branch:远程分支名称
```

## 1.2 项目代码

```
└── src
    ├── api *
    ├── assets *
    ├── components *
    ├── composables *
    ├── i18n * $
    ├── types *
    ├── plugins *
    ├── router *
    ├── stores *
    ├── styles *
    ├── utils *
    ├── pages *
    ├── App.vue
    └── main.ts
```

- api 后台接口存放
  - ${模块名称}.ts 各模块 api
- i18n 国际化
  - languages 语言包文件夹
  - index.ts 自动导入 languages 文件,并集成到国际化中
- types 类型定义文件夹
  - enum.ts 枚举值定义位置
  - ${模块名称}.ts 各模块类型定义位置
- plugins 插件定义
  - echartsUI.ts
- pages 页面文件

## 2 集成库

### ElementPlus(https://element-plus.gitee.io/zh-CN/)

#### 修改主题

```scss
# src/styles/element/index.scss

$--colors: (
  "primary": ("base": #3AC096,
  ),
  "success": ("base": #009487,
  ),
  "warning": ("base": #E39E00,
  ),
  "danger": ("base": #E6204F,
  ),
  "error": ("base": #E6204F,
  ),
  "info": ("base": #286CEF,
  ),
);
@forward "element-plus/theme-chalk/src/common/var.scss" with ( // do not use same name, it will override.
+  $colors: $--colors,
```

#### 修改默认样式

```scss
# src/styles/element/index.scss
# 修改表格头颜色和字体样式

$--table: (
  "header-text-color":#878C91,
  "text-color":#232425
);

@forward "element-plus/theme-chalk/src/common/var.scss" with ( // do not use same name, it will override.
  $colors: $--colors,
+ $table: $--table,
```

### UnoCss 原子 CSS

简化 css 写法,并支持自定义设置，打包体积减小

- UnoCss Introduce(https://antfu.me/posts/reimagine-atomic-css)
- UnoCss Search(https://uno.antfu.me/)
- UnoCss Playground(https://uno.antfu.me/play/)

```html
<!-- 设置margin padding-->
<div class="m-100">
  <button class="m-3">
    <icon class="p-5" />
    My Button
  </button>
</div>

<!-- 设置动画-->
<i
  inline-flex
  i="ic-sharp-arrow-drop-up"
  text-2xl
  transform
  delay-250
  transition-800
  hover:rotate-180
/>
```

### @iconify-json (https://icones.js.org/)

所有图标掌握手中

#### 使用方法

1. 打开网址,选取想要使用的图标库,例如 google matreial icons
2. 查看网址,org/${包名}
3. `npm install @iconify-json/ic`
4. 配合 unocss 使用

```html
<i inline-flex i="ic-sharp-arrow-drop-up" />
```

### @vueuse (https://vueuse.org/)

VueUse 是一组基于 Composition API 的实用函数

#### 示例

```html
<script setup lang="ts">
  const { x, y } = useMouse();
</script>

<template>
  <div>pos: {{x}}, {{y}}</div>
</template>
```

### validate 表单校验指令

简化 element-plus 的 rule 写法和麻烦的国际化。

#### 使用方法

`示例：import formVue from '@/components/form-test.vue';` 均直接在 el-form-item 上绑定；

```html
<el-form-item label="姓名" prop="name" v-required>
  <el-input v-model="name" />
</el-form-item>
```

1. 自定义指令形式使用：均可自动获取 label 的内容，拼接错误提示

```html
(1). 必填绑定：`v-required` (2). 自定义规则指令: `v-validate="rule().required('你填错了！')"`
`v-validate="rule().validator(validateFn)"`
```

2. rule 属性绑定：自定义 label 值

```html
:rules="rule().required().label('名称').getValue()" 注意：getValue()必须放在最后使用 用于生成rule
```

|    方法    |    参数     |                     默认值                      |    说明    |
| :--------: | :---------: | :---------------------------------------------: | :--------: |
|  required  |     msg     |              请输入${this.labelV}               |    必填    |
|    type    | typeVal,msg | -, ${this.labelV}必须为${TYPELIST[typeVal]}格式 |    类型    |
|   regexp   | pattern,msg |                      -, -                       |    正则    |
|    min     |   min,msg   |     -, ${this.labelV}长度最小为${min}个字符     |  最小长度  |
|    max     |   max,msg   |     -, ${this.labelV}长度最大为${max}个字符     |  最大长度  |
|   minmax   | min,max,msg |  -, -, ${this.labelV}长度在${min}-${max}个字符  |  区间长度  |
|   range    | min,max,msg |         -, -, 值必须在${min}-${max}之间         |   区间值   |
|    maxv    |   max,msg   |              -, -, 最大值为${max}               |   最大值   |
|    minv    |   min,msg   |              -, -, 最小值为${min}               |   最小值   |
|    len     |   len,msg   |       -, ${this.labelV}长度在${len}个字符       |    长度    |
|    enum    | enumVal,msg |         -, ${this.labelV}必须在枚举值中         |    枚举    |
| whitespace |     msg     |                 不能只存在空格                  |    空格    |
| validator  | validatorFn |                        -                        | 自定义函数 |
|  trigger   |   trigger   |               ['blur', 'change']                |  触发事件  |
|   label    |    label    |                        -                        |  字段标签  |
|  getValue  |      -      |                        -                        | 获取 rule  |

参考：https://github.com/yiminghe/async-validator https://github.com/jquense/yup

### elMessage 国际化简写

简化 ElMessage 的国际化。

#### 使用方法

```js
import { elMessage } from '@/utils/message';

elMessage.sucAdd(); // 新增成功
elMessage.errAdd(); // 新增失败
elMessage.sucEdit(); // 编辑成功
elMessage.errEdit(); // 编辑失败
elMessage.sucDel(); // 删除成功
elMessage.errDel(); // 删除失败
elMessage.sucOper(); // 操作成功
elMessage.errOper(); // 操作失败
elMessage.sucSave(); // 保存成功
elMessage.errSave(); // 保存失败
elMessage.confirmDel(callback); // 确定要删除吗？
```
