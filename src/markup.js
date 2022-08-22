const { escapeHTML } = require('./core/helpers/escape')

/** Class for building keyboard markup */
class Markup {
  /**
   * Adding force reply option to markup
   * @see https://core.telegram.org/bots/api#forcereply
   * @param {boolean} [value=true]
   * @return {Markup}
   */
  forceReply (value = true) {
    this.force_reply = value
    return this
  }

  /**
   * Enable / Disable keyboard removing
   * @see https://core.telegram.org/bots/api#replykeyboardremove
   * @param {boolean} [value=true]
   * @return {Markup}
   */
  removeKeyboard (value = true) {
    this.remove_keyboard = value
    return this
  }

  /**
   * Changing input field placeholder when reply is active (used with forceReply)
   * @see https://core.telegram.org/bots/api#forcereply
   * @param {string} placeholder Placeholder text
   * @return {Markup}
   */
  inputFieldPlaceholder (placeholder) {
    this.input_field_placeholder = placeholder
    return this
  }

  /**
   * Enable / Disable selective for force reply / remove keyboard
   *
   * Keyboards are non-selective by default, use this function to enable it
   * (without any parameters or pass `true`). Pass `false` to force the
   * keyboard to be non-selective.
   * @see https://core.telegram.org/bots/api#forcereply
   * @see https://core.telegram.org/bots/api#replykeyboardremove
   * @param {boolean} [value=true]
   * @return {Markup}
   */
  selective (value = true) {
    this.selective = value
    return this
  }

  /**
   * Returns a ready object for extra parameters with given additional options, equals result to `Extra.markup(markupObj)`
   *
   * ```js
   * ctx.reply('<i>Banana</i>', Markup.inlineKeyboard([
   *   Markup.callbackButton('Yes', 'yes'),
   *   Markup.callbackButton('No', 'no')
   * ]).extra({ parse_mode: 'HTML' }))
   * ```
   * @param {object} [options] Additional options which should be passed into extra
   * @return {object}
   */
  extra (options) {
    return {
      reply_markup: { ...this },
      ...options
    }
  }

  /**
   * Build keyboard with given buttons
   *
   * ```js
   * // Make one-line keyboard with resize
   * Markup.keyboard(['one', 'two', 'three', 'four']).resize()
   *
   * // Make two columns keyboard with custom function
   * Markup.keyboard(['one', 'two', 'three', 'four'], {
   *   wrap: (btn, index, currentRow) => index % 2 !== 0
   * }).resize()
   *
   * // Make fixed two columns keyboard with custom function
   * Markup.keyboard(['one', 'two', 'three', 'four'], { columns: 2 }).resize()
   * ```
   *
   * @see https://core.telegram.org/bots/api#replykeyboardmarkup
   * @param {object} buttons Array of buttons
   * @param {keyboardOptions} [options] You can pass here columns count or wrap function for slice buttons to columns
   * @return {Markup}
   */
  keyboard (buttons, options) {
    const keyboard = buildKeyboard(buttons, { columns: 1, ...options })
    if (keyboard && keyboard.length > 0) {
      this.keyboard = keyboard
    }
    return this
  }

  /**
   * Build inline keyboard with given buttons
   *
   * ```js
   * // Make one-line inline keyboard with resize
   * Markup.inlineKeyboard(['one', 'two', 'three', 'four'])
   *
   * // Make two columns inline keyboard with custom function
   * Markup.inlineKeyboard(['one', 'two', 'three', 'four'], {
   *   wrap: (btn, index, currentRow) => index % 2 !== 0
   * })
   *
   * // Make fixed two columns inline keyboard with custom function
   * Markup.inlineKeyboard(['one', 'two', 'three', 'four'], { columns: 2 })
   * ```
   *
   * @see https://core.telegram.org/bots/api#inlinekeyboardmarkup
   * @param {object} buttons Array of buttons
   * @param {inlineKeyboardOptions} options You can pass here columns count or wrap function for slice buttons to columns
   * @return {Markup}
   */
  inlineKeyboard (buttons, options) {
    const keyboard = buildKeyboard(buttons, { columns: buttons.length, ...options })
    if (keyboard && keyboard.length > 0) {
      this.inline_keyboard = keyboard
    }
    return this
  }

