/* global globalThis harden Compartment HandledPromise */
import maybeHarden from '@agoric/harden';
//import { Compartment as maybeCompartment } from 'ses'; // 'compartment-shim';
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

/*
let newCompartment;
if (installed.Compartment) {
   newCompartment = installed.Compartment;
} else if (typeof Compartment !== 'undefined') {
   newCompartment = Compartment;
   installed.Compartment = Compartment;
} else {
   newCompartment = maybeCompartment;
   installed.Compartment = newCompartment;
}
*/

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
         //newCompartment as Compartment,
         newHandledPromise as HandledPromise,
       };
