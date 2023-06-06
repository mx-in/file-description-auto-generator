export const prompt = `This is a neovim plugin config file, it is written in lua.
                  the item in plugins is all the plugins that are installed.
                  Write \`NeoVimConfig:\` as title and then you need to explain what each plugin does in markdown format.
                  for example:
                    {
                      'nvim-telescope/telescope-fzf-native.nvim',
                      build = 'make',
                      cond = function()
                        return vim.fn.executable 'make' == 1
                      end,
                    },
                  
                  you need to explain what this plugin does in the following way and keep the explanation short:
                    * [telescope-fzf-native](https://github.com/nvim-telescope/telescope-fzf-native.nvim)
                      fzf-native is a c port of fzf. It only covers the algorithm and implements few functions to support calculating the score.
                  `

export const apiKey = process.env.OPENAI_API_KEY || ''
export const githubToken = process.env.GITHUB_TOKEN || 'test_github_token'
