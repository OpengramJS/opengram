
# Changelog

# Opengram 0.3.1

* 🤖 Bots API version increased from 6.6 to 6.7
*   <details>
     <summary><b>⚠️ BREAKING</b> <code>handlerTimeout</code> behavior changed</summary>

     Previously in **Opengram 0.1.0 - 0.2.0-beta.1**, was added `TimeoutError`, which throwed if middleware chain executes
     more then `handlerTimeout`.

     From now, **Opengram** by default wait only 2000 ms before get new updates via polling or close webhook connectionю
    
     After **Opengram 0.3.0** handler timeout can be configured in 3 modes:
     ```js
     // For webhook closes webhook connection immedialtely
     // For polling - doesn't wait for updates processing and get new updates immediately
     const bot = new Opengram('...', { handlerTimeout: 0 })
    
     // For webhook - waits N milliseconds and closes connection
     // For polling - waits N milliseconds and get new updates if prev not processed completely
     const bot = new Opengram('...', { handlerTimeout: 2000 })
    
     // For webhook - waits for full update processing (but not recommened, because telegram repeat update after some timeout)
     // For polling - waits and get new updates only if all prev processed completely
     const bot = new Opengram('...', { handlerTimeout: Infinity })
     ```
    > ⚠️⚠️⚠️ **If you run your bot on serverless, you need to specify timeout in milliseconds or pass `Infinity` to prevent stopping code execution after closing webhook connection**
    </details>
*   <details>
     <summary><b>⚠️ BREAKING</b> <code>ctx.botInfo</code> now not available, use <code>ctx.me</code> (for context) and <code>bot.username</code> (for bot instance) to get bot username</summary>

     `getMe` called for every update, if `bot.username` not exists.

      If you use `bot.handleUpdate(s)`, set `bot.username` or pass `username` into `Opengram` constructor options, to prevent many `getMe` calls and problems with API Limits, example:

      ```javascript
      const bot = new Opengram(token, { username: 'botusername' }) // Via Opengram options
      bot.username = 'botusername' // Via username setter
      // ...
      bot.handleUpdate(...)
      // ...
      ```

    </details>

*   <details>
      <summary>❌ Add exception classes for common bot API errors.</summary>

      Now you can check what error occurred, **Opengram** provides ~82 classes for Bots API exceptions, which
      extends from common base exception types:
      * `BadRequest` - **HTTP 400**
      * `ConflictError` **HTTP 409**
      * `ForbiddenError` - **HTTP 403**

      Every basic exception class extends `TelegramError` class.

      For example, if you want to check is `sendMessage` returns error like this:

      ```js
      {
        response: {
          ok: false,
          error_code: 403,
          description: 'Forbidden: bot was blocked by the user'
        }
      }
      ```
      You can use:

      ```js
      const { TelegramError, Exceptions: { BotBlocked, ForbiddenError } } = require('opengram')

      try {
        await ctx.telegram.sendMessage(...)
      } catch (err) {
        console.log(err instanceof TelegramError) // true
        console.log(err instanceof ForbiddenError) // true
        console.log(err instanceof BotBlocked) // true
      }
      ```

      All unknown errors that don't match the http code or don't have a class can be checked as `TelegramError`:

      ```js
      bot.catch((err, ctx) => {
        if (err instanceof TelegramError) {
          console.log('Telegram returns error: ', err)
          return
        }

        throw err // throw unknown errors 
      })
      ```
    </details>

*   <details>
      <summary>📝 Added escape methods for <b>Markdown</b>, <b>MarkdownV2</b>, <b>HTML</b> to <code>Markup</code> class</summary>

    Now you can use this methods for escaping user input data and etc, example:
      ```js
      const { Markup, Markup: { HTML, md, mdv2} } = require('opengram')

      //...
      // Using methods
      bot.on('message', ctx => ctx.reply('<b>User name:</b>: ' + Markup.escapeHTML(ctx.from.first_name)))
      bot.on('message', ctx => ctx.reply('*User name:*: ' + Markup.escapeMarkdownV2(ctx.from.first_name)))
      bot.on('message', ctx => ctx.reply('*User name:*: ' + Markup.escapeMarkdown(ctx.from.first_name)))

      // Using template strings
      bot.on('message', ctx => ctx.reply(HTML`<b>User name:</b>: ${ctx.from.first_name}`))
      bot.on('message', ctx => ctx.reply(md`*User name:*: ${ctx.from.first_name}`))
      bot.on('message', ctx => ctx.reply(mdv2`*User name:*: ${ctx.from.first_name}`))
      ```

      </details>
---

# Opengram 0.1.0 - 0.2.0-beta.1

#### Bots API (5.0-6.6)


##### 5.0

*   Added extra parameter's argument for `deleteWebhook`
*   <b>⚠️ BREAKING</b> Changed <code>setWebhook</code> method arguments

```javascript
// Previously the syntax was
setWebhook (url, certificate, maxConnections, allowedUpdates)
//Now: (check docs for more info)
setWebhook (webhookOptions, extra)
```

