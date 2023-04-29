const ejs = require('ejs')
const fs = require('fs')
const prettier = require('prettier')
const { exceptionsList } = require('../src/core/exeptionsList')

async function renderException (name, inherits) {
  return await ejs.renderFile('./templates/exception.ejs', { inherits, name })
}

let result = 'const { TelegramError } = require("../src")\n'

async function main () {
  const exceptionsExports = new Set()

  for (const baseError in exceptionsList) {
    for (const exceptionType in exceptionsList[baseError]) {
      result += await renderException(exceptionType, baseError)
      exceptionsExports.add(exceptionType)
      for (const exception in exceptionsList[baseError][exceptionType]) {
        result += await renderException(exception, exceptionType)
        exceptionsExports.add(exception)
      }
    }
  }
  result += '\n\n'
  result += `module.exports = {
  Exceptions: {
    ${[...exceptionsExports].join(',')}
  }
}`
  result += '\n'
  fs.writeFileSync('../core/exceptions.js', prettier.format(result, {
    arrowParens: 'always',
    bracketSameLine: true,
    bracketSpacing: true,
    embeddedLanguageFormatting: 'auto',
    endOfLine: 'lf',
    htmlWhitespaceSensitivity: 'css',
    insertPragma: false,
    jsxSingleQuote: false,
    printWidth: 80,
    proseWrap: 'preserve',
    quoteProps: 'as-needed',
    requirePragma: false,
    semi: false,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'none',
    useTabs: false,
    vueIndentScriptAndStyle: false
  }))
}

main()
