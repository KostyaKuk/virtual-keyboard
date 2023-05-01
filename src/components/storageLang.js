export function set(name, value) {
  window.localStorage.setItem(name, value);
}

export function get(name, value = 'eng') {
  return window.localStorage.getItem(name) || value;
}
