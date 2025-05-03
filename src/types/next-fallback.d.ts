declare global {
  interface MapIterator<K = unknown, V = unknown>
    extends IterableIterator<[K, V]> {}
  interface HeadersIterator<T = unknown> extends IterableIterator<T> {}
}

export {};
