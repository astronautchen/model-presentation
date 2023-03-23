const catcheKey = {
  TokenKey: 'token',
  LangKey: 'lang'
};
class Cache {
  getToken = (): string => {
    return window.localStorage.getItem(catcheKey.TokenKey) || '';
  };
  setToken = (value: string): void => {
    window.localStorage.setItem(catcheKey.TokenKey, value);
  };
  getLanguage = (): string => {
    return window.localStorage.getItem(catcheKey.LangKey) || 'zh-cn';
  };
  setLanguage = (value: string): void => {
    window.localStorage.setItem(catcheKey.LangKey, value);
  };
  clearStorage = (): void => {
    window.localStorage.clear();
  };
}
export default new Cache();
