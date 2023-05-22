import * as core from '@actions/core'
import {FDModel} from './model'

export async function run(): Promise<void> {
  try {
    core.info('Hello world!')
    const apiKey = core.getInput('openai-api-key')
    const prompt = core.getInput('openai-prompt')
    const model = core.getInput('model')
    const input = core.getInput('input-files')
    const output = core.getInput('output-dest')
    const rewrite = core.getInput('rewrite')

    const inputModel: FDModel = {
      apiKey,
      prompt,
      model,
      input,
      output,
      rewrite: Boolean(rewrite)
    }

    //console all the key in inputModel
    core.info(JSON.stringify(inputModel))
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
run()
