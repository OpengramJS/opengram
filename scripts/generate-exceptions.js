const ejs = require('ejs')
const fs = require('fs')
const prettier = require('prettier')

const exceptionsList = {
  TelegramError: {
    BadRequest: {
      MessageNotModified: { match: 'message is not modified' },
      MessageToForwardNotFound: { match: 'message to forward not found' },
      MessageIdInvalid: { match: 'message_id_invalid' },
      MessageToDeleteNotFound: { match: 'message to delete not found' },
      MessageToPinNotFound: { match: 'message to pin not found' },
      MessageToReplyNotFound: { match: 'Reply message not found' },
      MessageIdentifierNotSpecified: { match: 'message identifier is not specified' },
      MessageTextIsEmpty: { match: 'Message text is empty' },
      MessageCantBeEdited: { match: 'message can\'t be edited' },
      MessageCantBeDeleted: { match: 'message can\'t be deleted' },
      MessageCantBeForwarded: { match: 'message can\'t be forwarded' },
      MessageToEditNotFound: { match: 'message to edit not found' },
      MessageIsTooLong: { match: 'message is too long' },
      ToMuchMessages: { match: 'Too much messages to send as an album' },
      ObjectExpectedAsReplyMarkup: { match: 'object expected as reply markup' },
      InlineKeyboardExpected: { match: 'inline keyboard expected' },
      PollCantBeStopped: { match: 'poll can\'t be stopped' },
      PollHasAlreadyBeenClosed: { match: 'poll has already been closed' },
      PollsCantBeSentToPrivateChats: { match: "polls can't be sent to private chats" },
      PollMustHaveMoreOptions: { match: 'poll must have at least 2 option' },
      PollCantHaveMoreOptions: { match: "poll can't have more than 10 options" },
      PollOptionsMustBeNonEmpty: { match: 'poll options must be non-empty' },
      PollQuestionMustBeNonEmpty: { match: 'poll question must be non-empty' },
      PollOptionsLengthTooLong: { match: 'poll options length must not exceed 100' },
      PollQuestionLengthTooLong: { match: 'poll question length must not exceed 255' },
      PollCanBeRequestedInPrivateChatsOnly: { match: 'Poll can be requested in private chats only' },
      MessageWithPollNotFound: { match: 'message with poll to stop not found' },
      MessageIsNotAPoll: { match: 'message is not a poll' },
      ChatNotFound: { match: 'chat not found' },
      ChatIdIsEmpty: { match: 'chat_id is empty' },
      InvalidUserId: { match: 'user_id_invalid' },
      ChatDescriptionIsNotModified: { match: 'chat description is not modified' },
      InvalidQueryID: { match: 'query is too old and response timeout expired or query id is invalid' },
      InvalidPeerID: { match: 'PEER_ID_INVALID' },
      InvalidHTTPUrlContent: { match: 'Failed to get HTTP URL content' },
      ButtonURLInvalid: { match: 'BUTTON_URL_INVALID' },
      URLHostIsEmpty: { match: 'URL host is empty' },
      StartParamInvalid: { match: 'START_PARAM_INVALID' },
      ButtonDataInvalid: { match: 'BUTTON_DATA_INVALID' },
      FileIsTooBig: { match: 'File is too big' },
      WrongFileIdentifier: { match: 'wrong file identifier/HTTP URL specified' },
      GroupDeactivated: { match: 'Group chat was deactivated' },
      PhotoAsInputFileRequired: { match: 'Photo should be uploaded as an InputFile' },
      InvalidStickersSet: { match: 'STICKERSET_INVALID' },
      NoStickerInRequest: { match: 'there is no sticker in the request' },
      TooMuchStickersInSet: { match: 'STICKERS_TOO_MUCH' },
      ChatAdminRequired: { match: 'CHAT_ADMIN_REQUIRED' },
      NeedAdministratorRightsInTheChannel: { match: 'need administrator rights in the channel chat' },
      NotEnoughRightsToPinMessage: { match: 'not enough rights to pin a message' },
      MethodNotAvailableInPrivateChats: { match: 'method is available only for supergroups and channel' },
      CantDemoteChatCreator: { match: 'can\'t demote chat creator' },
      CantRestrictSelf: { match: "can't restrict self" },
      NotEnoughRightsToRestrict: { match: 'not enough rights to restrict/unrestrict chat member' },
      PhotoDimensions: { match: 'PHOTO_INVALID_DIMENSIONS' },
      UnavailableMembers: { match: 'supergroup members are unavailable' },
      TypeOfFileMismatch: { match: 'type of file mismatch' },
      WrongRemoteFileIdSpecified: { match: 'wrong remote file id specified' }, // ????
      PaymentProviderInvalid: { match: 'PAYMENT_PROVIDER_INVALID' },
      CurrencyTotalAmountInvalid: { match: 'currency_total_amount_invalid' },
      WebhookRequireHTTPS: { match: 'HTTPS url must be provided for webhook' },
      BadWebhookPort: { match: 'Webhook can be set up only on ports 80, 88, 443 or 8443' },
      BadWebhookAddrInfo: { match: 'getaddrinfo: Temporary failure in name resolution' },
      BadWebhookNoAddressAssociatedWithHostname: { match: 'failed to resolve host: no address associated with hostname' },
      CantParseUrl: { match: 'can\'t parse URL' },
      UnsupportedUrlProtocol: { match: 'unsupported URL protocol' },
      CantParseEntities: { match: 'can\'t parse entities' },
      ResultIdDuplicate: { match: 'result_id_duplicate' },
      BotDomainInvalid: { match: 'bot_domain_invalid' },
      MethodIsNotAvailable: { match: 'Method is available only for supergroups' },
      CantRestrictChatOwner: { match: 'Can\'t remove chat owner' },
      UserIsAnAdministratorOfTheChat: { match: 'User is an administrator of the chat' },
      MethodNotKnown: { match: 'method not found' }
    },
    ConflictError: {
      TerminatedByOtherGetUpdates: { match: 'terminated by other getUpdates request' },
      CantGetUpdates: { match: 'can\'t use getUpdates method while webhook is active' }
    },
    ForbiddenError: {
      BotKicked: { match: 'bot was kicked from' },
      BotBlocked: { match: 'bot was blocked by the user' },
      UserDeactivated: { match: 'user is deactivated' },
      CantInitiateConversation: { match: 'bot can\'t initiate conversation with a user' },
      CantTalkWithBots: { match: 'bot can\'t send messages to bots' }
    }
  }
}

