const hideSymbol = Symbol('hide')

/**
 * @module Markup
 */

const ESCAPE_LIST = {
  // https://core.telegram.org/bots/api#markdown-style
  md: ['_', '*', '`', '['],
  // https://core.telegram.org/bots/api#markdownv2-style
  md2: ['_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!'],
  // https://core.telegram.org/bots/api#html-style
  html: { '&': '&amp;', '<': '&lt;', '>': '&gt;' }
}

const htmlKeys = Object.keys(ESCAPE_LIST.html)

/** Class for building keyboard / HTML / Markdown / MarkdownV2 markup */
class Markup {
  /**
   * Escape string for HTML
   *
   * @see https://core.telegram.org/bots/api#html-style
   * @param {string} text String to escape
   * @return {string}
   */
  static escapeHTML (text) {
    text = text.toString()
    return htmlKeys.reduce(
      (prevText, charToEscape) => prevText.replaceAll(charToEscape, ESCAPE_LIST.html[charToEscape]),
      text
    )
  }

  /**
   * Escape string for Markdown V2
   *
   * @see https://core.telegram.org/bots/api#markdownv2-style
   * @param {string} text String to escape
   * @return {string}
   */
  static escapeMarkdownV2 (text) {
    text = text.toString()
    return ESCAPE_LIST.md2.reduce(
      (prevText, charToEscape) => prevText.replaceAll(charToEscape, `\\${charToEscape}`),
      text
    )
  }

  /**
   * Escape string for Markdown
   *
   * @see https://core.telegram.org/bots/api#markdown-style
   * @param {string} text String to escape
   * @return {string}
   */
  static escapeMarkdown (text) {
    text = text.toString()
    return ESCAPE_LIST.md.reduce(
      (prevText, charToEscape) => prevText.replaceAll(charToEscape, `\\${charToEscape}`),
      text
    )
  }

  /**
   * Returns build HTML given text and entities object
   *
   * @param {string} text Message text
   * @param {MessageEntity[]} entities Array of message entities
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

      result.push(Markup.escapeHTML(chars[offset]))

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

  /**
   * Adding force reply option to markup
   *
   * Upon receiving a message with this object, Telegram clients will display a
   *   reply interface to the user (act as if the user has selected the bot's
   *   message and tapped 'Reply'). This can be extremely useful if you want
   *   to create user-friendly step-by-step interfaces without having to sacrifice privacy mode.
   *
   * @see https://core.telegram.org/bots/api#forcereply
   * @param {boolean} [value=true] Value
   * @return {Markup}
   */
  forceReply (value = true) {
    this.force_reply = value
    return this
  }

  /**
   * Enable / Disable keyboard removing
   *
   * Upon receiving a message with this object, Telegram clients will remove the current custom keyboard and
   * display the default letter-keyboard. By default, custom keyboards are displayed until a new keyboard is sent by a
   * bot. An exception is made for one-time keyboards that are hidden immediately after the user presses a
   * button (see [ReplyKeyboardMarkup](https://core.telegram.org/bots/api#replykeyboardmarkup)).
   *
   * @see https://core.telegram.org/bots/api#replykeyboardremove
   * @param {boolean} [value=true] Value
   * @return {Markup}
   */
  removeKeyboard (value = true) {
    this.remove_keyboard = value
    return this
  }

  /**
   * The placeholder to be shown in the input field when the reply is active; 1-64 characters
   *
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
   * Use this parameter if you want to force reply from specific users only.
   * Targets:
   * 1) users that are `@mentioned` in the text of the Message object;
   * 2) if the bot's message is a reply (has `reply_to_message_id`), sender of the original message.
   *
   * @see https://core.telegram.org/bots/api#forcereply
   * @see https://core.telegram.org/bots/api#replykeyboardremove
   * @param {boolean} [value=true] Value
   * @return {Markup}
   */
  selective (value = true) {
    this.selective = value
    return this
  }

  /**
   * Requests clients to always show the keyboard when the regular keyboard is
   * hidden.
   *
   * Defaults to false, in which case the custom keyboard can be
   * hidden and opened with a keyboard icon.
   *
   * @see https://core.telegram.org/bots/api#replykeyboardremove
   * @param {boolean} [value=true] Value
   * @return {Markup}
   */
  persistent (value = true) {
    this.is_persistent = value
    return this
  }

