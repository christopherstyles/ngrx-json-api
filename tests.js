require('core-js/es6');
require('core-js/es7/reflect');

// Typescript emit helpers polyfill
require('ts-helpers');

require('zone.js/dist/zone.js');
require('zone.js/dist/long-stack-trace-zone.js');
require('zone.js/dist/async-test.js');
require('zone.js/dist/fake-async-test.js');
require('zone.js/dist/sync-test');
require('zone.js/dist/proxy');
require('zone.js/dist/jasmine-patch.js');

// RxJS
require('rxjs/Rx');
require('@ngrx/core/add/operator/select');

Error.stackTraceLimit = Infinity;

require('reflect-metadata');

const testContext = require.context('./spec', true, /\.spec\.ts/);
testContext.keys().forEach(testContext);

const testing = require('@angular/core/testing');
const testingBrowser = require('@angular/platform-browser-dynamic/testing');

testing.TestBed.initTestEnvironment(testingBrowser.BrowserDynamicTestingModule,
   testingBrowser.platformBrowserDynamicTesting());
