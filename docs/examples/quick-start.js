const { Opengram, isTelegramError } = require('opengram')

const bot = new Opengram(process.env.BOT_TOKEN) // <-- put your bot token here (https://t.me/BotFather)

// Register handlers
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))

bot.catch((error, ctx) => {
  if (isTelegramError(error)) {
    console.error(error, ctx) // Print error and context
    return
  }
  throw error
})

bot.launch() // Start bot using polling

// Enable graceful stop
process.once('SIGINT', () => bot.stop())
process.once('SIGTERM', () => bot.stop())
