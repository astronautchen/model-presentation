export const handleThemeStyle = (color: string) => {
  document.documentElement.style.setProperty('--el-color-primary', color);
  for (let i = 1; i <= 9; i++) {
    document.documentElement.style.setProperty(
      `--el-color-primary-light-${i}`,
      `${getLightColor(color, i / 10)}`
    );
  }
  for (let i = 1; i <= 9; i++) {
    document.documentElement.style.setProperty(
      `--el-color-primary-dark-${i}`,
      `${getDarkColor(color, i / 10)}`
    );
  }
};
// 变浅颜色值
const getLightColor = (color: string, level: number) => {
  const rgb = hexToRgb(color);
  for (let i = 0; i < 3; i++) {
    rgb[i] = Math.floor((255 - rgb[i]) * level + rgb[i]);
  }
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
};

// 变深颜色值
const getDarkColor = (color: string, level: number) => {
  const rgb = hexToRgb(color);
  for (let i = 0; i < 3; i++) {
    rgb[i] = Math.floor(rgb[i] * (1 - level));
  }
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
};
// hex颜色转rgb颜色
const hexToRgb = (str: any) => {
  str = str.replace('#', '');
  const hexs = str.match(/../g);
  for (let i = 0; i < 3; i++) {
    hexs[i] = parseInt(hexs[i], 16);
  }
  return hexs;
};

// rgb颜色转Hex颜色
const rgbToHex = (r: any, g: any, b: any) => {
  const hexs = [r.toString(16), g.toString(16), b.toString(16)];
  for (let i = 0; i < 3; i++) {
    if (hexs[i].length == 1) {
      hexs[i] = `0${hexs[i]}`;
    }
  }
  return `#${hexs.join('')}`;
};
export const randomRgb = () => {
  // Math.random是生成0-1之间的随机数 *256 的范围就变成0.xx-255.7
  // Math.floor 向下取整就变成 0-255
  const r = Math.floor(Math.random() * 256);

  const g = Math.floor(Math.random() * 256);

  const b = Math.floor(Math.random() * 256);

  // 拼接返回
  return rgbToHex(r, g, b);
};
