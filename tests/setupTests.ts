import '@testing-library/jest-dom';

import { TextDecoder, TextEncoder } from 'util';

if (global.TextEncoder === undefined) {
  global.TextEncoder = TextEncoder;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  global.TextDecoder = TextDecoder;
}