  /**
   * Returns a ready object for extra parameters with given additional options, equals result to
   * `Extra.markup(markupObj)`
   *
   * ```js
   * ctx.reply('<i>Banana</i>', Markup.inlineKeyboard([
   *   Markup.callbackButton('Yes', 'yes'),
   *   Markup.callbackButton('No', 'no')
   * ]).extra({ parse_mode: 'HTML' }))
   * ```
   *
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
   * // Make fixed two columns keyboard with columns option
   * Markup.keyboard(['one', 'two', 'three', 'four'], { columns: 2 }).resize()
   * ```
   *
   * @see https://core.telegram.org/bots/api#replykeyboardmarkup
   * @param {KeyboardButton[]|KeyboardButton[][]} buttons Array of buttons
   * @param {KeyboardOptions} [options] You can pass here columns count or wrap function for slice buttons to columns
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
   * // Make one-line inline keyboard
   * Markup.inlineKeyboard([
   *   Markup.urlButton('one', 'https://example.com'),
   *   Markup.urlButton('two', 'https://example.com'),
   *   Markup.urlButton('three', 'https://example.com'),
   *   Markup.urlButton('four', 'https://example.com')
   * ])
   *
   * // Make two columns inline keyboard with custom function
   * Markup.inlineKeyboard([
   *   Markup.urlButton('one', 'https://example.com'),
   *   Markup.urlButton('two', 'https://example.com'),
   *   Markup.urlButton('three', 'https://example.com'),
   *   Markup.urlButton('four', 'https://example.com')
   *   ], {
   *     wrap: (btn, index, currentRow) => index % 2 !== 0
   *   }
   * )
   *
   * // Make fixed two columns inline keyboard with columns option
   * Markup.inlineKeyboard([
   *   Markup.urlButton('one', 'https://example.com'),
   *   Markup.urlButton('two', 'https://example.com'),
   *   Markup.urlButton('three', 'https://example.com'),
   *   Markup.urlButton('four', 'https://example.com')
   * ], { columns: 2 })
   * ```
   *
   * @see https://core.telegram.org/bots/api#inlinekeyboardmarkup
   * @param {InlineKeyboardButton[]|InlineKeyboardButton[][]} buttons Array of buttons
   * @param {InlineKeyboardOptions} options You can pass here columns count or wrap function for slice buttons to
   *   columns
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
   *
   * Requests clients to resize the keyboard vertically for optimal fit (e.g., make the keyboard smaller if there are
   * just two rows of buttons). Defaults to false, in which case the custom keyboard is always of the same
   * height as the app's standard keyboard.
   *
   * @see https://core.telegram.org/bots/api#replykeyboardmarkup
   * @param {boolean} [value=true] Value
   * @return {Markup}
   */
  resize (value = true) {
    this.resize_keyboard = value
    return this
  }

  /**
   * Enable / Disable hiding keyboard after click
   *
   * Requests clients to hide the keyboard as soon as it's been used. The keyboard will still be available, but clients
   * will automatically display the usual letter-keyboard in the
   * chat - the user can press a special button in the input field to see the custom keyboard again.
   *
   * @see https://core.telegram.org/bots/api#replykeyboardmarkup
   * @param {boolean} [value=true] Value
   * @return {Markup}
   */
  oneTime (value = true) {
    this.one_time_keyboard = value
    return this
  }

  /**
   * Adds a new text button. This button will simply send the given text as a
   * text message back to your bot if a user clicks on it. **Available for non-inline keyboard only.**
   *
   * @see https://core.telegram.org/bots/api#keyboardbutton
   * @param {string} text The text to display and send
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for
   *   hide button when build keyboard
   * @return {{ text: string }}
   */
  button (text, hide) {
    return Markup.button(text, hide)
  }

  /**
   * Adds a new contact request button. The user's phone number will be sent
   * as a contact when the button is pressed. **Available in private chats only.**
   *
   * Your bot will in turn receive location updates. You can listen
   * to contact updates like this:
   * ```js
   * bot.on('contact', ctx => { ... })
   * ```
   *
   * @see https://core.telegram.org/bots/api#keyboardbutton
   * @param {string} text The text to display
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()`
   *   for hide button when build keyboard
   * @return {{ text: string, request_contact: true }}
   */
  contactRequestButton (text, hide) {
    return Markup.contactRequestButton(text, hide)
  }

  /**
   * Adds a new location request button. The user's current location will be
   * sent when the button is pressed. **Available in private chats only.**
   *
   * Your bot will in turn receive location updates. You can listen
   * to inline query updates like this:
   * ```js
   * bot.on('location', ctx => { ... })
   * ```
   *
   * @see https://core.telegram.org/bots/api#keyboardbutton
   * @param {string} text The text to display
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()`
   *   for hide button when build keyboard
   * @return {{text: string, request_location: true }}
   */
  locationRequestButton (text, hide) {
    return Markup.locationRequestButton(text, hide)
  }

  /**
   * Adds a new poll request button. The user will be asked to create a poll
   * and send it to the bot when the button is pressed. **Available in private chats only.**
   *
   * @see https://core.telegram.org/bots/api#keyboardbutton
   * @see https://core.telegram.org/bots/api#keyboardbuttonpolltype
   * @param {string} text The text to display
   * @param {'quiz'|'regular'} [type] The type of permitted polls to create, omit if the user may send a poll of any
   *   type
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for
   *   hide button when build keyboard
   * @return {{text: string, request_poll: {type: ("quiz" | "regular")}}}
   */
  pollRequestButton (text, type, hide) {
    return Markup.pollRequestButton(text, type, hide)
  }

