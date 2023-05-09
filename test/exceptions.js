const test = require('ava')
const { createError } = require('./utils')
const { Exceptions } = require('../src/core/exceptions')
const { TelegramError } = require('../src/core/error')
const {
  matchExceptionType,
  exceptionsHTTPCodesReverse
} = require('../src/core/exeptionsList')

test('should match "message is not modified"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'message is not modified'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.MessageNotModified()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'MessageNotModified')
})

test('should match "message to forward not found"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'message to forward not found'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.MessageToForwardNotFound()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'MessageToForwardNotFound')
})

test('should match "message_id_invalid"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'message_id_invalid'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.MessageIdInvalid()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'MessageIdInvalid')
})

test('should match "message to delete not found"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'message to delete not found'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.MessageToDeleteNotFound()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'MessageToDeleteNotFound')
})

test('should match "message to pin not found"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'message to pin not found'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.MessageToPinNotFound()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'MessageToPinNotFound')
})

test('should match "reply message not found"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'reply message not found'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.MessageToReplyNotFound()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'MessageToReplyNotFound')
})

test('should match "message identifier is not specified"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'message identifier is not specified'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.MessageIdentifierNotSpecified()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'MessageIdentifierNotSpecified')
})

test('should match "message text is empty"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'message text is empty'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.MessageTextIsEmpty()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'MessageTextIsEmpty')
})

test('should match "message can\'t be edited"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    "message can't be edited"
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.MessageCantBeEdited()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'MessageCantBeEdited')
})

test('should match "message can\'t be deleted"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    "message can't be deleted"
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.MessageCantBeDeleted()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'MessageCantBeDeleted')
})

test('should match "message can\'t be forwarded"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    "message can't be forwarded"
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.MessageCantBeForwarded()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'MessageCantBeForwarded')
})

test('should match "message to edit not found"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'message to edit not found'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.MessageToEditNotFound()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'MessageToEditNotFound')
})

test('should match "message is too long"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'message is too long'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.MessageIsTooLong()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'MessageIsTooLong')
})

test('should match "too much messages to send as an album"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'too much messages to send as an album'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.ToMuchMessages()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'ToMuchMessages')
})

test('should match "object expected as reply markup"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'object expected as reply markup'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.ObjectExpectedAsReplyMarkup()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'ObjectExpectedAsReplyMarkup')
})

test('should match "inline keyboard expected"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'inline keyboard expected'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.InlineKeyboardExpected()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'InlineKeyboardExpected')
})

test('should match "poll can\'t be stopped"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    "poll can't be stopped"
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.PollCantBeStopped()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'PollCantBeStopped')
})

test('should match "poll has already been closed"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'poll has already been closed'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.PollHasAlreadyBeenClosed()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'PollHasAlreadyBeenClosed')
})

test('should match "polls can\'t be sent to private chats"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    "polls can't be sent to private chats"
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.PollsCantBeSentToPrivateChats()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'PollsCantBeSentToPrivateChats')
})

test('should match "poll must have at least 2 option"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'poll must have at least 2 option'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.PollMustHaveMoreOptions()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'PollMustHaveMoreOptions')
})

test('should match "poll can\'t have more than 10 options"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    "poll can't have more than 10 options"
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.PollCantHaveMoreOptions()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'PollCantHaveMoreOptions')
})

test('should match "poll options must be non-empty"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'poll options must be non-empty'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.PollOptionsMustBeNonEmpty()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'PollOptionsMustBeNonEmpty')
})

test('should match "poll question must be non-empty"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'poll question must be non-empty'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.PollQuestionMustBeNonEmpty()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'PollQuestionMustBeNonEmpty')
})

test('should match "poll options length must not exceed 100"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'poll options length must not exceed 100'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.PollOptionsLengthTooLong()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'PollOptionsLengthTooLong')
})

test('should match "poll question length must not exceed 255"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'poll question length must not exceed 255'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.PollQuestionLengthTooLong()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'PollQuestionLengthTooLong')
})

test('should match "poll can be requested in private chats only"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'poll can be requested in private chats only'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.PollCanBeRequestedInPrivateChatsOnly()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'PollCanBeRequestedInPrivateChatsOnly')
})

test('should match "message with poll to stop not found"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'message with poll to stop not found'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.MessageWithPollNotFound()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'MessageWithPollNotFound')
})

