'use strict'

const { Opengram, Markup, Extra } = require('opengram')

// Create Opengram instance with BOT TOKEN given by http://t.me/BotFather
const bot = new Opengram(process.env.BOT_TOKEN)

// Add updates logging
bot.use(Opengram.log())

// Register command handler /onetime
bot.command('onetime', ({ reply }) =>
  reply('One time keyboard', Markup
    .keyboard(['/simple', '/inline', '/pyramid'])
    .oneTime()
    .resize()
    .extra()
  )
)

// Register command handler /custom
bot.command('custom', ({ reply }) => {
  return reply('Custom buttons keyboard', Markup
    .keyboard([
      ['🔍 Search', '😎 Popular'], // Row1 with 2 buttons
      ['☸ Setting', '📞 Feedback'], // Row2 with 2 buttons
      ['📢 Ads', '⭐️ Rate us', '👥 Share'] // Row3 with 3 buttons
    ])
    .oneTime()
    .resize()
    .extra()
  )
})

// Register command handler 🔍 Search text
bot.hears('🔍 Search', ctx => ctx.reply('Yay!'))

// Register command handler 📢 Ads text
bot.hears('📢 Ads', ctx => ctx.reply('Free hugs. Call now!'))

// Register command handler /special
bot.command('special', (ctx) => {
  return ctx.reply('Special buttons keyboard', Extra.markup((markup) => {
    return markup.resize()
      .keyboard([
        markup.contactRequestButton('Send contact'),
        markup.locationRequestButton('Send location')
      ])
  }))
})

// Register command handler /pyramid
bot.command('pyramid', (ctx) => {
  return ctx.reply('Keyboard wrap', Extra.markup(
    Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
      wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
    })
  ))
})

// Register command handler /simple
bot.command('simple', (ctx) => {
  return ctx.replyWithHTML('<b>Coke</b> or <i>Pepsi?</i>', Extra.markup(
    Markup.keyboard(['Coke', 'Pepsi'])
  ))
})

// Register command handler /inline
bot.command('inline', (ctx) => {
  return ctx.reply('<b>Coke</b> or <i>Pepsi?</i>', Extra.HTML().markup((m) =>
    m.inlineKeyboard([
      m.callbackButton('Coke', 'Coke'),
      m.callbackButton('Pepsi', 'Pepsi')
    ])))
})

// Register command handler /random
bot.command('random', (ctx) => {
  return ctx.reply('random example',
    Markup.inlineKeyboard([
      Markup.callbackButton('Coke', 'Coke'),
      Markup.callbackButton('Dr Pepper', 'Dr Pepper', Math.random() > 0.5),
      Markup.callbackButton('Pepsi', 'Pepsi')
    ]).extra()
  )
})

// Register command handler /caption
bot.command('caption', (ctx) => {
  return ctx.replyWithPhoto({ url: 'https://picsum.photos/200/300/?random' },
    Extra.load({ caption: 'Caption' })
      .markdown()
      .markup((m) =>
        m.inlineKeyboard([
          m.callbackButton('Plain', 'plain'),
          m.callbackButton('Italic', 'italic')
        ])
      )
  )
})

// Register command handler /wrap <number_of_columns>
bot.hears(/\/wrap (\d+)/, (ctx) => {
  return ctx.reply('Keyboard wrap', Extra.markup(
    Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
      columns: parseInt(ctx.match[1])
    })
  ))
})

// Register callback query handler for "Dr Pepper" data
bot.action('Dr Pepper', (ctx, next) => {
  return ctx.reply('👍').then(() => next())
})

// Register callback query handler for "plain" data
bot.action('plain', async (ctx) => {
  await ctx.answerCbQuery()
  await ctx.editMessageCaption('Caption', Markup.inlineKeyboard([
    Markup.callbackButton('Plain', 'plain'),
    Markup.callbackButton('Italic', 'italic')
  ]))
})

// Register callback query handler for "italic" data
bot.action('italic', async (ctx) => {
  await ctx.answerCbQuery()
  await ctx.editMessageCaption('_Caption_', Extra.markdown().markup(Markup.inlineKeyboard([
    Markup.callbackButton('Plain', 'plain'),
    Markup.callbackButton('* Italic *', 'italic')
  ])))
})

// Register handler for callback query with Regex trigger
bot.action(/.+/, (ctx) => {
  return ctx.answerCbQuery(`Oh, ${ctx.match[0]}! Great choice`)
})

const commandsList = [
  {
    command: '/onetime',
    description: 'Sends onetime text keyboard'
  },
  {
    command: '/custom',
    description: 'Sends onetime multi row text keyboard'
  },
  {
    command: '/special',
    description: 'Sends text keyboard with contact & location buttons'
  },
  {
    command: '/pyramid',
    description: 'Sends text keyboard with pyramid rows, calculated with wrap function'
  },
  {
    command: '/simple',
    description: 'Sends simple text keyboard'
  },
  {
    command: '/inline',
    description: 'Sends dynamically generated inline keyboard with callback buttons'
  },
  {
    command: '/random',
    description: 'Sends inline keyboard with callback button where one of buttons randomly hided'
  },
  {
    command: '/caption',
    description: 'Sends dynamically generated inline keyboard with photo and caption'
  },
  {
    command: '/wrap',
    description: 'Sends buttons with count of columns given in first command argument, for example /wrap 2'
  }
]

// Add start command handler for printing commands list
bot.start(ctx => {
  return ctx.reply(
    commandsList
      .map(({ command, description }) => `${command} - ${description}`)
      .join('\n')
  )
})

// Register error handler, for preventing bot crashes
bot.catch((error, ctx) => {
  console.error(error, ctx) // Print error and context
})

// Set commands list in bot menu
bot.telegram.setMyCommands(commandsList)
  .then(() => bot.launch()) // Start bot using long-polling
  .then(() => console.log(`Bot ${bot.context.botInfo.username} started`))

// Enable graceful stop
process.once('SIGINT', () => bot.stop())
process.once('SIGTERM', () => bot.stop())
