import * as core from '@actions/core'
import { FDModel } from '../src/model'
import { beforeAll, expect, test } from '@jest/globals'
import { OpenAIProcessor } from '../src/openai_processor'
import { apiKey, githubToken, prompt } from './constants'
import { testFilePath } from './utils'
import { describe } from 'node:test'

const model: FDModel = {
  apiKey,
  githubToken,
  prompt,
  model: 'text-davinci-003',
  input: testFilePath('nvim-package.lua'),
  output: testFilePath('nvim-package.lua'),
  rewrite: true
}

beforeAll(() => {
  core.info('Hello world! from tests cases')
  const apiKey = core.getInput('openai-api-key')
  core.info(`apiKey ${apiKey}`)
  process.env.OPENAI_API_KEY?.length && core.info('env OPENAI_API_KEY  exist')
  process.env.GITHUB_TOKEN?.length && core.info('env GITHUB_TOKEN  exist')
})

describe('Processor', () => {
  test('test enviroment', async () => {
    expect(apiKey).not.toEqual('')
    expect(githubToken).not.toEqual('')
  })

  Object.getOwnPropertyNames(model).forEach(key => {
    const testModel: any = { ...model }
    test(`test ${key} property omit`, () => {
      if (key === 'rewrite') {
        testModel[key] = undefined
      } else {
        testModel[key] = ''
      }
      expect(() => new OpenAIProcessor(testModel)).toThrow()
    })
  })
})
