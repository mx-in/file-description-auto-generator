import { FDModel } from '../src/model'
import { expect, test } from '@jest/globals'
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

describe('Processor', () => {
  test('test enviroment', async () => {
    expect(process.env.OPENAI_API_KEY).not.toEqual('')
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
