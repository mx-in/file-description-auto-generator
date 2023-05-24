import { Processor } from './processor'
import * as consts from './constants'
import { FDModel } from './model'
import { Configuration, OpenAIApi } from 'openai'
import * as fs from 'fs'
import path from 'path'

export class OpenAIProcessor extends Processor {
  private openai: OpenAIApi

  constructor(model: FDModel) {
    super(model)
    console.log(model.apiKey)
    const configuration = new Configuration({
      apiKey: model.apiKey
    })
    this.openai = new OpenAIApi(configuration)
  }

  async readFile(fPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(fPath, 'utf8', (err, data) => {
        if (err !== null) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  async generateOutput(): Promise<string> {
    console.log('generateOutput:::::', this.model)
    try {
      const filename = path.basename(this.model.input)
      const fileContent = await this.readFile(this.model.input)
      const { prompt, model } = this.model
      const openAIPrompt = `${consts.SHARED_PROMPT}\n\nTHE GIT DIFF OF ${filename} TO BE SUMMARIZED:\n\`\`\`\n${fileContent}\n\`\`\`\n\nSUMMARY:\n`
      console.log(
        `OpenAI file summary prompt for ${filename}:\n${openAIPrompt}`
      )

      if (openAIPrompt.length > consts.MAX_OPEN_AI_QUERY_LENGTH) {
        throw new Error('OpenAI query too big')
      }

      const response = await this.openai.createCompletion({
        model,
        prompt,
        max_tokens: consts.MAX_TOKENS,
        temperature: consts.TEMPERATURE
      })
      if (
        response.data.choices !== undefined &&
        response.data.choices.length > 0
      ) {
        console.log('OpenAI response', response.data.choices[0].text)
        return (
          response.data.choices[0].text ?? `Error: couldn't generate summary`
        )
      }
    } catch (error) {
      console.error('Error generating summary', error)
    }
    return "Error: couldn't generate summary"
  }
}
