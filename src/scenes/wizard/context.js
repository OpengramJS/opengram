/**
 * @class
 * @memberof Scenes
 */
class WizardContext {
  /**
   * @param {OpengramContext} ctx Context
   * @param {MiddlewareFn[]} steps Steps
   */
  constructor (ctx, steps) {
    this.ctx = ctx
    this.steps = steps
    this.state = ctx.scene.state
    this.cursor = ctx.scene.session.cursor || 0
  }

  get step () {
    return this.cursor >= 0 && this.steps[this.cursor]
  }

  /**
   * Selects step of wizard
   *
   * @param {number} index Step index, starting from `0` (zero)
   * @return {WizardContext}
  */
  selectStep (index) {
    this.cursor = index
    this.ctx.scene.session.cursor = index
    return this
  }

  /**
   * Increments step of wizard
   *
   * @return {WizardContext}
   */
  next () {
    return this.selectStep(this.cursor + 1)
  }

  /**
   * Decrements step of wizard
   *
   * @return {WizardContext}
   */
  back () {
    return this.selectStep(this.cursor - 1)
  }
}

module.exports = WizardContext