  /**
   * Adds a new URL button. Telegram clients will open the provided URL when
   * the button is pressed.
   *
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @param {string} text The text to display
   * @param {string} url HTTP or `tg://` URL to be opened when the button is pressed. Links `tg://user?id=<user_id>`
   *   can be used to mention a user by their ID without using a username, if this is allowed by their privacy settings.
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()`
   *   for hide button when build keyboard
   * @return {{text: string, url: string}}
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
   *
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @param {string} text The text to display
   * @param {string} data Data to be sent in a callback query to the bot when button is pressed, 1-64 bytes
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()`
   *   for hide button when build keyboard
   * @return {{text: string, callback_data: string}}
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
   *
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @param {string} text The text to display
   * @param {string} value Value
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()`
   *   for hide button when build keyboard
   * @return {{text: string, switch_inline_query: string}}
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
   *
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @param {string} text The text to display
   * @param {string} value Value
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()`
   *   for hide button when build keyboard
   * @return {{text: string, switch_inline_query_current_chat: string}}
   */
  switchToCurrentChatButton (text, value, hide) {
    return Markup.switchToCurrentChatButton(text, value, hide)
  }

  /**
   * Returns inline button that switches the current user to inline mode in a chosen chat with an optional default inline query.
   *
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @param {string} text The text to display
   * @param {string} value Query value
   * @param {SwitchInlineQueryChosenChatAllowList} allowList Object contains the list of allowed chat types to choose
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for
   *   hide button when build keyboard
   * @return {{ text: string, switch_inline_query_chosen_chat: SwitchInlineQueryChosenChat }}
   */
  switchToChosenChatButton (text, value, allowList, hide = false) {
    return Markup.switchToChosenChatButton(text, value, allowList, hide)
  }

  /**
   * Adds a new game query button
   *
   * @see https://core.telegram.org/bots/api#games
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @param {string} text The text to display
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for
   *   hide button when build keyboard
   * @return {{text: string, callback_game: object}}
   */
  gameButton (text, hide) {
    return Markup.gameButton(text, hide)
  }

  /**
   * Adds a new payment button
   *
   * @see https://core.telegram.org/bots/api#payments
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @param {string} text The text to display
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()`
   *   for hide button when build keyboard
   * @return {{text: string, pay: true}}
   */
  payButton (text, hide) {
    return Markup.payButton(text, hide)
  }

  /**
   * Adds a new login button. This can be used as a replacement for the
   * Telegram Login Widget. You must specify an HTTPS URL used to
   * automatically authorize the user.
   *
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @param {string} text Message text
   * @param {string} url An HTTPS URL to be opened with user authorization data added to the query string when the
   *   button is pressed. If the user refuses to provide authorization data, the original URL without information about
   *   the user will be opened. The data added is the same as described in Receiving authorization data.
   * @param {LoginButtonOptions} [opts] Login options
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()`
   *   for hide button when build keyboard
   * @return {{text: string, login_url: {url: string, forward_text: string, bot_username: string, request_write_access: boolean}}}
   */
  loginButton (text, url, opts, hide) {
    return Markup.loginButton(text, url, opts, hide)
  }

  /**
   *  Adds a new web app button. The Web App that will be launched when the
   *  user presses the button. The Web App will be able to send a
   *  `web_app_data` service message. Available in private chats only.
   *
   * @see https://core.telegram.org/bots/webapps
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @see https://core.telegram.org/bots/api#keyboardbutton
   * @param {string} text text to display
   * @param {string} url An HTTPS URL of a Web App to be opened with additional data
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()`
   *   for hide button when build keyboard
   * @return {{text: string, web_app: {url: string}}}
   */
  webApp (text, url, hide) {
    return Markup.webApp(text, url, hide)
  }

  /**
   * Button will open a list of suitable users. Tapping on any user will send their identifier to the bot in a
   * `user_shared` service message. Available in private chats only & non-inline keyboards
   *
   * @see https://core.telegram.org/bots/api#keyboardbuttonrequestuser
   * @param {string} text Text of the button.
   * @param {number} requestId Signed 32-bit identifier of the request, which will be received back in the
   *   [UserShared](https://core.telegram.org/bots/api#usershared) object. Must be unique within the message
   * @param {boolean} [userIsPremium] *Optional*. Pass *True* to request a bot, pass *False* to request a regular user.
   *   If not specified, no additional restrictions are applied.
   * @param {boolean} [hide] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()`
   *   for hide button when build keyboard
   * @return {UserRequestButton}
   */
  userRequest (
    text,
    requestId,
    userIsPremium,
    hide = false
  ) {
    return Markup.userRequest(text, requestId, userIsPremium, hide)
  }

