import * as fs from 'fs'
import {FDModel} from './model'

abstract class Processor {
  protected isOutputExist: boolean
  protected isInputExist: boolean

  constructor(private model: FDModel) {
    if (!this.isModelValid()) throw new Error('Invalid input model')
    this.isOutputExist = fs.existsSync(model.output)
    this.isInputExist = fs.existsSync(model.input)
  }
  /*
   * 1. Check if input file exists
   * 2. Check if output file exists
   * 3. Read input file
   * 4. Generate output
   * */
  async start(): Promise<void> {
    if (!this.isInputExist) throw new Error('Input file does not exist')
    const result = await this.readInput()
    await this.generateOutput(result)
  }

  protected async generateOutput(input: string): Promise<String> {
    if (!input) throw new Error('Input is empty')
    return Promise.resolve('')
  }

  protected async readInput(): Promise<string> {
    return ''
  }

  isModelValid(): boolean {
    const model = this.model
    return (
      !!model.apiKey ||
      !!model.githubToken ||
      !!model.prompt ||
      !!model.model ||
      !!model.input ||
      !!model.output ||
      model.rewrite === undefined
    )
  }
}

export class OpenAIProcessor extends Processor {
  readinput(): string {}
}
