import { Processor } from './processor'
import * as consts from './constants'
import { FDModel } from './model'
import { Configuration, OpenAIApi } from 'openai'

const FinReason = {
  stop: 'stop',
  length: 'length'
}

export class OpenAIProcessor extends Processor {
  private openai: OpenAIApi

  constructor(model: FDModel) {
    super(model)
    const configuration = new Configuration({
      apiKey: model.apiKey
    })
    this.openai = new OpenAIApi(configuration)
  }

  private generateError(msg: string): Error {
    return new Error(`OpenAIProcessor: ${msg}`)
  }

  async processingWithGPT(prompt: string): Promise<string | undefined> {
    try {
      if (prompt.length > consts.MAX_OPEN_AI_QUERY_LENGTH) {
        this.generateError('OpenAI query too big')
      }
      const { model } = this.model
      const response = await this.openai.createCompletion({
        model,
        prompt,
        max_tokens: consts.MAX_TOKENS,
        temperature: consts.TEMPERATURE
      })

      const isResponseValid =
        response.data.choices !== undefined && response.data.choices.length > 0

      if (isResponseValid) {
        const isExceedLength =
          (response.data.choices[0].finish_reason ?? '') === FinReason.length
        if (isExceedLength)
          throw this.generateError('the tokens exceed the max length')
        const result = response.data.choices[0].text ?? ''
        if (result.length === 0) this.generateError('empty response')
        return result
      } else {
        this.generateError('invalid response')
      }
    } catch (error) {
      throw error
    }
  }
}
