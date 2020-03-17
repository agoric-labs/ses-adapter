import { harden } from '../src/index.js';
import tap from 'tap';

export function test_harden() {
  tap.equal(typeof harden, 'function');

  const o = {};
  o.a = 1;
  o.b = { c: 2 };
  const o2 = harden(o);
  tap.ok(o === o2);
  tap.throws(() => {
    o.d = 'forbidden';
  }, 'not hardened');
}
