export function saveToStorage(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromStorage(key: string) {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}
