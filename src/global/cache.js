export default {
  //浏览器临时缓存
  setSessionObj(key,obj)
  {
    sessionStorage.setItem(key, JSON.stringify(obj));
  },
  getSessionObj(key)
  {
    return JSON.parse(sessionStorage.getItem(key));
  },
  delSession(key)
  {
    sessionStorage.removeItem(key);
  },
  //本地缓存，时间永久
  setLocalObj(key,obj)
  {
    localStorage.setItem(key, JSON.stringify(obj));
  },
  getLocalObj(key)
  {
    return JSON.parse(localStorage.getItem(key));
  },
  delLocal(key)
  {
    localStorage.removeItem(key);
  }
}