  /**
   * Enable / Disable resize for keyboard.
   *
   * Keyboards are non-resized by default, use this function to enable it
   * (without any parameters or pass `true`). Pass `false` to force the
   * keyboard to be non-resized.
   * @see https://core.telegram.org/bots/api#replykeyboardmarkup
   * @param {boolean} [value=true]
   * @return {Markup}
   */
  resize (value = true) {
    this.resize_keyboard = value
    return this
  }

  /**
   * Enable / Disable hiding keyboard after click
   * @see https://core.telegram.org/bots/api#replykeyboardmarkup
   * @param {boolean} [value=true]
   * @return {Markup}
   */
  oneTime (value = true) {
    this.one_time_keyboard = value
    return this
  }

  /**
   * Adds a new text button. This button will simply send the given text as a
   * text message back to your bot if a user clicks on it. Available for non-inline keyboard only.
   * @see https://core.telegram.org/bots/api#keyboardbutton
   * @param text {string} The text to display and send
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for hide button when build keyboard
   * @return object
   */
  button (text, hide) {
    return Markup.button(text, hide)
  }

  /**
   * Adds a new contact request button. The user's phone number will be sent
   * as a contact when the button is pressed. Available in private chats only.
   *
   * Your bot will in turn receive location updates. You can listen
   * to contact updates like this:
   * ```js
   * bot.on('contact', ctx => { ... })
   * ```
   * @see https://core.telegram.org/bots/api#keyboardbutton
   * @param text {string} The text to display
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for hide button when build keyboard
   * @return object
   */
  contactRequestButton (text, hide) {
    return Markup.contactRequestButton(text, hide)
  }

  /**
   * Adds a new location request button. The user's current location will be
   * sent when the button is pressed. Available in private chats only.
   *
   * Your bot will in turn receive location updates. You can listen
   * to inline query updates like this:
   * ```js
   * bot.on('location', ctx => { ... })
   * ```
   * @see https://core.telegram.org/bots/api#keyboardbutton
   * @param text {string} The text to display
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for hide button when build keyboard
   * @return object
   */
  locationRequestButton (text, hide) {
    return Markup.locationRequestButton(text, hide)
  }

  /**
   * Adds a new poll request button. The user will be asked to create a poll
   * and send it to the bot when the button is pressed. Available in private
   * chats only.
   *
   * @see https://core.telegram.org/bots/api#keyboardbutton
   * @see https://core.telegram.org/bots/api#keyboardbuttonpolltype
   * @param text {string} The text to display
   * @param {'quiz'|'regular'} [type] The type of permitted polls to create, omit if the user may send a poll of any type
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for hide button when build keyboard
   * @return object
   */
  pollRequestButton (text, type, hide) {
    return Markup.pollRequestButton(text, type, hide)
  }

  /**
   * Adds a new URL button. Telegram clients will open the provided URL when
   * the button is pressed.
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @param text {string} The text to display
   * @param url HTTP or `tg://` URL to be opened when the button is pressed. Links `tg://user?id=<user_id>` can be used to mention a user by their ID without using a username, if this is allowed by their privacy settings.
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for hide button when build keyboard
   * @return object
   */
  urlButton (text, url, hide) {
    return Markup.urlButton(text, url, hide)
  }

  /**
   * Adds a new callback query button. The button contains a text and a custom
   * payload. This payload will be sent back to your bot when the button is
   * pressed. If you omit the payload, the display text will be sent back to
   * your bot.
   *
   * Your bot will receive an update every time a user presses any of the text
   * buttons. You can listen to these updates like this:
   * ```js
   * // Specific buttons:
   * bot.action('some-payload', ctx => { ... })
   *
   * // Any button of any inline keyboard:
   * bot.on('callback_query', ctx => { ... })
   * ```
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @param text {string} The text to display
   * @param data {string} Data to be sent in a callback query to the bot when button is pressed, 1-64 bytes
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for hide button when build keyboard
   * @return object
   */
  callbackButton (text, data, hide) {
    return Markup.callbackButton(text, data, hide)
  }

