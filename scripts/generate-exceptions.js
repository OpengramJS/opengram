const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const prettier = require('prettier')
const { exceptionsList } = require('../src/core/exeptionsList')

function escapeQuotes (str) {
  return str.replace(/['']/g, '\\\'')
}
async function renderException (name, inherits) {
  return await ejs.renderFile(path.join(__dirname, 'templates', 'exception.ejs'), {
    inherits: escapeQuotes(inherits),
    name: escapeQuotes(name)
  })
}

async function renderExceptionTest (name, inherits, match) {
  return await ejs.renderFile(path.join(__dirname, 'templates', 'exception.test.ejs'), {
    inherits: escapeQuotes(inherits),
    name: escapeQuotes(name),
    match: escapeQuotes(match)
  })
}

let result = 'const { TelegramError } = require(\'./error\')\n'
let resultTest = 'const test = require(\'ava\')\n'
resultTest += 'const { createError } = require(\'./utils\')\n'
resultTest += 'const { Exceptions } = require(\'../src/core/exceptions\')\n'
resultTest += 'const { TelegramError } = require(\'../src/core/error\')\n'
resultTest += 'const { matchExceptionType, exceptionsHTTPCodesReverse } = require(\'../src/core/exeptionsList\')\n\n'

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
        const { match } = exceptionsList[baseError][exceptionType][exception]
        if (!checkIsLowercase(match)) {
          throw new Error(`${baseError}::${exceptionType}::${exception} contains uppercase symbols`)
        }

        result += await renderException(exception, exceptionType)
        resultTest += await renderExceptionTest(exception, exceptionType, match)
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
  resultTest += '\n'

  fs.writeFileSync(path.join(__dirname, '..', 'test', 'exceptions.js'), prettier.format(resultTest, {
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

  fs.writeFileSync(path.join(__dirname, '..', 'src', 'core', 'exceptions.js'), prettier.format(result, {
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