test('should match "message is not a poll"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'message is not a poll'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.MessageIsNotAPoll()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'MessageIsNotAPoll')
})

test('should match "chat not found"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'chat not found'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.ChatNotFound()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'ChatNotFound')
})

test('should match "chat_id is empty"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'chat_id is empty'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.ChatIdIsEmpty()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'ChatIdIsEmpty')
})

test('should match "user_id_invalid"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'user_id_invalid'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.InvalidUserId()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'InvalidUserId')
})

test('should match "chat description is not modified"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'chat description is not modified'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.ChatDescriptionIsNotModified()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'ChatDescriptionIsNotModified')
})

test('should match "query is too old and response timeout expired or query id is invalid"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'query is too old and response timeout expired or query id is invalid'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.InvalidQueryID()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'InvalidQueryID')
})

test('should match "peer_id_invalid"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'peer_id_invalid'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.InvalidPeerID()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'InvalidPeerID')
})

test('should match "failed to get http url content"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'failed to get http url content'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.InvalidHTTPUrlContent()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'InvalidHTTPUrlContent')
})

test('should match "button_url_invalid"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'button_url_invalid'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.ButtonURLInvalid()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'ButtonURLInvalid')
})

test('should match "url host is empty"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'url host is empty'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.URLHostIsEmpty()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'URLHostIsEmpty')
})

test('should match "start_param_invalid"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'start_param_invalid'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.StartParamInvalid()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'StartParamInvalid')
})

test('should match "button_data_invalid"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'button_data_invalid'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.ButtonDataInvalid()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'ButtonDataInvalid')
})

test('should match "file is too big"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'file is too big'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.FileIsTooBig()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'FileIsTooBig')
})

test('should match "wrong file identifier/http url specified"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'wrong file identifier/http url specified'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.WrongFileIdentifier()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'WrongFileIdentifier')
})

test('should match "group chat was deactivated"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'group chat was deactivated'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.GroupDeactivated()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'GroupDeactivated')
})

test('should match "photo should be uploaded as an inputfile"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'photo should be uploaded as an inputfile'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.PhotoAsInputFileRequired()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'PhotoAsInputFileRequired')
})

test('should match "stickerset_invalid"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'stickerset_invalid'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.InvalidStickersSet()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'InvalidStickersSet')
})

test('should match "there is no sticker in the request"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'there is no sticker in the request'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.NoStickerInRequest()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'NoStickerInRequest')
})

test('should match "stickers_too_much"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'stickers_too_much'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.TooMuchStickersInSet()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'TooMuchStickersInSet')
})

test('should match "chat_admin_required"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'chat_admin_required'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.ChatAdminRequired()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'ChatAdminRequired')
})

test('should match "need administrator rights in the channel chat"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'need administrator rights in the channel chat'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.NeedAdministratorRightsInTheChannel()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'NeedAdministratorRightsInTheChannel')
})

test('should match "not enough rights to pin a message"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'not enough rights to pin a message'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.NotEnoughRightsToPinMessage()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'NotEnoughRightsToPinMessage')
})

test('should match "method is available only for supergroups and channel"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'method is available only for supergroups and channel'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.MethodNotAvailableInPrivateChats()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'MethodNotAvailableInPrivateChats')
})

test('should match "can\'t demote chat creator"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    "can't demote chat creator"
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.CantDemoteChatCreator()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'CantDemoteChatCreator')
})

test('should match "can\'t restrict self"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    "can't restrict self"
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.CantRestrictSelf()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'CantRestrictSelf')
})

test('should match "not enough rights to restrict/unrestrict chat member"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'not enough rights to restrict/unrestrict chat member'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.NotEnoughRightsToRestrict()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'NotEnoughRightsToRestrict')
})

test('should match "photo_invalid_dimensions"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'photo_invalid_dimensions'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.PhotoDimensions()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'PhotoDimensions')
})

test('should match "supergroup members are unavailable"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'supergroup members are unavailable'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.UnavailableMembers()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'UnavailableMembers')
})

test('should match "type of file mismatch"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'type of file mismatch'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.TypeOfFileMismatch()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'TypeOfFileMismatch')
})

test('should match "wrong remote file id specified"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'wrong remote file id specified'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.WrongRemoteFileIdSpecified()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'WrongRemoteFileIdSpecified')
})

