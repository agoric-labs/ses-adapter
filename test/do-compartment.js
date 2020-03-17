import { Compartment } from '../src/index.js';
import tap from 'tap';

export function test_compartment() {
  tap.equal(typeof Compartment, 'function',
           'Compartment is a function');

  const c = new Compartment();
  tap.equal(c.evaluate('1+2'), 3,
           'basic c.evaluate works');
  const endowments = { a: 1 };
  tap.equal(c.evaluate('a+2', { endowments }),
            3,
            'c.evaluate takes endowments');
}
