export function lsSetObject(key, obj) {
  return localStorage.setItem(key, JSON.stringify(obj));
}

export function lsGetObject(key) {
  return JSON.parse(localStorage.getItem(key));
}
