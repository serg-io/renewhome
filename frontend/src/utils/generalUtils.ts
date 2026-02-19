export function keyMirror<K extends string>(keys: K[] | Record<K, unknown>): Record<K, K> {
  const keysArray: K[] = Array.isArray(keys) ? keys : ((Object.keys(keys) as unknown) as K[]);
  const mirror = new Map<K, K>();
  keysArray.forEach(k => mirror.set(k, k));
  return Object.fromEntries(mirror) as Record<K, K>;
}