  /**
   * Adds a new inline query button. Telegram clients will let the user pick a
   * chat when this button is pressed. This will start an inline query. The
   * selected chat will be prefilled with the name of your bot. You may
   * provide a text that is specified along with it.
   *
   * Your bot will in turn receive updates for inline queries. You can listen
   * to inline query updates like this:
   * ```js
   * bot.on('inline_query', ctx => { ... })
   * ```
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @param text {string} The text to display
   * @param value {string}
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for hide button when build keyboard
   * @return object
   */
  switchToChatButton (text, value, hide) {
    return Markup.switchToChatButton(text, value, hide)
  }

  /**
   * Adds a new inline query button that act on the current chat. The selected
   * chat will be prefilled with the name of your bot. You may provide a text
   * that is specified along with it. This will start an inline query.
   *
   * Your bot will in turn receive updates for inline queries. You can listen
   * to inline query updates like this:
   * ```js
   * bot.on('inline_query', ctx => { ... })
   * ```
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @param text {string} The text to display
   * @param value {string}
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for hide button when build keyboard
   * @return object
   */
  switchToCurrentChatButton (text, value, hide) {
    return Markup.switchToCurrentChatButton(text, value, hide)
  }

  /**
   * Adds a new game query button
   * @see https://core.telegram.org/bots/api#games
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @param text {string} The text to display
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for hide button when build keyboard
   * @return object
   */
  gameButton (text, hide) {
    return Markup.gameButton(text, hide)
  }

  /**
   * Adds a new payment button
   * @see https://core.telegram.org/bots/api#payments
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @param text {string} The text to display
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for hide button when build keyboard
   * @return object
   */
  payButton (text, hide) {
    return Markup.payButton(text, hide)
  }

  /**
   * Adds a new login button. This can be used as a replacement for the
   * Telegram Login Widget. You must specify an HTTPS URL used to
   * automatically authorize the user.
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @param {string} text Message text
   * @param {string} url An HTTPS URL to be opened with user authorization data added to the query string when the button is pressed. If the user refuses to provide authorization data, the original URL without information about the user will be opened. The data added is the same as described in Receiving authorization data.
   * @param {loginButtonOptions} [opts] Login options
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for hide button when build keyboard
   * @return object
   */
  loginButton (text, url, opts, hide) {
    return Markup.loginButton(text, url, opts, hide)
  }

  /**
   *  Adds a new web app button. The Web App that will be launched when the
   *  user presses the button. The Web App will be able to send a
   *  `web_app_data` service message. Available in private chats only.
   * @see https://core.telegram.org/bots/webapps
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @see https://core.telegram.org/bots/api#keyboardbutton
   * @param {string} text text to display
   * @param {string} url An HTTPS URL of a Web App to be opened with additional data
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for hide button when build keyboard
   * @return object
   */
  webApp (text, url, hide) {
    return Markup.webApp(text, url, hide)
  }

  /**
   * Enable / Disable keyboard removing
   * @see https://core.telegram.org/bots/api#replykeyboardremove
   * @param {boolean} [value=true]
   * @return {Markup}
   */
  static removeKeyboard (value) {
    return new Markup().removeKeyboard(value)
  }

  /**
   * Adding force reply option to markup
   * @see https://core.telegram.org/bots/api#forcereply
   * @param {boolean} [value=true]
   * @return {Markup}
   */
  static forceReply (value) {
    return new Markup().forceReply(value)
  }

  /**
   * Build keyboard with given buttons
   *
   *
   * ```js
   * // Make one-line keyboard with resize
   * Markup.keyboard(['one', 'two', 'three', 'four']).resize()
   *
   * // Make two columns keyboard with custom function
   * Markup.keyboard(['one', 'two', 'three', 'four'], {
   *   wrap: (btn, index, currentRow) => index % 2 !== 0
   * }).resize()
   *
   * // Make fixed two columns keyboard with custom function
   * Markup.keyboard(['one', 'two', 'three', 'four'], { columns: 2 }).resize()
   * ```
   *
   * @see https://core.telegram.org/bots/api#replykeyboardmarkup
   * @param {object} buttons Array of buttons
   * @param {keyboardOptions} [options] You can pass here columns count or wrap function for slice buttons to columns
   * @return {Markup}
   */
  static keyboard (buttons, options) {
    return new Markup().keyboard(buttons, options)
  }

