'use strict'

const { Opengram, Extra } = require('opengram')
// Middleware file you created previously
const { i18n, match } = require('./i18n')
const i18next = require('i18next')

const bot = new Opengram(process.env.BOT_TOKEN)

async function startBot () {
  // Init i18next
  await i18next.init({
    lng: 'ru', // Default language
    fallbackLng: 'ru', // The language whose file will be used if the key is not present in the current user language
    debug: true, // Enable i18next debug logs
    // An objects with locale resources, where the key is its name and the object is its content
    // Supports nested keys.
    // These objects can be moved to separate files.
    resources: {
      en: {
        translation: { // Required by i18next
          hello: 'hello world',
          keyboard: {
            button: 'Button name'
          },
          messageOnPress: 'You pressed the button ({{ buttonName }})' // You can also send some data (Interpolation)
        }
      },
      ru: {
        translation: { // Required by i18next
          hello: 'Привет мир',
          keyboard: {
            button: 'Имя кнопки'
          },
          messageOnPress: 'Вы нажали кнопку ({{ buttonName }})' // You can also send some data (Interpolation)
        }
      }
    }
  })

  // Register i18next middleware
  bot.use(
    i18n(i18next)
  )

  bot.start(ctx => {
    // Build keyboard
    const keyboard = Extra.markup(
      m => m.keyboard([
        m.button(
          ctx.i18n.t('keyboard.button') // Create button with text 'Button name'
        )
      ]).resize()
    )

    // Reply with localized message and keyboard
    return ctx.reply(
      ctx.i18n.t('hello'),
      keyboard
    )
  })

  // Matches text by user locale (for ru "Имя кнопки" and for en "Button name")
  bot.hears(match('keyboard.button'), ctx => {
    return ctx.reply(
      ctx.i18n.t('messageOnPress', { buttonName: ctx.match[0] })
    )
  })

  return bot.launch()
    .then(() => console.log('Bot started successfully'))
}

startBot()
