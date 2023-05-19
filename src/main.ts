import * as core from '@actions/core'

export async function run(): Promise<void> {
  try {
    core.info('Hello world!')
    const api_key = core.getInput('openai-api-key')
    const prompt = core.getInput('openai-prompt')
    const model = core.getInput('model')
    const input = core.getInput('input-files')
    const output = core.getInput('output-dest')
    core.info(`api_key: ${api_key}`)
    core.info(`prompt: ${prompt}`)
    core.info(`model: ${model}`)
    core.info(`input: ${input}`)
    core.info(`output: ${output}`)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
run()
