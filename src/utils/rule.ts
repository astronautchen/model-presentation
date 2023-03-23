export const reg = {
  mac: new RegExp('(.+?)-(.+?)-(.+?)-(.+?)-(.+?)-(.+?)', 'g')
};

export const macValidate = (rule: any, value: any, callback: any) => {
  if (!/(.+?)\-(.+?)\-(.+?)\-(.+?)\-(.+?)\-(.+?)/g.test(value)) {
    callback(new Error('请输入正确格式的mac地址'));
  } else {
    callback();
  }
};