*   Added `dropPendingUpdates` , `ip_address` options for `Opengram#launch` method.
*   Added extra parameter's argument for `unbanChatMember`, `unbanChatMember`, `editMessageLiveLocation`
*   Added method `unpinAllChatMessages`

<details>
  <summary>5.1</summary>

  *   Added support for `my_chat_member`, `chat_member`, `message_auto_delete_timer_changed`, `voice_chat_started`, `voice_chat_ended`, `voice_chat_participants_invited` events
  *   Added `createChatInviteLink`, `editChatInviteLink`, `revokeChatInviteLink` methods
  *   Added `myChatMember`, `chatMember` getters for Context
</details>

<details>
  <summary>5.2</summary>

  *   Added support for `voice_chat_participants_invited`, `voice_chat_scheduled` event
</details>

<details>
  <summary>5.3</summary>

  *   Added `inputFieldPlaceholder` for Markup class
  *   `deleteMyCommands`, `banChatMember`(`kickChatMember` marked as deprecated), `getChatMemberCount` (`getChatMembersCount` marked ad deprecated)
  *   Added extra parameter's argument for `setMyCommands`, `getMyCommands`
</details>

<details>
  <summary>5.4</summary>

  *   Added support for `chat_join_request` event
  *   Added `chatJoinRequest` getter for Context
  *   Added `approveChatJoinRequest`, `declineChatJoinRequest` methods
</details>

<details>
  <summary>5.5</summary>

  *   Added `banChatSenderChat`, `unbanChatSenderChat` method
  *   Added support for `spoiler` entity
</details>

<details>
  <summary>5.6</summary>

  *   Added the parameter protect_content to the methods `sendMessage`, `sendPhoto`, `sendVideo`, `sendAnimation`, `sendAudio`,
    `sendDocument`, `sendSticker`, `sendVideoNote`, `sendVoice`, `sendLocation`, `sendVenue`, `sendContact`, `sendPoll`,
    `sendDice`, `sendInvoice`, `sendGame`, `sendMediaGroup`, `copyMessage`, `forwardMessage`, `reply`, `replyWithHTML`,
    `replyWithMarkdown`, `replyWithMarkdownV2` to allow sending messages with protected content to any chat.
  *   Added support for spoiler entities
</details>

<details>
  <summary>5.7</summary>

  *   Added the parameter webm_sticker to the methods `createNewStickerSet` and `addStickerToSet`.
</details>

<details>
  <summary>6.0</summary>

  *   Added web app button for keyboard & inline-keyboard
  *   Added `answerWebAppQuery` for sending an answer to a Web App query, which originated from an inline button of the 'web_app' type.
  *   Added event `web_app_data`
  *   Added methods `setChatMenuButton` and `getChatMenuButton` for managing the behavior of the bots menu button in private chats.
  *   Added methods `setMyDefaultAdministratorRights` and `getMyDefaultAdministratorRights` for managing the bots default administrator rights.
  *   Added support for t.me links that can be used to add the bot to groups and channels as an administrator.
</details>

<details>
  <summary>6.1</summary>

  *   Added the method `createInvoiceLink` to generate an HTTP link for an invoice.
  *   Added `secret_token` support for webhooks.
</details>

<details>
  <summary>6.2</summary>

  *   Added support for `custom_emoji` message entity
  *   Added the method `getCustomEmojiStickers`.
</details>

<details>
  <summary>6.3</summary>

  *   Added auto reference `message_thread_id` for context methods `reply`, `replyWithPhoto`, `replyWithMediaGroup`,
    `replyWithAudio`, `replyWithDice`, `replyWithDocument`, `replyWithSticker`, `replyWithVideo`, `replyWithAnimation`,
    `replyWithVideoNote`, `replyWithInvoice`, `replyWithGame`, `replyWithVoice`, `replyWithPoll`, `replyWithQuiz`,
    `replyWithChatAction`, `replyWithLocation`, `replyWithVenue`, `replyWithContact`
  * Added the methods `createForumTopic`, `editForumTopic`, `closeForumTopic`, `reopenForumTopic`, `deleteForumTopic`,
  `unpinAllForumTopicMessages`, and `getForumTopicIconStickers` for forum topic management.
</details>

<details>
  <summary>6.4</summary>

  *   Added auto reference `message_thread_id` for context method `sendChatAction`
</details>

<details>
  <summary>6.5</summary>

  *   Added keyboard buttons `userRequest`, `botRequest`, `groupRequest`, `channelRequest`
</details>

<details>
  <summary>6.6</summary>

  *   Added methods `setMyDescription`, `getMyDescription`, `setMyShortDescription`, `getMyShortDescription`

  *   Added the method setCustomEmojiStickerSetThumbnail for editing the thumbnail of custom emoji sticker sets created by the bot.
  *   Added the method setStickerSetTitle for editing the title of sticker sets created by the bot.
  *   Added the method deleteStickerSet for complete deletion of a given sticker set that was created by the bot.
  *   Added the method setStickerEmojiList for changing the list of emoji associated with a sticker.
  *   Added the method setStickerKeywords for changing the search keywords assigned to a sticker.
  *   Added the method setStickerMaskPosition for changing the mask position of a mask sticker.
  *   Added `setStickerSetThumbnail`, `setStickerSetThumb` now **deprecated**
