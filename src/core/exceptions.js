const { TelegramError } = require('./error')
/**
 @namespace Exceptions
 @description This namespace contains exception classes
 */
/**
  @memberOf Exceptions
  @extends TelegramError
*/
class BadRequest extends TelegramError {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class MessageNotModified extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class MessageToForwardNotFound extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class MessageIdInvalid extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class MessageToDeleteNotFound extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class MessageToPinNotFound extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class MessageToReplyNotFound extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class MessageIdentifierNotSpecified extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class MessageTextIsEmpty extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class MessageCantBeEdited extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class MessageCantBeDeleted extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class MessageCantBeForwarded extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class MessageToEditNotFound extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class MessageIsTooLong extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class ToMuchMessages extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class ObjectExpectedAsReplyMarkup extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class InlineKeyboardExpected extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class PollCantBeStopped extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class PollHasAlreadyBeenClosed extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class PollsCantBeSentToPrivateChats extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class PollMustHaveMoreOptions extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class PollCantHaveMoreOptions extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class PollOptionsMustBeNonEmpty extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class PollQuestionMustBeNonEmpty extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class PollOptionsLengthTooLong extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class PollQuestionLengthTooLong extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class PollCanBeRequestedInPrivateChatsOnly extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class MessageWithPollNotFound extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class MessageIsNotAPoll extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class ChatNotFound extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class ChatIdIsEmpty extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class InvalidUserId extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class ChatDescriptionIsNotModified extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class InvalidQueryID extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class InvalidPeerID extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class InvalidHTTPUrlContent extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class ButtonURLInvalid extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class URLHostIsEmpty extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class StartParamInvalid extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class ButtonDataInvalid extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class FileIsTooBig extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class WrongFileIdentifier extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class GroupDeactivated extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class PhotoAsInputFileRequired extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class InvalidStickersSet extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class NoStickerInRequest extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class TooMuchStickersInSet extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class ChatAdminRequired extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class NeedAdministratorRightsInTheChannel extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class NotEnoughRightsToPinMessage extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class MethodNotAvailableInPrivateChats extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class CantDemoteChatCreator extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class CantRestrictSelf extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class NotEnoughRightsToRestrict extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class PhotoDimensions extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class UnavailableMembers extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class TypeOfFileMismatch extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class WrongRemoteFileIdSpecified extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class PaymentProviderInvalid extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class CurrencyTotalAmountInvalid extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class WebhookRequireHTTPS extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class BadWebhookPort extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class BadWebhookAddrInfo extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class BadWebhookNoAddressAssociatedWithHostname extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class CantParseUrl extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class UnsupportedUrlProtocol extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class CantParseEntities extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class ResultIdDuplicate extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class BotDomainInvalid extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class MethodIsNotAvailable extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class CantRestrictChatOwner extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class UserIsAnAdministratorOfTheChat extends BadRequest {}
/**
  @memberOf Exceptions
  @extends BadRequest
*/
class MethodNotKnown extends BadRequest {}
/**
  @memberOf Exceptions
  @extends TelegramError
*/
class ConflictError extends TelegramError {}
/**
  @memberOf Exceptions
  @extends ConflictError
*/
class TerminatedByOtherGetUpdates extends ConflictError {}
/**
  @memberOf Exceptions
  @extends ConflictError
*/
class CantGetUpdates extends ConflictError {}
/**
  @memberOf Exceptions
  @extends TelegramError
*/
class ForbiddenError extends TelegramError {}
/**
  @memberOf Exceptions
  @extends ForbiddenError
*/
class BotKicked extends ForbiddenError {}
/**
  @memberOf Exceptions
  @extends ForbiddenError
*/
class BotBlocked extends ForbiddenError {}
/**
  @memberOf Exceptions
  @extends ForbiddenError
*/
class UserDeactivated extends ForbiddenError {}
/**
  @memberOf Exceptions
  @extends ForbiddenError
*/
class CantInitiateConversation extends ForbiddenError {}
/**
  @memberOf Exceptions
  @extends ForbiddenError
*/
class CantTalkWithBots extends ForbiddenError {}

module.exports = {
  Exceptions: {
    BadRequest,
    MessageNotModified,
    MessageToForwardNotFound,
    MessageIdInvalid,
    MessageToDeleteNotFound,
    MessageToPinNotFound,
    MessageToReplyNotFound,
    MessageIdentifierNotSpecified,
    MessageTextIsEmpty,
    MessageCantBeEdited,
    MessageCantBeDeleted,
    MessageCantBeForwarded,
    MessageToEditNotFound,
    MessageIsTooLong,
    ToMuchMessages,
    ObjectExpectedAsReplyMarkup,
    InlineKeyboardExpected,
    PollCantBeStopped,
    PollHasAlreadyBeenClosed,
    PollsCantBeSentToPrivateChats,
    PollMustHaveMoreOptions,
    PollCantHaveMoreOptions,
    PollOptionsMustBeNonEmpty,
    PollQuestionMustBeNonEmpty,
    PollOptionsLengthTooLong,
    PollQuestionLengthTooLong,
    PollCanBeRequestedInPrivateChatsOnly,
    MessageWithPollNotFound,
    MessageIsNotAPoll,
    ChatNotFound,
    ChatIdIsEmpty,
    InvalidUserId,
    ChatDescriptionIsNotModified,
    InvalidQueryID,
    InvalidPeerID,
    InvalidHTTPUrlContent,
    ButtonURLInvalid,
    URLHostIsEmpty,
    StartParamInvalid,
    ButtonDataInvalid,
    FileIsTooBig,
    WrongFileIdentifier,
    GroupDeactivated,
    PhotoAsInputFileRequired,
    InvalidStickersSet,
    NoStickerInRequest,
    TooMuchStickersInSet,
    ChatAdminRequired,
    NeedAdministratorRightsInTheChannel,
    NotEnoughRightsToPinMessage,
    MethodNotAvailableInPrivateChats,
    CantDemoteChatCreator,
    CantRestrictSelf,
    NotEnoughRightsToRestrict,
    PhotoDimensions,
    UnavailableMembers,
    TypeOfFileMismatch,
    WrongRemoteFileIdSpecified,
    PaymentProviderInvalid,
    CurrencyTotalAmountInvalid,
    WebhookRequireHTTPS,
    BadWebhookPort,
    BadWebhookAddrInfo,
    BadWebhookNoAddressAssociatedWithHostname,
    CantParseUrl,
    UnsupportedUrlProtocol,
    CantParseEntities,
    ResultIdDuplicate,
    BotDomainInvalid,
    MethodIsNotAvailable,
    CantRestrictChatOwner,
    UserIsAnAdministratorOfTheChat,
    MethodNotKnown,
    ConflictError,
    TerminatedByOtherGetUpdates,
    CantGetUpdates,
    ForbiddenError,
    BotKicked,
    BotBlocked,
    UserDeactivated,
    CantInitiateConversation,
    CantTalkWithBots
  }
}
