local lazypath = vim.fn.stdpath('data') .. '/lazy/lazy.nvim'
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    'git',
    'clone',
    '--filter=blob:none',
    'https://github.com/folke/lazy.nvim.git',
    '--branch=stable', -- latest stable release
    lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)

local plugins = {
  {
    'tpope/vim-fugitive'
  },
  {
    'dinhhuy258/git.nvim'
  },
  {
    'lewis6991/gitsigns.nvim'
  },

  -- Theme
  {
    'rose-pine/neovim',
    name = 'rose-pine',
    config = function()
      vim.cmd('colorscheme rose-pine')
    end
  },

  -- Bufferline
  {
    'akinsho/bufferline.nvim',
    version = 'v3.*',
    dependencies = {
      'nvim-tree/nvim-web-devicons'
    }
  },

  {
    'windwp/nvim-autopairs',
    config = function()
      require('nvim-autopairs').setup({})
    end
  },

  -- Trouble
  {
    'folke/trouble.nvim',
    config = function()
      require('trouble').setup({})
    end
  },

  -- TS Autotag
  {
    'windwp/nvim-ts-autotag'
  },

  -- Icons
  -- {
  --   'nvim-tree/nvim-web-devicons'
  -- },

  -- LSP null-ls
  {
    'jose-elias-alvarez/null-ls.nvim'
  },

  -- Zen Mode
  {
    'folke/zen-mode.nvim'
  },

  -- Colorizer
  {
    'norcalli/nvim-colorizer.lua'
  },

  -- Startify
  {
    'mhinz/vim-startify'
  },

  -- Cellular Automaton
  {
    'eandrju/cellular-automaton.nvim'
  },

  -- Copilot.vim
  {
    'github/copilot.vim'
  },

  -- Navic
  {
    'SmiteshP/nvim-navic',
    dependencies = {
      'neovim/nvim-lspconfig'
    }
  },

  {
    'numToStr/Comment.nvim'
  },

  -- Weaktime
  {
    'wakatime/vim-wakatime'
  },

  {
    "kylechui/nvim-surround",
    version = "*", -- Use for stability; omit to use `main` branch for the latest features
    event = "VeryLazy",
    config = function()
      require("nvim-surround").setup({
        -- Configuration here, or leave empty to use defaults
      })
    end
  },
}
require('lazy').setup(plugins, {})
