export default {
  setObj(key,obj)
  {
    localStorage.setItem(key, JSON.stringify(obj));
  },
  getObj(key)
  {
    return JSON.parse(localStorage.getItem(key));
  },
  del(key)
  {
    localStorage.removeItem(key);
  }
}
