import '@testing-library/jest-dom/vitest';

/**
 * jsdom ne fournit pas localStorage de façon fiable selon les versions.
 * On mocke une implémentation simple en mémoire, réinitialisée entre les tests
 * via vi.clearAllMocks() ou beforeEach dans les fichiers de test concernés.
 */
class LocalStorageMock {
  private store: Record<string, string> = {};

  getItem(key: string) {
    return this.store[key] ?? null;
  }

  setItem(key: string, value: string) {
    this.store[key] = value;
  }

  removeItem(key: string) {
    delete this.store[key];
  }

  clear() {
    this.store = {};
  }
}

Object.defineProperty(globalThis, 'localStorage', {
  value: new LocalStorageMock(),
  writable: true,
});
