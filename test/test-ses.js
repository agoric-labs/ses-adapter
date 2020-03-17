import './install-ses.js';
import { test_harden } from './do-harden.js';
import { test_compartment } from './do-compartment.js';
import { test_handled_promise } from './do-handled-promise.js';

test_harden();
test_compartment();
test_handled_promise();