</details>

#### Other

#### 2.3.1

Added `max_connections` for `Opengram#launch`

#### 4.5

Added `MarkdownV2` support for `Extra`

#### Opengram

<b>⚠️ BREAKING</b>

Now `ctx.botInfo` **required**. **(⚠️ `ctx.botInfo` removed in Opengram 0.3.0 check changelog)**

Previously `ctx.botInfo` / `ctx.me` only was available when a bot started with `Opengram.launch()` or when you passed a bot username in `Opengram` options. 

Now `getMe` called for every update, if `ctx.botInfo` not exists.

If you use `bot.handleUpdate(s)`, you should add Opengram.botInfo data, to prevent many calls `getMe` and problems with API Limits, example:
```javascript
const bot = new Opengram(token, {})
bot.context.botInfo = { username: 'mybot' }
// ...
bot.handleUpdate(...)
// ...
```
---

**⚠️ BREAKING**

Fully remove support for passing keyboard directly to extra parameters, it was not fully removed for `editMessageCaption`, `editMessageMedia`, but removed for others in Telegraf 3.38, now it is not available:

```js
// Before that, you could do this
ctx.editMessageCaption(
  'Forgetting is like a wound. The wound may heal, but it has already left a - scar.',
  Markup.inlinekeybaord(...)
)

// Now only:
ctx.editMessageCaption(
  'Forgetting is like a wound. The wound may heal, but it has already left a - scar.',
  Markup.inlinekeybaord(...).extra()
)

// Or

ctx.editMessageCaption(
  'Forgetting is like a wound. The wound may heal, but it has already left a - scar.',
  Extra.markup(Markup.inlinekeybaord(...))
)
```

---

*   Added `entities`, `captionEntities` methods for adding entities with `Extra`
*   Added enter middleware for Wizard scenes, now you can use `scene.enter(ctx => ...)` like in **Base** scenes
*   Fixed `formatHTML` with emoji
*   Fixed `formatHTML` to work with HTML-reserved characters
*   Fix `telegram.getFileLink` with local bot API instances
*   **⚠️ BREAKING** Webhook methods blacklist replaced with a whitelist
*   Fixed infinity recursion in scenes. For example:

```javascript
// Enter calling leave, and it's emit new leave event and get into recursion
scene.leave(ctx => ctx.scene.enter('name'))
```

---

Rewrite <code>handlerTimeout</code>. **(⚠️ `handlerTimeout` behavior changed, `TimeoutError` removed in Opengram 0.3.0 check changelog)**

Now `TimeoutError` an error thrown when timeout. Previously, when a timeout, when the timeout expired, long-polling doesn't await processing all updates and gets new updates. `handlerTimeout` is part of long-polling backpressure, when your handler processed very long time it's **very bad**. For webhook, **it can create some problems with webhook reply** and etc. It was decided to toughen up this design to **avoid bigger problems.** **However, of course, you can handle this error in** `bot.catch` **like any other.**

---

*   Added test environment support, see [Bots API 6.0 changes](https://core.telegram.org/bots/webapps#using-bots-in-the-test-environment) for mare information
*   Added `apiPrefix` option for using with [TDLight](https://github.com/tdlight-team/tdlight)
*   Fixed `stopCallback` calling twice, in some cases it was being called twice
*   **⚠️ BREAKING** Changed default webhook path `/telegraf/...` to `/opengram/...`
*   Fixed error swallowing when starting the bot. Sometimes, when `Opengram.launch()` calls the API method and gets an error, it was displayed in the console, and the bot would freeze, it would not receive an update, was not really launched and did not crash - "Bot started, but not answers to events" Commit for more info - 90c2012
*   Fixed `Composer.match` for channel updates. Now `Composer::hears`, `Composer::action`, `Composer::inlineQuery` works for channels too
*   Added `TelegramError` export
*   Added redact for hide token from error messages
*   Fixed `startPayload` for commands with username
*   Wizard Scenes now extends `BaseScene`
*   Added `Scenes` object to exports
*   Added `isTelegramError` and exported
*   Added `Composer.customEmoji`
*   Added `anyMessage`, `anyText`, `anyEntities` getters in OpengramContext
*   Added warning when accessing session object after save
*   Added warning accessing session object when session key not available

#### General
*   JSDoc annotated code
*   Update to Bot API 6.6
*   Added support for cancelling requests via `AbortSignal` in `Telegram.callApi()` / `Context` & `Telegram` methods
*   Add `attachmentAgent` option to provide an agent that is used for fetching files from the web before they are sent to Telegram (previously done through the same `agent` as used to connect to Telegram itself)
*   Sessions rewrote and refactored
*   Increased tests coverage
*   Code / performance improvements
*   Fixed a lot of bugs
