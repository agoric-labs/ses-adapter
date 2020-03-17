import { harden } from '../src/index.js';
import tap from 'tap';

export function test_harden() {
  tap.equal(typeof harden, 'function',
           'harden is a function');

  const o = {};
  o.a = 1;
  o.b = { c: 2 };
  const o2 = harden(o);
  tap.ok(o === o2, 'harden returns argument');
  tap.throws(() => {
    o.d = 'forbidden';
  }, 'object is hardened');
}
