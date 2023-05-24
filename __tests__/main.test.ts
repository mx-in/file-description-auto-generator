import { wait } from '../src/wait'
import { FDModel } from '../src/model'
import { expect, test } from '@jest/globals'
import { OpenAIProcessor } from '../src/openai_processor'
import * as core from '@actions/core'
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
  expect(apiKey).not.toEqual('')
  expect(githubToken).not.toEqual('')
})

const testFilePath = (fileName: string) => {
  return path.join(__dirname, 'test_files', fileName)
}

test('openai processor', async () => {
  console.log(testFilePath('test.md'))
  const prompt = `Please summarize it in a comment, describing the changes made in the diff in high level.
                  Do it in the following way:
                  Write \`SUMMARY:\` and then write a summary of the changes made in the diff, as a bullet point list.
                  Every bullet point should start with a \`*\`.`

  const model: FDModel = {
    apiKey: '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',
    githubToken: 'test_t',
    prompt,
    model: 'text-davinci-003',
    input: testFilePath('nvim-package.lua'),
    output: 'test out put',
    rewrite: false
  }

  const processor = new OpenAIProcessor(model)
  const result = await processor.start()
  expect(result).not.toEqual('')
})