  /**
   * Build inline keyboard with given buttons
   *
   * ```js
   * // Make one-line inline keyboard with resize
   * Markup.inlineKeyboard(['one', 'two', 'three', 'four'])
   *
   * // Make two columns inline keyboard with custom function
   * Markup.inlineKeyboard(['one', 'two', 'three', 'four'], {
   *   wrap: (btn, index, currentRow) => index % 2 !== 0
   * })
   *
   * // Make fixed two columns inline keyboard with custom function
   * Markup.inlineKeyboard(['one', 'two', 'three', 'four'], { columns: 2 })
   * ```
   *
   * @see https://core.telegram.org/bots/api#inlinekeyboardmarkup
   * @param {object} buttons Array of buttons
   * @param {inlineKeyboardOptions} [options] You can pass here columns count or wrap function for slice buttons to columns
   * @return {Markup}
   */
  static inlineKeyboard (buttons, options) {
    return new Markup().inlineKeyboard(buttons, options)
  }

  /**
   * Enable / Disable resize for keyboard.
   *
   * Keyboards are non-resized by default, use this function to enable it
   * (without any parameters or pass `true`). Pass `false` to force the
   * keyboard to be non-resized.
   * @see https://core.telegram.org/bots/api#replykeyboardmarkup
   * @param {boolean} [value=true]
   * @return {Markup}
   */
  static resize (value = true) {
    return new Markup().resize(value)
  }

  /**
   * Changing input field placeholder when reply is active, used with forceReply
   * @see https://core.telegram.org/bots/api#forcereply
   * @param {string} placeholder
   * @return {Markup}
   */
  static inputFieldPlaceholder (placeholder) {
    return new Markup().inputFieldPlaceholder(placeholder)
  }

  /**
   * Enable / Disable selective for force reply / remove keyboard
   *
   * Keyboards are non-selective by default, use this function to enable it
   * (without any parameters or pass `true`). Pass `false` to force the
   * keyboard to be non-selective.
   * @see https://core.telegram.org/bots/api#forcereply
   * @see https://core.telegram.org/bots/api#replykeyboardremove
   * @param {boolean} [value=true]
   * @return {Markup}
   */
  static selective (value = true) {
    return new Markup().selective(value)
  }

  /**
   * Enable / Disable hiding keyboard after click
   * @see https://core.telegram.org/bots/api#replykeyboardmarkup
   * @param {boolean} [value=true]
   * @return {Markup}
   */
  static oneTime (value = true) {
    return new Markup().oneTime(value)
  }

  /**
   * Adds a new text button. This button will simply send the given text as a
   * text message back to your bot if a user clicks on it. Available for non-inline keyboard only.
   * @see https://core.telegram.org/bots/api#keyboardbutton
   * @param text {string} The text to display and send
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for hide button when build keyboard
   * @return object
   */
  static button (text, hide = false) {
    return { text, hide }
  }

  /**
   * Adds a new contact request button. The user's phone number will be sent
   * as a contact when the button is pressed. Available in private chats only.
   *
   * Your bot will in turn receive location updates. You can listen
   * to contact updates like this:
   * ```js
   * bot.on('contact', ctx => { ... })
   * ```
   * @see https://core.telegram.org/bots/api#keyboardbutton
   * @param text {string} The text to display
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for hide button when build keyboard
   * @return object
   */
  static contactRequestButton (text, hide = false) {
    return { text, request_contact: true, hide }
  }

  /**
   * Adds a new location request button. The user's current location will be
   * sent when the button is pressed. Available in private chats only.
   *
   * Your bot will in turn receive location updates. You can listen
   * to inline query updates like this:
   * ```js
   * bot.on('location', ctx => { ... })
   * ```
   * @see https://core.telegram.org/bots/api#keyboardbutton
   * @param text {string} The text to display
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for hide button when build keyboard
   * @return object
   */
  static locationRequestButton (text, hide = false) {
    return { text, request_location: true, hide }
  }

