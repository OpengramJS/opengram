<header>
<img src="https://raw.githubusercontent.com/OpengramJS/opengram/master/docs/media/Logo.svg" alt="logo" height="90" align="left">
<h1 style="display: inline">Opengram</h1>

Telegram Bot API framework for Node.js based on **Telegraf 3.38**

[![Bot API Version][bots-api-image]][bots-api-url] [![CI][ci-image]][ci-url] [![codecov][codecov-image]][codecov-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![javascript style guide][standard-image]][standard-url] [![Codacy Badge][codacy-image]][codacy-url] [![License: MIT][license-image]][license-url] [![FOSSA Status][fossa-image]][fossa-url]
</header>

# Introduction

Bots are special Telegram accounts designed to handle messages automatically. Users can interact with bots by sending them command messages in private or group chats. These accounts serve as an interface for code running somewhere on your server.

**Opengram** is a library that makes it simple for you to develop your own Telegram bots using JavaScript.

## Features
-   Full Telegram Bot API 6.7 support
-   JSDoc annotated
-   Lightweight
-   [AWS λ](https://aws.amazon.com/en/lambda/) / [Firebase](https://firebase.google.com/) / [Glitch](https://glitch.com/) / [Fly.io](https://fly.io/) / [Deta space](https://deta.space/) / Whatever ready
-   [http](https://nodejs.org/api/http.html) / [https](https://nodejs.org/api/https.html) / [fastify](https://www.fastify.io/) / [Connect.js](https://github.com/senchalabs/connect) / [express.js](https://expressjs.com/) compatible webhooks
-   Extensible

## Quickstart

> If you are new to Telegram bots, read the official [Introduction for Developers](https://core.telegram.org/bots) written by the Telegram team.

-   Visit @BotFather and create a new bot. You will obtain a bot token.
-   Install opengram:
      - pnpm: `pnpm install opengram`
      - yarn: `yarn add opengram`
      - npm: `npm i opengram`
-   Create `bot.js` file and paste code
    ```js
    const { Opengram, isTelegramError } = require('opengram')
    
    if (process.env.BOT_TOKEN === undefined) {
      throw new TypeError('BOT_TOKEN must be provided!')
    }
    
    // Create Opengram instance with BOT TOKEN given by http://t.me/BotFather
    const bot = new Opengram(process.env.BOT_TOKEN)
    
    // Add handler for text messages
    bot.on('text', async ctx => {
      await ctx.reply(ctx.message.text)
    })
    
    // Register error handler, for preventing bot crashes
    bot.catch((error, ctx) => {
      if (isTelegramError(error)) {
        console.error(error, ctx) // Print error and context
        return
      }
      throw error
    })
    
    // Start bot using long-polling
    bot.launch()
      .then(() => console.log(`Bot started`))
    
    // Enable graceful stop
    process.once('SIGINT', () => bot.stop())
    process.once('SIGTERM', () => bot.stop())
    ```
-   Run `node bot.js`
-   Congrats! You just wrote a Telegram bot 🥳

For more examples, check [docs/examples](https://github.com/OpengramJS/opengram/tree/master/docs/examples) in repository

## Resources
-   API Reference
-   [GitHub Discussions](https://github.com/opengramjs/opengram/discussions)
-   Chats:
    - [Russian-speaking chat](https://t.me/opengramjs)
    - [English chat](https://t.me/opengram_en)
- [News channel](https://t.me/opengram_news)

## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FOpengramJS%2Fopengram.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FOpengramJS%2Fopengram?ref=badge_large)

[codecov-image]: https://codecov.io/gh/OpengramJS/opengram/branch/master/graph/badge.svg?token=8HJ46DCTSC
[codecov-url]: https://codecov.io/gh/OpengramJS/opengram
[license-image]: https://img.shields.io/badge/License-MIT-yellow.svg
[license-url]: https://opensource.org/licenses/MIT
[codacy-image]: https://app.codacy.com/project/badge/Grade/0ba3bf1b270946918b13e2730d190156
[codacy-url]: https://www.codacy.com/gh/OpengramJS/opengram/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=OpengramJS/opengram&amp;utm_campaign=Badge_Grade
[bots-api-image]: https://img.shields.io/badge/Bots%20API-v6.7-ff69b4
[bots-api-url]: https://core.telegram.org/bots/api
[ci-image]: https://github.com/OpengramJS/opengram/actions/workflows/ci.yml/badge.svg?branch=master
[ci-url]: https://github.com/OpengramJS/opengram/actions/workflows/actions/workflows/ci.yml
[npm-image]: https://img.shields.io/npm/v/opengram.svg
[npm-url]: https://npmjs.org/package/opengram
[downloads-image]: https://img.shields.io/npm/dm/opengram.svg
[downloads-url]: https://npmjs.org/package/opengram
[standard-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[standard-url]: https://standardjs.com
[fossa-image]: https://app.fossa.com/api/projects/git%2Bgithub.com%2FOpengramJS%2Fopengram.svg?type=shield
[fossa-url]: https://app.fossa.com/projects/git%2Bgithub.com%2FOpengramJS%2Fopengram?ref=badge_shield
