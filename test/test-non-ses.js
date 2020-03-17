import { test_harden } from './do-harden.js';
import { test_compartment } from './do-compartment.js';
import { test_handled_promise } from './do-handled-promise.js';

test_harden();
// disabled because our non-SES 'Compartment' is still a non-functioning stub
//test_compartment();
test_handled_promise();
