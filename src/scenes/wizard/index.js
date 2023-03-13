const Composer = require('../../composer')
const WizardContext = require('./context')
const BaseScene = require('../base')
const { compose, unwrap } = Composer

/**
 * @class
 * @memberOf Scenes
 * @extends BaseScene
 */
class WizardScene extends BaseScene {
  constructor (id, optionsOrStep, ...steps) {
    let tOptions
    let tSteps
    if (typeof options === 'function' || 'middleware' in options) {

    // Make options optional
    if (typeof optionsOrStep === 'function' || 'middleware' in optionsOrStep) {
      tOptions = undefined
      tSteps = [options, ...steps]
      tSteps = [optionsOrStep, ...steps]
    } else {
      tOptions = options
      tOptions = optionsOrStep
      tSteps = steps
    }
    super(id, tOptions)
    this.steps = tSteps
  }

  /**
   * Returns enter handler composed with wizard middleware
   *
   * @private
   * @return {MiddlewareFn}
   */
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
