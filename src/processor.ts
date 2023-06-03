import { wordCnt as getWordsCount } from './utils'
import { FDModel } from './model'
import { PromptGenerator } from './prompt_generator'

export abstract class Processor {
  constructor(protected model: FDModel) {
    if (!this.isModelValid()) throw new Error('Invalid input model')
  }

  get promptMaxLen(): number {
    return 0
  }

  protected generateError(msg: string): Error {
    return new Error(`${this.constructor.name}: ${msg}`)
  }

  async processingWithGPT(prompt: string): Promise<string | undefined> {
    if (getWordsCount(prompt) > this.promptMaxLen) {
      throw this.generateError('OpenAI query too big')
    }
    if (prompt.length === 0) {
      throw this.generateError('empty prompt')
    }
    return Promise.resolve(undefined)
  }
  /*
   * 1. Check if input file exists
   * 2. Check if output file exists
   * 3. Read input file
   * 4. Generate output
   * */
  async start(): Promise<string | undefined> {
    const pGenerator = new PromptGenerator(this.model)
    const prompt = await pGenerator.start()
    return this.processingWithGPT(prompt)
  }

  isModelValid(): boolean {
    const model = this.model
    return (
      !!model.apiKey &&
      !!model.githubToken &&
      !!model.prompt &&
      !!model.model &&
      !!model.input &&
      !!model.output &&
      model.rewrite !== undefined
    )
  }
}
