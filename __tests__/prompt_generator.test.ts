import { FDModel } from '../src/model'
import { beforeAll, describe, expect, test } from '@jest/globals'
import { OpenAIProcessor } from '../src/openai_processor'
import { apiKey, githubToken, prompt } from './constants'
import { testFilePath } from './utils'
import { MODEL_NAME } from '../src/openai_constants'

const nvim_package_lua = testFilePath('nvim-package.lua')
const nvim_package_output_path = testFilePath('nvim-package.md')

const model: FDModel = {
  apiKey,
  githubToken,
  prompt,
  model: MODEL_NAME,
  input: nvim_package_lua,
  output: nvim_package_output_path,
  rewrite: true
}

let processor: OpenAIProcessor

beforeAll(() => {
  processor = new OpenAIProcessor(model)
})

describe('Processor Nvim Packages Input', () => {
  test('empty prompt', async () => {
    expect(async () => {
      await processor.processingWithGPT('')
    }).rejects.toThrow()
  })

  // test('openai processor', async () => {
  //   try {
  //     const result = await processor.start()
  //     console.log('the result from test case:::::', result)
  //     expect(result).not.toEqual('')
  //   } catch (error) {
  //     console.log('the error form the test case::::', error)
  //   }
  // })
})
