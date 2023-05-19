"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import {wait} from '../src/wait'
// import * as process from 'process'
const globals_1 = require("@jest/globals");
const main_1 = require("../src/main");
/* test('throws invalid number', async () => {
  const input = parseInt('foo', 10)
  await expect(wait(input)).rejects.toThrow('milliseconds not a number')
})

test('wait 500 ms', async () => {
  const start = new Date()
  await wait(500)
  const end = new Date()
  const delta = Math.abs(end.getTime() - start.getTime())
  expect(delta).toBeGreaterThan(450)
}) */
// shows how the runner will run a javascript action with env / stdout protocol
(0, globals_1.test)('test runs', () => {
    (0, main_1.run)();
});
