/**
 * Keyboard Builder wrapping function used to divide the keyboard into columns.
 *
 * @name KeyboardWrap
 * @function
 * @param {string} btn Current button object
 * @param {number} index Current button index
 * @param {number} currentRow Current row
 * @return {boolean}
 * @example
 * Markup.keyboard(['one', 'two', 'three', 'four'], {
 *   wrap: (btn, index, currentRow) => index % 2 !== 0
 * })
 */

/**
 * @typedef {object} KeyboardOptions
 * @property {number} [columns=1] Count of keyboard columns
 * @property {KeyboardWrap} [wrap] Warp function
 */

/**
 * @typedef {object} InlineKeyboardOptions
 * @property {number} [columns] Count of keyboard columns, by default equals to `buttons.length`
 * @property {KeyboardWrap} [wrap] Warp function
 */

/**
 * @typedef {object} LoginButtonOptions
 * @property {string} [forward_text] New text of the button in forwarded messages.
 * @property {string} [bot_username] Username of a bot, which will be used for user authorization.
 * @property {boolean} [request_write_access] Pass True to request the permission for your bot to send messages to the user.
 */
