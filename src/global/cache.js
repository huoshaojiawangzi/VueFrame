function setSessionObj(key, obj) {
  sessionStorage.setItem(key, JSON.stringify(obj));
}

function getSessionObj(key) {
  return JSON.parse(sessionStorage.getItem(key));
}

function delSession(key) {
  sessionStorage.removeItem(key);
}

function clearAllSession() {
  sessionStorage.clear();
}

//本地缓存，时间永久
function setLocalObj(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

function getLocalObj(key) {
  return JSON.parse(localStorage.getItem(key));
}

function delLocal(key) {
  localStorage.removeItem(key);
}
function clearAllLocal() {
  localStorage.clear();
}

export default {setSessionObj, getSessionObj, delSession, clearAllSession, setLocalObj, getLocalObj, delLocal, clearAllLocal}