  /**
   * Button will open a list of suitable bots. Tapping on any bot will send their identifier to the your bot in a
   * `user_shared` service message. Available in private chats only & non-inline keyboards
   *
   * @see https://core.telegram.org/bots/api#keyboardbuttonrequestuser
   * @param {string} text Text of the button.
   * @param {number} requestId Signed 32-bit identifier of the request, which will be received back in the
   *   [UserShared](https://core.telegram.org/bots/api#usershared) object. Must be unique within the message
   * @param {boolean} [hide] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()`
   *   for hide button when build keyboard
   * @return {BotRequestButton}
   */
  botRequest (
    text,
    requestId,
    hide = false
  ) {
    return Markup.botRequest(text, requestId, hide)
  }

  /**
   * Button will open a list of suitable groups. Tapping on any group will send their identifier to the your bot in a
   * `chat_shared` service message. Available in private chats only & non-inline keyboards
   *
   * @see https://core.telegram.org/bots/api#keyboardbuttonrequestchat
   * @param {string} text Text of the button.
   * @param {number} requestId Signed 32-bit identifier of the request, which will be received back in the
   *   [ChatShared](https://core.telegram.org/bots/api#chatshared) object. Must be unique within the message
   * @param {GroupRequestButtonExtra} [extra] Extra parameters
   * @param {boolean} [hide] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()`
   *   for hide button when build keyboard
   * @return {GroupRequestButton}
   */
  groupRequest (
    text,
    requestId,
    extra,
    hide = false
  ) {
    return Markup.groupRequest(text, requestId, extra, hide)
  }

  /**
   * Button will open a list of suitable channels. Tapping on any group will send their identifier to the your bot in a
   * `chat_shared` service message. Available in private chats only & non-inline keyboards
   *
   * @see https://core.telegram.org/bots/api#keyboardbuttonrequestchat
   * @param {string} text Text of the button.
   * @param {number} requestId Signed 32-bit identifier of the request, which will be received back in the
   *   [UserShared](https://core.telegram.org/bots/api#chatshared) object. Must be unique within the message
   * @param {ChannelRequestButtonExtra} extra Extra parameters
   * @param {boolean} [hide] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()`
   *   for hide button when build keyboard
   * @return {ChannelRequestButton}
   */
  channelRequest (
    text,
    requestId,
    extra,
    hide = false
  ) {
    return Markup.channelRequest(text, requestId, extra, hide)
  }

  /**
   * Enable / Disable keyboard removing
   *
   * @see https://core.telegram.org/bots/api#replykeyboardremove
   * @param {boolean} [value=true] Value
   * @return {Markup}
   */
  static removeKeyboard (value) {
    return new Markup().removeKeyboard(value)
  }

  /**
   * Adding force reply option to markup
   *
   * @see https://core.telegram.org/bots/api#forcereply
   * @param {boolean} [value=true] Value
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
   * // Make fixed two columns keyboard with columns option
   * Markup.keyboard(['one', 'two', 'three', 'four'], { columns: 2 }).resize()
   * ```
   *
   * @see https://core.telegram.org/bots/api#replykeyboardmarkup
   * @param {KeyboardButton[]|KeyboardButton[][]|string[]|string[][]} buttons Array of buttons
   * @param {KeyboardOptions} [options] You can pass here columns count or wrap function for slice buttons to columns
   * @return {Markup}
   */
  static keyboard (buttons, options) {
    return new Markup().keyboard(buttons, options)
  }

  /**
   * Build inline keyboard with given buttons
   *
   * ```js
   * // Make one-line inline keyboard
   * Markup.inlineKeyboard([
   *   Markup.urlButton('one', 'https://example.com'),
   *   Markup.urlButton('two', 'https://example.com'),
   *   Markup.urlButton('three', 'https://example.com'),
   *   Markup.urlButton('four', 'https://example.com')
   * ])
   *
   * // Make two columns inline keyboard with custom function
   * Markup.inlineKeyboard([
   *   Markup.urlButton('one', 'https://example.com'),
   *   Markup.urlButton('two', 'https://example.com'),
   *   Markup.urlButton('three', 'https://example.com'),
   *   Markup.urlButton('four', 'https://example.com')
   *   ], {
   *     wrap: (btn, index, currentRow) => index % 2 !== 0
   *   }
   * )
   *
   * // Make fixed two columns inline keyboard with columns option
   * Markup.inlineKeyboard([
   *   Markup.urlButton('one', 'https://example.com'),
   *   Markup.urlButton('two', 'https://example.com'),
   *   Markup.urlButton('three', 'https://example.com'),
   *   Markup.urlButton('four', 'https://example.com')
   * ], { columns: 2 })
   * ```
   *
   * @see https://core.telegram.org/bots/api#inlinekeyboardmarkup
   * @param {InlineKeyboardButton[]|InlineKeyboardButton[][]|string[]|string[][]} buttons Array of buttons
   * @param {InlineKeyboardOptions} [options] You can pass here columns count or wrap function for slice
   *   buttons to columns
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
   *
   * @see https://core.telegram.org/bots/api#replykeyboardmarkup
   * @param {boolean} [value=true] Value
   * @return {Markup}
   */
  static resize (value = true) {
    return new Markup().resize(value)
  }