test('should match "payment_provider_invalid"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'payment_provider_invalid'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.PaymentProviderInvalid()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'PaymentProviderInvalid')
})

test('should match "currency_total_amount_invalid"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'currency_total_amount_invalid'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.CurrencyTotalAmountInvalid()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'CurrencyTotalAmountInvalid')
})

test('should match "https url must be provided for webhook"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'https url must be provided for webhook'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.WebhookRequireHTTPS()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'WebhookRequireHTTPS')
})

test('should match "webhook can be set up only on ports 80, 88, 443 or 8443"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'webhook can be set up only on ports 80, 88, 443 or 8443'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.BadWebhookPort()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'BadWebhookPort')
})

test('should match "getaddrinfo: temporary failure in name resolution"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'getaddrinfo: temporary failure in name resolution'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.BadWebhookAddrInfo()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'BadWebhookAddrInfo')
})

test('should match "failed to resolve host: no address associated with hostname"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'failed to resolve host: no address associated with hostname'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.BadWebhookNoAddressAssociatedWithHostname()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'BadWebhookNoAddressAssociatedWithHostname')
})

test('should match "can\'t parse url"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    "can't parse url"
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.CantParseUrl()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'CantParseUrl')
})

test('should match "unsupported url protocol"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'unsupported url protocol'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.UnsupportedUrlProtocol()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'UnsupportedUrlProtocol')
})

test('should match "can\'t parse entities"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    "can't parse entities"
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.CantParseEntities()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'CantParseEntities')
})

test('should match "result_id_duplicate"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'result_id_duplicate'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.ResultIdDuplicate()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'ResultIdDuplicate')
})

test('should match "bot_domain_invalid"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'bot_domain_invalid'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.BotDomainInvalid()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'BotDomainInvalid')
})

test('should match "method is available only for supergroups"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'method is available only for supergroups'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.MethodIsNotAvailable()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'MethodIsNotAvailable')
})

test('should match "can\'t remove chat owner"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    "can't remove chat owner"
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.CantRestrictChatOwner()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'CantRestrictChatOwner')
})

test('should match "user is an administrator of the chat"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'user is an administrator of the chat'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.UserIsAnAdministratorOfTheChat()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'UserIsAnAdministratorOfTheChat')
})

test('should match "method not found"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.BadRequest,
    'method not found'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.MethodNotKnown()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.BadRequest, true)
  t.is(exceptionType, 'MethodNotKnown')
})

test('should match "terminated by other getupdates request"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.ConflictError,
    'terminated by other getupdates request'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.TerminatedByOtherGetUpdates()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.ConflictError, true)
  t.is(exceptionType, 'TerminatedByOtherGetUpdates')
})

test('should match "can\'t use getupdates method while webhook is active"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.ConflictError,
    "can't use getupdates method while webhook is active"
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.CantGetUpdates()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.ConflictError, true)
  t.is(exceptionType, 'CantGetUpdates')
})

test('should match "bot was kicked from"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.ForbiddenError,
    'bot was kicked from'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.BotKicked()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.ForbiddenError, true)
  t.is(exceptionType, 'BotKicked')
})

test('should match "bot was blocked by the user"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.ForbiddenError,
    'bot was blocked by the user'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.BotBlocked()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.ForbiddenError, true)
  t.is(exceptionType, 'BotBlocked')
})

test('should match "user is deactivated"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.ForbiddenError,
    'user is deactivated'
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.UserDeactivated()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.ForbiddenError, true)
  t.is(exceptionType, 'UserDeactivated')
})

test('should match "bot can\'t initiate conversation with a user"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.ForbiddenError,
    "bot can't initiate conversation with a user"
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.CantInitiateConversation()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.ForbiddenError, true)
  t.is(exceptionType, 'CantInitiateConversation')
})

test('should match "bot can\'t send messages to bots"', (t) => {
  const dummyError = createError(
    exceptionsHTTPCodesReverse.ForbiddenError,
    "bot can't send messages to bots"
  )

  const exceptionType = matchExceptionType(dummyError)
  const err = new Exceptions.CantTalkWithBots()

  t.is(err instanceof TelegramError, true)
  t.is(err instanceof Exceptions.ForbiddenError, true)
  t.is(exceptionType, 'CantTalkWithBots')
})
