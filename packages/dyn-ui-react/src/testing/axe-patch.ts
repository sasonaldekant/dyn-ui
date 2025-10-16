// Best-effort compatibility shim for DOM environments (happy-dom) where
// `Node.prototype.isConnected` is provided as a getter-only accessor.
// Some libraries (notably axe-core) attempt to set `isConnected` and this
// triggers a TypeError in strict mode. Defining a noop setter avoids the
// error.

if (typeof Node !== 'undefined') {
  try {
    const proto = Node.prototype as any;
    const desc = Object.getOwnPropertyDescriptor(proto, 'isConnected');

    if (!desc || typeof desc.set !== 'function') {
      Object.defineProperty(proto, 'isConnected', {
        get() {
          return true;
        },
        set(_v: unknown) {
          // no-op to avoid assignment errors from libraries that set this
        },
        configurable: true,
        enumerable: false,
      });
    }
  } catch (e) {
    // ignore - best-effort only
  }
}
