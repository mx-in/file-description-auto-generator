import * as core from '@actions/core'

// openai-api-key:
//   description: 'Your openai api key'
//   required: true
// openai-prompt:
//   description: 'The OpenAI prompt'
//   require: true
// model:
//   description: 'The model to use'
//   required: false
//   default: 'text-davinci-003'
// source-dist-map:
export async function run(): Promise<void> {
  try {
    core.debug('start to run : )')
    const api_key = core.getInput('openai-api-key')
    core.debug(`api_key: ${api_key}`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    const prompt = core.getInput('openai-prompt')
    core.debug(`prompt: ${prompt}`)

    const model = core.getInput('model')
    core.debug(`model: ${model}`)

    const source_dist_map = core.getInput('source-dist-map')
    core.debug(`source_dist_map: ${source_dist_map}`)

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
