import * as core from '@actions/core'
import { Octokit } from '@octokit/rest'
import { FDModel } from './model'
import { context } from '@actions/github'
import { OpenAIProcessor } from './openai_processor'

export async function run(): Promise<void> {
  try {
    core.info('Hello world!')
    const apiKey = core.getInput('openai-api-key')
    const prompt = core.getInput('openai-prompt')
    const model = core.getInput('model')
    const input = core.getInput('input-files')
    const output = core.getInput('output-dest')
    const rewrite = core.getInput('rewrite')
    const githubToken = core.getInput('github-token')

    const inputModel: FDModel = {
      apiKey,
      githubToken,
      prompt,
      model,
      input,
      output,
      rewrite: Boolean(rewrite)
    }

    const ocktokit = new Octokit({
      auth: githubToken
    })

    const filesChanges = await ocktokit.repos.getCommit({
      owner: context.repo.owner,
      repo: context.repo.repo,
      ref: context.sha
    })

    core.info(`filesChanges ${JSON.stringify(filesChanges)}`)

    const processor = new OpenAIProcessor(inputModel)
    //console all the key in inputModel
    core.info(`inputModel if valid ${processor.isModelValid()}`)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
run()
