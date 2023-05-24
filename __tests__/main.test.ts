import { wait } from '../src/wait'
// import { FDModel } from '../src/model'
import { expect, test } from '@jest/globals'
// import { OpenAIProcessor } from '../src/openai_processor'
// import * as core from '@actions/core'
import process from 'process'
import * as path from 'path'
import * as cp from 'child_process'

test('throws invalid number', async () => {
  const input = parseInt('foo', 10)
  await expect(wait(input)).rejects.toThrow('milliseconds not a number')
})

const apiKey = process.env.OPENAI_API_KEY || ''
const githubToken = process.env.GITHUB_TOKEN || ''

test('test enviroment', async () => {
  process.env['INPUT_MILLISECONDS'] = '500'
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  console.log(cp.execFileSync(np, [ip], options).toString())

  expect(apiKey).not.toEqual('')
  expect(githubToken).not.toEqual('')
})

// test('openai processor', async () => {
//   const prompt = `Please summarize it in a comment, describing the changes made in the diff in high level.
// Do it in the following way:
// Write \`SUMMARY:\` and then write a summary of the changes made in the diff, as a bullet point list.
// Every bullet point should start with a \`*\`.`
//   const model: FDModel = {
//     apiKey: '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',
//     githubToken: 'test_t',
//     prompt,
//     model: 'text-davinci-003',
//     input: `@@ -1,30 +1,7 @@\n-import {wait} from '../src/wait'\n-import * as process from 'process'\n-import * as cp from 'child_process'\n-import * as path from 'path'\n-import {expect, test} from '@jest/globals'\n-import * as core from '@actions/core'\n+import { wait } from '../src/wait'\n+import { expect, test } from '@jest/globals'\n \n test('throws invalid number', async () => {\n   const input = parseInt('foo', 10)\n   await expect(wait(input)).rejects.toThrow('milliseconds not a number')\n })\n-\n-test('wait 500 ms', async () => {\n-  const start = new Date()\n-  await wait(500)\n-  const end = new Date()\n-  var delta = Math.abs(end.getTime() - start.getTime())\n-  expect(delta).toBeGreaterThan(450)\n-})\n-\n-// shows how the runner will run a javascript action with env / stdout protocol\n-test('test runs', () => {\n-  process.env['INPUT_MILLISECONDS'] = '500'\n-  const np = process.execPath\n-  const ip = path.join(__dirname, '..', 'lib', 'main.js')\n-  const options: cp.ExecFileSyncOptions = {\n-    env: process.env\n-  }\n-  console.log(cp.execFileSync(np, [ip], options).toString())\n-})`,
//     output: 'test out put',
//     rewrite: false
//   }
//
//   const processor = new OpenAIProcessor(model)
//   const result = await processor.start()
//   expect(result).not.toEqual('')
// })