async function renderException (name, inherits) {
  return await ejs.renderFile('./templates/exception.ejs', { inherits, name })
}

let result = 'const { TelegramError } = require("../src")\n'

async function main () {
  const exceptionsExports = new Set()

  for (const baseError in exceptionsList) {
    for (const exceptionType in exceptionsList[baseError]) {
      result += await renderException(exceptionType, baseError)
      exceptionsExports.add(exceptionType)
      for (const exception in exceptionsList[baseError][exceptionType]) {
        result += await renderException(exception, exceptionType)
        exceptionsExports.add(exception)
      }
    }
  }
  result += '\n\n'
  result += `module.exports = {
  Exceptions: {
    ${[...exceptionsExports].join(',')}
  }
}`
  result += '\n'
  fs.writeFileSync('./exceptions.js', prettier.format(result, {
    arrowParens: 'always',
    bracketSameLine: true,
    bracketSpacing: true,
    embeddedLanguageFormatting: 'auto',
    endOfLine: 'lf',
    htmlWhitespaceSensitivity: 'css',
    insertPragma: false,
    jsxSingleQuote: false,
    printWidth: 80,
    proseWrap: 'preserve',
    quoteProps: 'as-needed',
    requirePragma: false,
    semi: false,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'none',
    useTabs: false,
    vueIndentScriptAndStyle: false
  }))
}

main()