  /**
   * Changing input field placeholder when reply is active, used with forceReply
   *
   * @see https://core.telegram.org/bots/api#forcereply
   * @param {string} placeholder Placeholder text
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
   *
   * @see https://core.telegram.org/bots/api#forcereply
   * @see https://core.telegram.org/bots/api#replykeyboardremove
   * @param {boolean} [value=true] Value
   * @return {Markup}
   */
  static selective (value = true) {
    return new Markup().selective(value)
  }

  /**
   * Enable / Disable hiding keyboard after click
   *
   * @see https://core.telegram.org/bots/api#replykeyboardmarkup
   * @param {boolean} [value=true] Value
   * @return {Markup}
   */
  static oneTime (value = true) {
    return new Markup().oneTime(value)
  }

  /**
   * Adds a new text button. This button will simply send the given text as a
   * text message back to your bot if a user clicks on it. Available for non-inline keyboard only.
   *
   * @see https://core.telegram.org/bots/api#keyboardbutton
   * @param {string} text The text to display and send
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for
   *   hide button when build keyboard
   * @return {{ text: string }}
   */
  static button (text, hide = false) {
    return { text, [hideSymbol]: hide }
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
   *
   * @see https://core.telegram.org/bots/api#keyboardbutton
   * @param {string} text The text to display
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()`
   *   for hide button when build keyboard
   * @return {{ text: string, request_contact: true}}
   */
  static contactRequestButton (text, hide = false) {
    return { text, request_contact: true, [hideSymbol]: hide }
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
   *
   * @see https://core.telegram.org/bots/api#keyboardbutton
   * @param {string} text The text to display
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for
   *   hide button when build keyboard
   * @return {{ text: string, request_location: true }}
   */
  static locationRequestButton (text, hide = false) {
    return { text, request_location: true, [hideSymbol]: hide }
  }

  /**
   * Adds a new poll request button. The user will be asked to create a poll
   * and send it to the bot when the button is pressed. Available in private
   * chats only.
   *
   * @see https://core.telegram.org/bots/api#keyboardbutton
   * @see https://core.telegram.org/bots/api#keyboardbuttonpolltype
   * @param {string} text The text to display
   * @param {'quiz'|'regular'} [type] The type of permitted polls to create, omit if the user may send a poll of any
   *   type
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for
   *   hide button when build keyboard
   * @return {{ text: string, request_poll: { type: 'quiz'|'regular' } }}
   */
  static pollRequestButton (text, type, hide = false) {
    return { text, request_poll: { type }, [hideSymbol]: hide }
  }

  /**
   * Adds a new URL button. Telegram clients will open the provided URL when
   * the button is pressed.
   *
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @param {string} text The text to display
   * @param {string} url HTTP or `tg://` URL to be opened when the button is pressed. Links `tg://user?id=<user_id>`
   *   can be used to mention a user by their ID without using a username, if this is allowed by their privacy settings.
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for
   *   hide button when build keyboard
   * @return {{ text: string, url: string }}
   */
  static urlButton (text, url, hide = false) {
    return { text, url, [hideSymbol]: hide }
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
   *
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @param {string} text The text to display
   * @param {string} data Data to be sent in a callback query to the bot when button is pressed, 1-64 bytes
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for
   *   hide button when build keyboard
   * @return {{ text: string, callback_data: string }}
   */
  static callbackButton (text, data, hide = false) {
    return { text, callback_data: data, [hideSymbol]: hide }
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
   *
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @param {string} text The text to display
   * @param {string} value Value
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for
   *   hide button when build keyboard
   * @return {{ text: string, switch_inline_query: string }}
   */
  static switchToChatButton (text, value, hide = false) {
    return { text, switch_inline_query: value, [hideSymbol]: hide }
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
   *
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @param {string} text The text to display
   * @param {string} value Value
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for
   *   hide button when build keyboard
   * @return {{ text: string, switch_inline_query_current_chat: string }}
   */
  static switchToCurrentChatButton (text, value, hide = false) {
    return { text, switch_inline_query_current_chat: value, [hideSymbol]: hide }
  }

  /**
   * This object represents an inline button that switches the current user to inline mode in a chosen
   * chat, with an optional default inline query.
   *
   * @typedef {object} SwitchInlineQueryChosenChatAllowList
   * @property {boolean} [allow_user_chats] *Optional*. True, if private chats with users can be chosen
   * @property {boolean} [allow_bot_chats] *Optional*. True, if private chats with bots can be chosen
   * @property {boolean} [allow_group_chats] *Optional*. True, if group and supergroup chats can be chosen
   * @property {boolean} [allow_channel_chats] *Optional*. True, if channel chats can be chosen
   * @see https://core.telegram.org/bots/api/#switchinlinequerychosenchat
   */

  /**
   * Returns inline button that switches the current user to inline mode in a chosen chat with an optional default inline query.
   *
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @param {string} text The text to display
   * @param {string} value Query value
   * @param {SwitchInlineQueryChosenChatAllowList} allowList Object contains the list of allowed chat types to choose
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for
   *   hide button when build keyboard
   * @return {{ text: string, switch_inline_query_chosen_chat: SwitchInlineQueryChosenChat }}
   */
  static switchToChosenChatButton (text, value, allowList, hide = false) {
    return { text, switch_inline_query_chosen_chat: { query: value, ...allowList }, [hideSymbol]: hide }
  }

  /**
   * Adds a new game query button
   *
   * @see https://core.telegram.org/bots/api#games
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @param {string} text The text to display
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for
   *   hide button when build keyboard
   * @return {{ text: string, callback_game: object }}
   */
  static gameButton (text, hide = false) {
    return { text, callback_game: {}, [hideSymbol]: hide }
  }

  /**
   * Adds a new payment button
   *
   * @see https://core.telegram.org/bots/api#payments
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @param {string} text The text to display
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for
   *   hide button when build keyboard
   * @return {{ text: string, pay: true }}
   */
  static payButton (text, hide = false) {
    return { text, pay: true, [hideSymbol]: hide }
  }

  /**
   * Adds a new login button. This can be used as a replacement for the
   * Telegram Login Widget. You must specify an HTTPS URL used to
   * automatically authorize the user.
   *
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @param {string} text Button text
   * @param {string} url An HTTPS URL to be opened with user authorization data added to the query string when the
   *   button is pressed. If the user refuses to provide authorization data, the original URL without information about
   *   the user will be opened. The data added is the same as described in Receiving authorization data.
   * @param {LoginButtonOptions} [opts] Options
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for
   *   hide button when build keyboard
   * @return {{
   *   text: string,
   *   login_url: {
   *     url: string,
   *     forward_text: string,
   *     bot_username: string,
   *     request_write_access: boolean
   *   }
   * }}
   */
  static loginButton (text, url, opts = {}, hide = false) {
    return {
      text,
      login_url: { ...opts, url },
      [hideSymbol]: hide
    }
  }

  /**
   *  Adds a new web app button. The Web App that will be launched when the
   *  user presses the button. The Web App will be able to send a
   *  `web_app_data` service message. Available in private chats only.
   *
   * @see https://core.telegram.org/bots/webapps
   * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
   * @see https://core.telegram.org/bots/api#keyboardbutton
   * @param {string} text Text to display
   * @param {string} url An HTTPS URL of a Web App to be opened with additional data
   * @param {boolean} [hide=false] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()` for
   *   hide button when build keyboard
   * @return {{ text: string, web_app: { url: string } }}
   */
  static webApp (text, url, hide = false) {
    return {
      text,
      web_app: { url },
      [hideSymbol]: hide
    }
  }

  /**
   * @typedef {object} UserRequestButtonParams
   * @property {number} request_id Signed 32-bit identifier of the request, which will be received back in the
   *   [UserShared](https://core.telegram.org/bots/api#usershared) object. Must be unique within the message
   * @property {boolean} [user_is_premium] *Optional*. Pass *True* to request a bot, pass *False* to request a regular user.
   *   If not specified, no additional restrictions are applied.
   */

  /**
   * @typedef {object} UserRequestButton
   * @property {string} text Text of the button.
   * @property {UserRequestButtonParams} request_user Button params object
   */

  /**
   * Button will open a list of suitable users. Tapping on any user will send their identifier to the bot in a
   * `user_shared` service message. Available in private chats only & non-inline keyboards
   *
   * @see https://core.telegram.org/bots/api#keyboardbuttonrequestuser
   * @param {string} text Text of the button.
   * @param {number} requestId Signed 32-bit identifier of the request, which will be received back in the
   *   [UserShared](https://core.telegram.org/bots/api#usershared) object. Must be unique within the message
   * @param {boolean} [userIsPremium] *Optional*. Pass *True* to request a bot, pass *False* to request a regular user.
   *   If not specified, no additional restrictions are applied.
   * @param {boolean} [hide] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()`
   *   for hide button when build keyboard
   * @return {UserRequestButton}
   */
  static userRequest (
    text,
    requestId,
    userIsPremium,
    hide = false
  ) {
    return { text, request_user: { request_id: requestId, user_is_premium: userIsPremium }, [hideSymbol]: hide }
  }

  /**
   * @typedef {object} BotRequestButtonParams
   * @property {number} request_id Signed 32-bit identifier of the request, which will be received back in the
   *   [UserShared](https://core.telegram.org/bots/api#usershared) object. Must be unique within the message
   * @property {boolean} [user_is_bot] *Optional*. Pass *True* to request a bot, pass *False* to request a regular
   *   user. If not specified, no additional restrictions are applied.
   */

  /**
   * @typedef {object} BotRequestButton
   * @property {string} text Text of the button.
   * @property {BotRequestButtonParams} request_user Button params object
   */

  /**
   * Button will open a list of suitable bots. Tapping on any bot will send their identifier to the your bot in a
   * `user_shared` service message. Available in private chats only & non-inline keyboards
   *
   * @see https://core.telegram.org/bots/api#keyboardbuttonrequestuser
   * @param {string} text Text of the button.
   * @param {number} requestId Signed 32-bit identifier of the request, which will be received back in the
   *   [UserShared](https://core.telegram.org/bots/api#usershared) object. Must be unique within the message
   * @param {boolean} [hide] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()`
   *   for hide button when build keyboard
   * @return {BotRequestButton}
   */
  static botRequest (
    text,
    requestId,
    hide = false
  ) {
    return { text, request_user: { request_id: requestId, user_is_bot: true }, [hideSymbol]: hide }
  }

  /**
   * @typedef {object} GroupRequestButtonParams
   * @property {number} request_id Signed 32-bit identifier of the request, which will be received back in the
   *   [ChatShared](https://core.telegram.org/bots/api#chatshared) object. Must be unique within the message
   * @property {boolean} [chat_is_channel=false] Select group `True`
   * @property {boolean} [chat_is_forum] *Optional*. *True* to request a forum supergroup, *False* to request an
   *   offline chat.
   * @property {boolean} [chat_has_username] *Optional*. *True* for request a supergroup or a channel with a username,
   *   *False* for request a chat without a username.
   * @property {boolean} [chat_is_created] *Optional*. *True* for request a chat owned by the user.
   * @property {ChatAdministratorRights} [user_administrator_rights] *Optional*. A JSON-serialized object listing the
   *   required administrator rights of the user in the chat. The rights must be a superset of
   *   *bot_administrator_rights*.
   * @property {ChatAdministratorRights} [bot_administrator_rights] Optional. A JSON-serialized object listing the
   *   required administrator rights of the bot in the chat. The rights must be a subset of `user_administrator_rights`.
   * @property {boolean} [bot_is_member] *Optional*. Pass *True* to request a chat with the bot as a member.
   */

  /**
   * @typedef {object} GroupRequestButton
   * @property {string} text Text of the button.
   * @property {GroupRequestButtonParams} request_chat Button params object
   */

  /**
   * @typedef {object} GroupRequestButtonExtra
   * @property {boolean} [chat_is_forum] *Optional*. Pass *True* to request a forum supergroup, pass *False* to request
   *   a non-forum chat. If not specified, no additional restrictions are applied.
   * @property {boolean} [chat_has_username] *Optional*. Pass *True* to request a supergroup or a channel with
   *   a username, pass *False* to request a chat without a username. If not specified, no additional restrictions are applied.
   * @property {boolean} [chat_is_created] *Optional*. Pass *True* to request a chat owned by the user.
   *   Otherwise, no additional restrictions are applied.
   * @property {ChatAdministratorRights} [user_administrator_rights] *Optional*. A JSON-serialized object listing the
   *   required administrator rights of the user in the chat. The rights must be a superset of
   *   *bot_administrator_rights*.
   *   If not specified, no additional restrictions are applied.
   * @property {ChatAdministratorRights} [bot_administrator_rights] Optional. A JSON-serialized object listing the
   *   required administrator rights of the bot in the chat. The rights must be a subset of `user_administrator_rights`.
   *   If not specified, no additional restrictions are applied.
   * @property {boolean} [bot_is_member] *Optional*. Pass *True* to request a chat with the bot as a member.
   *   Otherwise, no additional restrictions are applied.
   */

  /**
   * Button will open a list of suitable groups. Tapping on any group will send their identifier to the your bot in a
   * `chat_shared` service message. Available in private chats only & non-inline keyboards
   *
   * @see https://core.telegram.org/bots/api#keyboardbuttonrequestchat
   * @param {string} text Text of the button.
   * @param {number} requestId Signed 32-bit identifier of the request, which will be received back in the
   *   [ChatShared](https://core.telegram.org/bots/api#chatshared) object. Must be unique within the message
   * @param {GroupRequestButtonExtra} [extra] Extra parameters
   * @param {boolean} [hide] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()`
   *   for hide button when build keyboard
   * @return {GroupRequestButton}
   */
  static groupRequest (
    text,
    requestId,
    extra,
    hide = false
  ) {
    return {
      text,
      request_chat: { request_id: requestId, chat_is_channel: false, ...extra },
      [hideSymbol]: hide
    }
  }

  /**
   * @typedef {object} ChannelRequestButtonParams
   * @property {number} request_id Signed 32-bit identifier of the request, which will be received back in the
   *   [ChatShared](https://core.telegram.org/bots/api#chatshared) object. Must be unique within the message
   * @property {boolean} [chat_is_channel=true] Select channel `True`
   * @property {boolean} [chat_has_username] *Optional*. *True* for request a supergroup or a channel with a username,
   *   *False* for request a chat without a username.
   * @property {boolean} [chat_is_created] *Optional*. *True* for request a channel owned by the user.
   * @property {ChatAdministratorRights} [user_administrator_rights] *Optional*. A JSON-serialized object listing the
   *   required administrator rights of the user in the chat. The rights must be a superset of
   *   *bot_administrator_rights*.
   * @property {ChatAdministratorRights} [bot_administrator_rights] Optional. A JSON-serialized object listing the
   *   required administrator rights of the bot in the chat. The rights must be a subset of `user_administrator_rights`.
   * @property {boolean} [bot_is_member] *Optional*. Pass *True* to request a chat with the bot as a member.
   */

  /**
   * @typedef {object} ChannelRequestButton
   * @property {string} text Text of the button.
   * @property {GroupRequestButtonParams} request_chat Button params object
   */

  /**
   * @typedef {object} ChannelRequestButtonExtra
   * @property {boolean} [chat_has_username] *Optional*. Pass *True* to request a supergroup or a channel with
   *   a username, pass *False* to request a chat without a username. If not specified, no additional restrictions are applied.
   * @property {boolean} [chat_is_created] *Optional*. Pass *True* to request a channel owned by the user.
   *   Otherwise, no additional restrictions are applied.
   * @property {ChatAdministratorRights} [user_administrator_rights] *Optional*. A JSON-serialized object listing the
   *   required administrator rights of the user in the chat. The rights must be a superset of
   *   *bot_administrator_rights*.
   *   If not specified, no additional restrictions are applied.
   * @property {ChatAdministratorRights} [bot_administrator_rights] Optional. A JSON-serialized object listing the
   *   required administrator rights of the bot in the chat. The rights must be a subset of `user_administrator_rights`.
   *   If not specified, no additional restrictions are applied.
   * @property {boolean} [bot_is_member] *Optional*. Pass *True* to request a chat with the bot as a member.
   *   Otherwise, no additional restrictions are applied.
   */

  /**
   * Button will open a list of suitable channels. Tapping on any channel will send their identifier to the your bot in a
   * `chat_shared` service message. Available in private chats only & non-inline keyboards
   *
   * @param {string} text Text of the button.
   * @param {number} requestId Signed 32-bit identifier of the request, which will be received back in the
   *   [ChatShared](https://core.telegram.org/bots/api#chatshared) object. Must be unique within the message
   * @param {ChannelRequestButtonExtra} [extra] Extra parameters
   * @param {boolean} [hide] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()`
   *   for hide button when build keyboard
   * @return {GroupRequestButton}
   */

  /**
   * Button will open a list of suitable channels. Tapping on any group will send their identifier to the your bot in a
   * `chat_shared` service message. Available in private chats only & non-inline keyboards
   *
   * @see https://core.telegram.org/bots/api#keyboardbuttonrequestchat
   * @param {string} text Text of the button.
   * @param {number} requestId Signed 32-bit identifier of the request, which will be received back in the
   *   [UserShared](https://core.telegram.org/bots/api#chatshared) object. Must be unique within the message
   * @param {ChannelRequestButtonExtra} extra Extra parameters
   * @param {boolean} [hide] Used by `Markup.inlineKeyboard` / `Markup.keyboard` / `Markup.buildKeyboard()`
   *   for hide button when build keyboard
   * @return {ChannelRequestButton}
   */
  static channelRequest (
    text,
    requestId,
    extra,
    hide = false
  ) {
    return {
      text,
      request_chat: { request_id: requestId, chat_is_channel: true, ...extra },
      [hideSymbol]: hide
    }
  }
}

/**
 * Keyboard build method used by `Markup.inlineKeyboard` / `Markup.keyboard`
 *
 * @param {InlineKeyboardButton[]|InlineKeyboardButton[][]|KeyboardButton[]|KeyboardButton[][]} buttons
 * @param {KeyboardOptions|InlineKeyboardOptions} [options]
 * @return {InlineKeyboardButton[][]|KeyboardButton[][]}
 */

function buildKeyboard (buttons, options) {
  const result = []
  if (!Array.isArray(buttons)) {
    return result
  }
  if (buttons.find(Array.isArray)) {
    return buttons.map(row => row.filter((button) => !button[hideSymbol]))
  }
  const wrapFn = options.wrap
    ? options.wrap
    : (btn, index, currentRow) => currentRow.length >= options.columns
  let currentRow = []
  let index = 0
  for (const btn of buttons.filter((button) => !button[hideSymbol])) {
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

/**
 * @callback TagEscapeFunction
 * @param {TemplateStringsArray} template
 * @param {...string} substitutions
 * @returns {string}
 */

/**
 * @callback EscapeFunction
 * @param {string} text
 * @returns {string}
 */

/**
 * @private
 * @param {EscapeFunction} escape Escape function
 * @private
 * @returns {TagEscapeFunction} Returns tag escape function
 */
function escapeFactory (escape) {
  return (template, ...substitutions) =>
    String.raw(
      template,
      ...substitutions.map((substitution) =>
        escape(
          String(substitution ?? (substitution === null ? 'null' : 'undefined'))
        )
      )
    )
}

Markup.HTML = escapeFactory(Markup.escapeHTML)
Markup.mdv2 = escapeFactory(Markup.escapeMarkdownV2)
Markup.md = escapeFactory(Markup.escapeMarkdown)

module.exports = { Markup, hideSymbol }
