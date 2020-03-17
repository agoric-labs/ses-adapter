/* global globalThis harden Compartment HandledPromise */

// @agoric/harden-0.0.4 can only be imported under SES if noTameRegExp is
// enabled
import maybeHarden from '@agoric/harden';

// ses-0.7.3 doesn't export Compartment, and when I patched it to do so
// (https://github.com/Agoric/SES-shim/pull/225), `new Compartment` throws a
// safety-check error
//import { Compartment as maybeCompartment } from 'ses'; // 'compartment-shim';

// @agoric/eventual-send-0.5.0 imports harden-0.0.4, requires noTameRegExp
import { HandledPromise as maybeHandledPromise } from '@agoric/eventual-send';

// magic to obtain 'globalThis'
const gt = typeof globalThis === 'undefined' ? new Function('return this')() : globalThis;

// remember, under SES we cannot modify globalThis
const installed = globalThis.__SESAdapterInstalled || {};

let newHarden;
if (installed.harden) {
  newHarden = installed.harden;
} else if (typeof harden !== 'undefined') {
  newHarden = harden;
  installed.harden = harden;
} else {
  newHarden = maybeHarden;
  installed.harden = newHarden;
}

let newCompartment;
if (installed.Compartment) {
  newCompartment = installed.Compartment;
} else if (typeof Compartment !== 'undefined') {
  newCompartment = Compartment;
  installed.Compartment = Compartment;
} else {
  const maybeCompartment = () => { throw Error('non-SES Compartment still broken'); }; // TODO
  newCompartment = maybeCompartment;
  installed.Compartment = newCompartment;
}

let newHandledPromise;
if (installed.HandledPromise) {
  newHandledPromise = installed.HandledPromise;
} else if (typeof HandledPromise !== 'undefined') {
  newHandledPromise = HandledPromise;
  installed.HandledPromise = HandledPromise;
} else {
  newHandledPromise = maybeHandledPromise;
  installed.HandledPromise = newHandledPromise;
}

try {
  // outside of SES, notify any separately-bundled copies of SES-adapter of
  // our choices
  globalThis.__SESAdapterInstalled = installed;
} catch (e) {
  // inside SES, we ignore the failed attempt to modify the global
}

export { newHarden as harden,
         newCompartment as Compartment,
         newHandledPromise as HandledPromise,
       };
