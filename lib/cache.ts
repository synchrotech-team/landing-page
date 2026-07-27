// High-performance in-memory cache with TTL & instant invalidation
interface CacheItem<T> {
  data: T;
  expiry: number;
}

const store = new Map<string, CacheItem<any>>();

export const Cache = {
  get<T>(key: string): T | null {
    const item = store.get(key);
    if (!item) return null;
    if (Date.now() > item.expiry) {
      store.delete(key);
      return null;
    }
    return item.data as T;
  },

  set<T>(key: string, data: T, ttlSeconds: number = 60): void {
    store.set(key, {
      data,
      expiry: Date.now() + ttlSeconds * 1000,
    });
  },

  invalidate(keyPattern?: string): void {
    if (!keyPattern) {
      store.clear();
      return;
    }
    for (const key of store.keys()) {
      if (key.includes(keyPattern)) {
        store.delete(key);
      }
    }
  },
};
