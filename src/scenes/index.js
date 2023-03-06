/**
 * @namespace Scenes
 */

const BaseScene = require('./base')
const WizardScene = require('./wizard')
const Stage = require('./stage')

/**
 * @type {{
 *   WizardScene: Scenes.WizardScene,
 *   BaseScene: Scenes.BaseScene,
 *   Stage: Scenes.Stage
 * }}
 */
module.exports = {
  BaseScene,
  WizardScene,
  Stage
}
