const ejs = require('ejs')
const fs = require('fs')
const prettier = require('prettier')
const { exceptionsList } = require('../src/core/exeptionsList')

function escapeQuotes (str) {
  return str.replace(/['']/g, '\\\'')
}

async function renderException (name, inherits) {
  return await ejs.renderFile('./templates/exception.ejs', {
    inherits: escapeQuotes(inherits),
    name: escapeQuotes(name)
  })
}
}

let result = 'const { TelegramError } = require(\'./error\')\n'

function checkIsLowercase (str) {
  return str === str.toLowerCase()
}

async function main () {
  const exceptionsExports = new Set()

  for (const baseError in exceptionsList) {
    for (const exceptionType in exceptionsList[baseError]) {
      result += await renderException(exceptionType, baseError)
      exceptionsExports.add(exceptionType)
      for (const exception in exceptionsList[baseError][exceptionType]) {
        if (!checkIsLowercase(exceptionsList[baseError][exceptionType][exception].match)) {
          throw new Error(`${baseError}::${exceptionType}::${exception} contains uppercase symbols`)
        }

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
  fs.writeFileSync('../src/core/exceptions.js', prettier.format(result, {
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