  /**
   * Adds a new poll request button. The user will be asked to create a poll
   * and send it to the bot when the button is pressed. Available in private
   * chats only.
   *
   * @see https://core.telegram.org/bots/api#keyboardbutton
   * @see https://core.telegram.org/bots/api#keyboardbuttonpolltype
   * @param {string} text The text to display
   * @param {'quiz'|'regular'} [type] The type of permitted polls to create, omit if the user may send a poll of any type
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for hide button when build keyboard
   * @return object
   */
  static pollRequestButton (text, type, hide = false) {
    return { text, request_poll: { type }, hide }
  }

  /**
   * Adds a new URL button. Telegram clients will open the provided URL when
   * the button is pressed.
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @param text {string} The text to display
   * @param url HTTP or `tg://` URL to be opened when the button is pressed. Links `tg://user?id=<user_id>` can be used to mention a user by their ID without using a username, if this is allowed by their privacy settings.
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for hide button when build keyboard
   * @return object
   */
  static urlButton (text, url, hide = false) {
    return { text, url, hide }
  }

  /**
   * Adds a new callback query button. The button contains a text and a custom
   * payload. This payload will be sent back to your bot when the button is
   * pressed. If you omit the payload, the display text will be sent back to
   * your bot.
   *
   * Your bot will receive an update every time a user presses any of the text
   * buttons. You can listen to these updates like this:
   * ```js
   * // Specific buttons:
   * bot.action('some-payload', ctx => { ... })
   *
   * // Any button of any inline keyboard:
   * bot.on('callback_query', ctx => { ... })
   * ```
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @param text {string} The text to display
   * @param data {string} Data to be sent in a callback query to the bot when button is pressed, 1-64 bytes
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for hide button when build keyboard
   * @return object
   */
  static callbackButton (text, data, hide = false) {
    return { text, callback_data: data, hide }
  }

  /**
   * Adds a new inline query button. Telegram clients will let the user pick a
   * chat when this button is pressed. This will start an inline query. The
   * selected chat will be prefilled with the name of your bot. You may
   * provide a text that is specified along with it.
   *
   * Your bot will in turn receive updates for inline queries. You can listen
   * to inline query updates like this:
   * ```js
   * bot.on('inline_query', ctx => { ... })
   * ```
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @param text {string} The text to display
   * @param value {string}
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for hide button when build keyboard
   * @return object
   */
  static switchToChatButton (text, value, hide = false) {
    return { text, switch_inline_query: value, hide }
  }

  /**
   * Adds a new inline query button that act on the current chat. The selected
   * chat will be prefilled with the name of your bot. You may provide a text
   * that is specified along with it. This will start an inline query.
   *
   * Your bot will in turn receive updates for inline queries. You can listen
   * to inline query updates like this:
   * ```js
   * bot.on('inline_query', ctx => { ... })
   * ```
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @param text {string} The text to display
   * @param value {string}
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for hide button when build keyboard
   * @return object
   */
  static switchToCurrentChatButton (text, value, hide = false) {
    return { text, switch_inline_query_current_chat: value, hide }
  }

  /**
   * Adds a new game query button
   * @see https://core.telegram.org/bots/api#games
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @param text {string} The text to display
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for hide button when build keyboard
   * @return object
   */
  static gameButton (text, hide = false) {
    return { text, callback_game: {}, hide }
  }

  /**
   * Adds a new payment button
   * @see https://core.telegram.org/bots/api#payments
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @param text {string} The text to display
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for hide button when build keyboard
   * @return object
   */
  static payButton (text, hide = false) {
    return { text, pay: true, hide }
  }

