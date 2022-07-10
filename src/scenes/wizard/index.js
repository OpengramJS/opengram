const Composer = require('../../composer')
const WizardContext = require('./context')
const BaseScene = require('../base')
const { compose, unwrap } = Composer

class WizardScene extends BaseScene {
  constructor (id, options, ...steps) {
    let tOptions
    let tSteps
    if (typeof options === 'function' || 'middleware' in options) {
      tOptions = undefined
      tSteps = [options, ...steps]
    } else {
      tOptions = options
      tSteps = steps
    }
    super(id, tOptions)
    this.steps = tSteps
  }

  enterMiddleware () {
    return Composer.compose([this.enterHandler, this.middleware()])
  }

  middleware () {
    return compose([
      (ctx, next) => {
        ctx.wizard = new WizardContext(ctx, this.steps)
        return next()
      },
      super.middleware(),
      (ctx, next) => {
        if (!ctx.wizard.step) {
          ctx.wizard.selectStep(0)
          return ctx.scene.leave()
        }
        return unwrap(ctx.wizard.step)(ctx, next)
      }
    ])
  }
}

module.exports = WizardScene
