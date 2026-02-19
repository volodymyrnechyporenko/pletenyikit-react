import '@testing-library/jest-dom';

import { TextDecoder, TextEncoder } from 'node:util';

if (globalThis.TextEncoder === undefined) {
  (globalThis as Record<string, unknown>).TextEncoder = TextEncoder;
  (globalThis as Record<string, unknown>).TextDecoder = TextDecoder;
}

if (typeof globalThis.structuredClone === 'undefined') {
  (
    globalThis as typeof globalThis & {
      structuredClone: (value: unknown) => unknown;
    }
  ).structuredClone = (value: unknown) => JSON.parse(JSON.stringify(value));
}
