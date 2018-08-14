#! /usr/bin/env node
const path = require('path')
const currentDir = __dirname
const eslintConfigPath = path.resolve(currentDir, '..', '.eslintrc')
const eslintIgnoreConfigPath = path.resolve(currentDir, '..', '.eslintignore')
const lintStagedConfigPath = path.resolve(currentDir, '..', '.lint-stagedrc')
const stylelintConfigPath = path.resolve(currentDir, '..', '.stylelintrc')

const isFunction = obj => {
  return !!(obj && obj.constructor && obj.call && obj.apply)
}

const executeCommand = (command, args) => {
  const spawn = require('child_process').spawn
  const child = spawn(`node_modules/.bin/${command}`, args, {
    shell: true,
    stdio: 'inherit'
  })

  child.on('close', code => {
    process.exit(code)
  })
}

const eslintArgs = [
  `--config=${eslintConfigPath}`,
  `--ignore-path=${eslintIgnoreConfigPath}`,
  '--ext=.js,.jsx',
  '--color',
  '--fix'
]

const stylelintArgs = [`--config=${stylelintConfigPath}`, '--fix']

const COMMANDS = {
  'check:code': {
    command: 'eslint',
    args: [...eslintArgs, process.cwd()]
  },
  'check:code-specific': {
    command: 'eslint',
    args: [...eslintArgs]
  },
  'check:style': {
    command: 'stylelint',
    args: [...stylelintArgs, `"${process.cwd()}/**/*.pcss"`]
  },
  'check:style-specific': {
    command: 'stylelint',
    args: [...stylelintArgs]
  },
  'commit-hook': {
    command: 'lint-staged',
    args: [`--config=${lintStagedConfigPath}`]
  }
}

const [, , commandName, ...binArgs] = process.argv

if (commandName === 'check') {
  const codeConfig = COMMANDS['check:code']
  const styleConfig = COMMANDS['check:style']

  executeCommand(codeConfig.command, codeConfig.args)
  executeCommand(styleConfig.command, styleConfig.args)
  return
}

const commandEntry = COMMANDS[commandName]

if (isFunction(commandEntry)) {
  commandEntry()
  return
}

let { command, args = [] } = commandEntry || {}

args.push(...binArgs)

if (!command) {
  console.log('Purfect Syntax: Command not found!')
  return
}

executeCommand(command, args)
