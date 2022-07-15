const test = require('ava')
const { session, Scenes } = require('../')
const { createBot } = require('./utils')

const BaseTextMessage = {
  chat: { id: 1 },
  from: { id: 1 },
  text: 'foo'
}

test('should execute enter middleware in scene', async t => {
  await t.notThrowsAsync(new Promise(resolve => {
    const bot = createBot()
    const scene = new Scenes.BaseScene('hello')
    scene.enter(resolve)
    const stage = new Scenes.Stage([scene])
    stage.use(ctx => ctx.scene.enter('hello'))
    bot.use(session())
    bot.use(stage)
    bot.handleUpdate({ message: BaseTextMessage })
  }))
})

test('should execute enter middleware in wizard scene', async t => {
  await t.notThrowsAsync(new Promise(resolve => {
    const bot = createBot()
    const scene = new Scenes.WizardScene('hello', [])
    scene.enter(resolve)
    const stage = new Scenes.Stage([scene])
    stage.use(ctx => ctx.scene.enter('hello'))
    bot.use(session())
    bot.use(stage)
    return bot.handleUpdate({ message: BaseTextMessage })
  }))
})

test('should execute first step in wizard scene on enter', async t => {
  await t.notThrowsAsync(new Promise(resolve => {
    const bot = createBot()
    const scene = new Scenes.WizardScene(
      'hello',
      resolve
    )
    const stage = new Scenes.Stage([scene])
    stage.use(ctx => ctx.scene.enter('hello'))
    bot.use(session())
    bot.use(stage)
    bot.handleUpdate({ message: BaseTextMessage })
  }))
})

test('should execute both enter middleware and first step in wizard scene on enter', async t => {
  t.plan(2)
  const bot = createBot()
  const scene = new Scenes.WizardScene(
    'hello',
    ctx => {
      t.pass()
    }
  )
  scene.enter((ctx, next) => {
    t.pass()
    return next()
  })
  const stage = new Scenes.Stage([scene])
  stage.use(ctx => ctx.scene.enter('hello'))
  bot.use(session())
  bot.use(stage)
  await bot.handleUpdate({ message: BaseTextMessage })
})
