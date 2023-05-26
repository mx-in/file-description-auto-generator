import { FDModel } from './model'
import { PromptGenerator } from './prompt_generator'

export abstract class Processor {
  constructor(protected model: FDModel) {
    if (!this.isModelValid()) throw new Error('Invalid input model')
  }

  abstract processingWithGPT(prompt: string): Promise<string | undefined>
  /*
   * 1. Check if input file exists
   * 2. Check if output file exists
   * 3. Read input file
   * 4. Generate output
   * */
  async start(): Promise<string | undefined> {
    const pGenerator = new PromptGenerator(this.model)
    const prompt = await pGenerator.start()
    console.log('Prompt generated::::', prompt)
    return this.processingWithGPT(prompt)
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
