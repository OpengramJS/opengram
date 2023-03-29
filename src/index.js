const Opengram = require('./opengram')
const Composer = require('./composer')
const Telegram = require('./telegram')
const { OpengramContext: Context } = require('./context')
const { TelegramError, isTelegramError } = require('./core/error')
const Markup = require('./markup')
const Extra = require('./extra')
const Router = require('./router')
const { BaseScene, WizardScene, Stage } = require('./scenes')
const session = require('./session')

module.exports = {
  default: Opengram,
  Opengram,
  Composer,
  Context,
  TelegramError,
  isTelegramError,
  Extra,
  Markup,
  Router,
  Telegram,
  BaseScene,
  WizardScene,
  Stage,
  Scenes: { BaseScene, WizardScene, Stage },
  session
}
