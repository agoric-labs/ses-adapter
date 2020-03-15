import { harden, Compartment, HandledPromise } from '../src/index.js';
import tap from 'tap';

tap.equal(typeof harden, 'function');

const o = {};
o.a = 1;
o.b = { c: 2 };
harden(o);
tap.throws(() => {
  o.d = 'forbidden';
}, "fooerror");