  /**
   * Adds a new login button. This can be used as a replacement for the
   * Telegram Login Widget. You must specify an HTTPS URL used to
   * automatically authorize the user.
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @param {string} text
   * @param {string} url An HTTPS URL to be opened with user authorization data added to the query string when the button is pressed. If the user refuses to provide authorization data, the original URL without information about the user will be opened. The data added is the same as described in Receiving authorization data.
   * @param {loginButtonOptions} [opts]
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for hide button when build keyboard
   * @return object
   */
  static loginButton (text, url, opts = {}, hide = false) {
    return {
      text,
      login_url: { ...opts, url },
      hide
    }
  }

  /**
   *  Adds a new web app button. The Web App that will be launched when the
   *  user presses the button. The Web App will be able to send a
   *  `web_app_data` service message. Available in private chats only.
   * @see https://core.telegram.org/bots/webapps
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @see https://core.telegram.org/bots/api#keyboardbutton
   * @param {string} text Text to display
   * @param {string} url An HTTPS URL of a Web App to be opened with additional data
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for hide button when build keyboard
   * @return object
   */
  static webApp (text, url, hide = false) {
    return {
      text,
      web_app: { url },
      hide
    }
  }

  /**
   * Returns build HTML given text and entities object
   * @param {string} text Message text
   * @param {Object[]} entities Array of message entities
   * @deprecated Prefer to pass entities direct when send / edit message, it is available after Bot API 5.0
   * @return {string}
   */
  static formatHTML (text = '', entities = []) {
    const chars = text
    const available = [...entities]
    const opened = []
    const result = []
    for (let offset = 0; offset < chars.length; offset++) {
      while (true) {
        const index = available.findIndex((entity) => entity.offset === offset)
        if (index === -1) {
          break
        }
        const entity = available[index]
        switch (entity.type) {
          case 'bold':
            result.push('<b>')
            break
          case 'italic':
            result.push('<i>')
            break
          case 'code':
            result.push('<code>')
            break
          case 'pre':
            if (entity.language) {
              result.push(`<pre><code class="language-${entity.language}">`)
            } else {
              result.push('<pre>')
            }
            break
          case 'strikethrough':
            result.push('<s>')
            break
          case 'underline':
            result.push('<u>')
            break
          case 'text_mention':
            result.push(`<a href="tg://user?id=${entity.user.id}">`)
            break
          case 'text_link':
            result.push(`<a href="${entity.url}">`)
            break
        }
        opened.unshift(entity)
        available.splice(index, 1)
      }

      result.push(escapeHTML(chars[offset]))

      while (true) {
        const index = opened.findIndex((entity) => entity.offset + entity.length - 1 === offset)
        if (index === -1) {
          break
        }
        const entity = opened[index]
        switch (entity.type) {
          case 'bold':
            result.push('</b>')
            break
          case 'italic':
            result.push('</i>')
            break
          case 'code':
            result.push('</code>')
            break
          case 'pre':
            if (entity.language) {
              result.push('</code></pre>')
            } else {
              result.push('</pre>')
            }
            break
          case 'strikethrough':
            result.push('</s>')
            break
          case 'underline':
            result.push('</u>')
            break
          case 'text_mention':
          case 'text_link':
            result.push('</a>')
            break
        }
        opened.splice(index, 1)
      }
    }
    return result.join('')
  }
}

/**
 * Keyboard build method used by `Markup.inlineKeyboard` / `Markup.keyboard`
 * @param buttons
 * @param {keyboardOptions|inlineKeyboardOptions} [options]
 * @return {array<object[]>}
 */

function buildKeyboard (buttons, options) {
  const result = []
  if (!Array.isArray(buttons)) {
    return result
  }
  if (buttons.find(Array.isArray)) {
    return buttons.map(row => row.filter((button) => !button.hide))
  }
  const wrapFn = options.wrap
    ? options.wrap
    : (btn, index, currentRow) => currentRow.length >= options.columns
  let currentRow = []
  let index = 0
  for (const btn of buttons.filter((button) => !button.hide)) {
    if (wrapFn(btn, index, currentRow) && currentRow.length > 0) {
      result.push(currentRow)
      currentRow = []
    }
    currentRow.push(btn)
    index++
  }
  if (currentRow.length > 0) {
    result.push(currentRow)
  }
  return result
}

module.exports = Markup
