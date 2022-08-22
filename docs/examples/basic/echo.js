'use strict'

const { Opengram } = require('../../../')

if (process.env.BOT_TOKEN === undefined) {
  throw new TypeError('BOT_TOKEN must be provided!')
}

// Create Opengram instance with BOT TOKEN given by http://t.me/BotFather
const bot = new Opengram(process.env.BOT_TOKEN)

// Add handler for text messages
bot.on('text', async ctx => {
  await ctx.reply(ctx.message.text)
})

// Register error handler, for preventing bot crashes
bot.catch((error, ctx) => {
  console.error(error, ctx) // Print error and context
})

// Start bot using long-polling
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop())
process.once('SIGTERM', () => bot.stop())
