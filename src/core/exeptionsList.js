const exceptionsList = {
  TelegramError: {
    BadRequest: {
      MessageNotModified: { match: 'message is not modified' },
      MessageToForwardNotFound: { match: 'message to forward not found' },
      MessageIdInvalid: { match: 'message_id_invalid' },
      MessageToDeleteNotFound: { match: 'message to delete not found' },
      MessageToPinNotFound: { match: 'message to pin not found' },
      MessageToReplyNotFound: { match: 'reply message not found' },
      MessageIdentifierNotSpecified: { match: 'message identifier is not specified' },
      MessageTextIsEmpty: { match: 'message text is empty' },
      MessageCantBeEdited: { match: 'message can\'t be edited' },
      MessageCantBeDeleted: { match: 'message can\'t be deleted' },
      MessageCantBeForwarded: { match: 'message can\'t be forwarded' },
      MessageToEditNotFound: { match: 'message to edit not found' },
      MessageIsTooLong: { match: 'message is too long' },
      ToMuchMessages: { match: 'too much messages to send as an album' },
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
      PollCanBeRequestedInPrivateChatsOnly: { match: 'poll can be requested in private chats only' },
      MessageWithPollNotFound: { match: 'message with poll to stop not found' },
      MessageIsNotAPoll: { match: 'message is not a poll' },
      ChatNotFound: { match: 'chat not found' },
      ChatIdIsEmpty: { match: 'chat_id is empty' },
      InvalidUserId: { match: 'user_id_invalid' },
      ChatDescriptionIsNotModified: { match: 'chat description is not modified' },
      InvalidQueryID: { match: 'query is too old and response timeout expired or query id is invalid' },
      InvalidPeerID: { match: 'peer_id_invalid' },
      InvalidHTTPUrlContent: { match: 'failed to get http url content' },
      ButtonURLInvalid: { match: 'button_url_invalid' },
      URLHostIsEmpty: { match: 'url host is empty' },
      StartParamInvalid: { match: 'start_param_invalid' },
      ButtonDataInvalid: { match: 'button_data_invalid' },
      FileIsTooBig: { match: 'file is too big' },
      WrongFileIdentifier: { match: 'wrong file identifier/http url specified' },
      GroupDeactivated: { match: 'group chat was deactivated' },
      PhotoAsInputFileRequired: { match: 'photo should be uploaded as an inputfile' },
      InvalidStickersSet: { match: 'stickerset_invalid' },
      NoStickerInRequest: { match: 'there is no sticker in the request' },
      TooMuchStickersInSet: { match: 'stickers_too_much' },
      ChatAdminRequired: { match: 'chat_admin_required' },
      NeedAdministratorRightsInTheChannel: { match: 'need administrator rights in the channel chat' },
      NotEnoughRightsToPinMessage: { match: 'not enough rights to pin a message' },
      MethodNotAvailableInPrivateChats: { match: 'method is available only for supergroups and channel' },
      CantDemoteChatCreator: { match: 'can\'t demote chat creator' },
      CantRestrictSelf: { match: "can't restrict self" },
      NotEnoughRightsToRestrict: { match: 'not enough rights to restrict/unrestrict chat member' },
      PhotoDimensions: { match: 'photo_invalid_dimensions' },
      UnavailableMembers: { match: 'supergroup members are unavailable' },
      TypeOfFileMismatch: { match: 'type of file mismatch' },
      WrongRemoteFileIdSpecified: { match: 'wrong remote file id specified' }, // ????
      PaymentProviderInvalid: { match: 'payment_provider_invalid' },
      CurrencyTotalAmountInvalid: { match: 'currency_total_amount_invalid' },
      WebhookRequireHTTPS: { match: 'https url must be provided for webhook' },
      BadWebhookPort: { match: 'webhook can be set up only on ports 80, 88, 443 or 8443' },
      BadWebhookAddrInfo: { match: 'getaddrinfo: temporary failure in name resolution' },
      BadWebhookNoAddressAssociatedWithHostname: { match: 'failed to resolve host: no address associated with hostname' },
      CantParseUrl: { match: 'can\'t parse url' },
      UnsupportedUrlProtocol: { match: 'unsupported url protocol' },
      CantParseEntities: { match: 'can\'t parse entities' },
      ResultIdDuplicate: { match: 'result_id_duplicate' },
      BotDomainInvalid: { match: 'bot_domain_invalid' },
      MethodIsNotAvailable: { match: 'method is available only for supergroups' },
      CantRestrictChatOwner: { match: 'can\'t remove chat owner' },
      UserIsAnAdministratorOfTheChat: { match: 'user is an administrator of the chat' },
      MethodNotKnown: { match: 'method not found' }
    },
    ConflictError: {
      TerminatedByOtherGetUpdates: { match: 'terminated by other getupdates request' },
      CantGetUpdates: { match: 'can\'t use getupdates method while webhook is active' }
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

const exceptionsHTTPCodes = {
  400: 'BadRequest',
  409: 'ConflictError',
  403: 'ForbiddenError'
}

const exceptionsHTTPCodesReverse = Object.fromEntries(
  Object.entries(exceptionsHTTPCodes)
    .map(a => a.reverse())
)

const exceptionsToMatch = Object.fromEntries(
  Object.entries(exceptionsList.TelegramError)
    .map(([name, value]) => [exceptionsHTTPCodesReverse[name], value])
)

function matchExceptionType (err) {
  if (!err.description || !err.error_code || !exceptionsToMatch[err.error_code]) return null

  const [errName] = Object.entries(exceptionsToMatch[err.error_code])
    .find(
      ([, meta]) => err.description
        .toLowerCase()
        .includes(meta.match.toLowerCase())
    ) ?? [null]

  return errName
}

module.exports = { exceptionsList, matchExceptionType, exceptionsHTTPCodes, exceptionsHTTPCodesReverse }
