import { FDModel } from './model'
import * as fs from 'fs'
import path from 'path'

export const GIT_DIFF_PROMPT = `You are an expert programmer, and you are trying to summarize a git diff.
                                Reminders about the git diff format:
                                For every file, there are a few metadata lines, like (for example):
                                \`\`\`
                                diff --git a/lib/index.js b/lib/index.js
                                index aadf691..bfef603 100644
                                --- a/lib/index.js
                                +++ b/lib/index.js
                                \`\`\`
                                This means that \`lib/index.js\` was modified in this commit. Note that this is only an example.
                                Then there is a specifier of the lines that were modified.
                                A line starting with \`+\` means it was added.
                                A line that starting with \`-\` means that line was deleted.
                                A line that starts with neither \`+\` nor \`-\` is code given for context and better understanding. 
                                It is not part of the diff.
                                `

export class PromptGenerator {
  protected isOutputExist: boolean
  protected isInputExist: boolean
  private get needRewrite(): boolean {
    return this.model.rewrite || !this.isOutputExist
  }

  constructor(private model: FDModel) {
    this.isOutputExist = fs.existsSync(model.output)
    this.isInputExist = fs.existsSync(model.input)
  }

  private async readFile(fPath: string): Promise<string> {
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

  private fileDescPrompt(filename: string, content: string): string {
    const prompt = `THE FILE ${filename} CONTENT:\n\`\`\`\n${content}\n\`\`\`\n\n${this.model.prompt}\n`
    return prompt
  }

  private gitPatchPrompt(filename: string, content: string): string {
    const prompt = `${GIT_DIFF_PROMPT}\n\nTHE GIT DIFF OF ${filename} TO BE SUMMARIZED:\n\`\`\`\n${content}\n\`\`\`\n\nSUMMARY:\n`
    return prompt
  }

  async start(): Promise<string> {
    if (!this.isInputExist) throw new Error('Input file does not exist')
    const filename = path.basename(this.model.input)
    const fileContent = await this.readFile(this.model.input)
    return this.needRewrite
      ? this.fileDescPrompt(filename, fileContent)
      : this.gitPatchPrompt(filename, fileContent)
  }
}
