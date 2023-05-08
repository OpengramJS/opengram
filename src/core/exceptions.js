const { TelegramError } = require('./error')
/**
 @namespace Exceptions
 @description This namespace contains exception classes
 */

/** @memberOf Exceptions */
class BadRequest extends TelegramError {}
/** @memberOf Exceptions */
class MessageNotModified extends BadRequest {}
/** @memberOf Exceptions */
class MessageToForwardNotFound extends BadRequest {}
/** @memberOf Exceptions */
class MessageIdInvalid extends BadRequest {}
/** @memberOf Exceptions */
class MessageToDeleteNotFound extends BadRequest {}
/** @memberOf Exceptions */
class MessageToPinNotFound extends BadRequest {}
/** @memberOf Exceptions */
class MessageToReplyNotFound extends BadRequest {}
/** @memberOf Exceptions */
class MessageIdentifierNotSpecified extends BadRequest {}
/** @memberOf Exceptions */
class MessageTextIsEmpty extends BadRequest {}
/** @memberOf Exceptions */
class MessageCantBeEdited extends BadRequest {}
/** @memberOf Exceptions */
class MessageCantBeDeleted extends BadRequest {}
/** @memberOf Exceptions */
class MessageCantBeForwarded extends BadRequest {}
/** @memberOf Exceptions */
class MessageToEditNotFound extends BadRequest {}
/** @memberOf Exceptions */
class MessageIsTooLong extends BadRequest {}
/** @memberOf Exceptions */
class ToMuchMessages extends BadRequest {}
/** @memberOf Exceptions */
class ObjectExpectedAsReplyMarkup extends BadRequest {}
/** @memberOf Exceptions */
class InlineKeyboardExpected extends BadRequest {}
/** @memberOf Exceptions */
class PollCantBeStopped extends BadRequest {}
/** @memberOf Exceptions */
class PollHasAlreadyBeenClosed extends BadRequest {}
/** @memberOf Exceptions */
class PollsCantBeSentToPrivateChats extends BadRequest {}
/** @memberOf Exceptions */
class PollMustHaveMoreOptions extends BadRequest {}
/** @memberOf Exceptions */
class PollCantHaveMoreOptions extends BadRequest {}
/** @memberOf Exceptions */
class PollOptionsMustBeNonEmpty extends BadRequest {}
/** @memberOf Exceptions */
class PollQuestionMustBeNonEmpty extends BadRequest {}
/** @memberOf Exceptions */
class PollOptionsLengthTooLong extends BadRequest {}
/** @memberOf Exceptions */
class PollQuestionLengthTooLong extends BadRequest {}
/** @memberOf Exceptions */
class PollCanBeRequestedInPrivateChatsOnly extends BadRequest {}
/** @memberOf Exceptions */
class MessageWithPollNotFound extends BadRequest {}
/** @memberOf Exceptions */
class MessageIsNotAPoll extends BadRequest {}
/** @memberOf Exceptions */
class ChatNotFound extends BadRequest {}
/** @memberOf Exceptions */
class ChatIdIsEmpty extends BadRequest {}
/** @memberOf Exceptions */
class InvalidUserId extends BadRequest {}
/** @memberOf Exceptions */
class ChatDescriptionIsNotModified extends BadRequest {}
/** @memberOf Exceptions */
class InvalidQueryID extends BadRequest {}
/** @memberOf Exceptions */
class InvalidPeerID extends BadRequest {}
/** @memberOf Exceptions */
class InvalidHTTPUrlContent extends BadRequest {}
/** @memberOf Exceptions */
class ButtonURLInvalid extends BadRequest {}
/** @memberOf Exceptions */
class URLHostIsEmpty extends BadRequest {}
/** @memberOf Exceptions */
class StartParamInvalid extends BadRequest {}
/** @memberOf Exceptions */
class ButtonDataInvalid extends BadRequest {}
/** @memberOf Exceptions */
class FileIsTooBig extends BadRequest {}
/** @memberOf Exceptions */
class WrongFileIdentifier extends BadRequest {}
/** @memberOf Exceptions */
class GroupDeactivated extends BadRequest {}
/** @memberOf Exceptions */
class PhotoAsInputFileRequired extends BadRequest {}
/** @memberOf Exceptions */
class InvalidStickersSet extends BadRequest {}
/** @memberOf Exceptions */
class NoStickerInRequest extends BadRequest {}
/** @memberOf Exceptions */
class TooMuchStickersInSet extends BadRequest {}
/** @memberOf Exceptions */
class ChatAdminRequired extends BadRequest {}
/** @memberOf Exceptions */
class NeedAdministratorRightsInTheChannel extends BadRequest {}
/** @memberOf Exceptions */
class NotEnoughRightsToPinMessage extends BadRequest {}
/** @memberOf Exceptions */
class MethodNotAvailableInPrivateChats extends BadRequest {}
/** @memberOf Exceptions */
class CantDemoteChatCreator extends BadRequest {}
/** @memberOf Exceptions */
class CantRestrictSelf extends BadRequest {}
/** @memberOf Exceptions */
class NotEnoughRightsToRestrict extends BadRequest {}
/** @memberOf Exceptions */
class PhotoDimensions extends BadRequest {}
/** @memberOf Exceptions */
class UnavailableMembers extends BadRequest {}
/** @memberOf Exceptions */
class TypeOfFileMismatch extends BadRequest {}
/** @memberOf Exceptions */
class WrongRemoteFileIdSpecified extends BadRequest {}
/** @memberOf Exceptions */
class PaymentProviderInvalid extends BadRequest {}
/** @memberOf Exceptions */
class CurrencyTotalAmountInvalid extends BadRequest {}
/** @memberOf Exceptions */
class WebhookRequireHTTPS extends BadRequest {}
/** @memberOf Exceptions */
class BadWebhookPort extends BadRequest {}
/** @memberOf Exceptions */
class BadWebhookAddrInfo extends BadRequest {}
/** @memberOf Exceptions */
class BadWebhookNoAddressAssociatedWithHostname extends BadRequest {}
/** @memberOf Exceptions */
class CantParseUrl extends BadRequest {}
/** @memberOf Exceptions */
class UnsupportedUrlProtocol extends BadRequest {}
/** @memberOf Exceptions */
class CantParseEntities extends BadRequest {}
/** @memberOf Exceptions */
class ResultIdDuplicate extends BadRequest {}
/** @memberOf Exceptions */
class BotDomainInvalid extends BadRequest {}
/** @memberOf Exceptions */
class MethodIsNotAvailable extends BadRequest {}
/** @memberOf Exceptions */
class CantRestrictChatOwner extends BadRequest {}
/** @memberOf Exceptions */
class UserIsAnAdministratorOfTheChat extends BadRequest {}
/** @memberOf Exceptions */
class MethodNotKnown extends BadRequest {}
/** @memberOf Exceptions */
class ConflictError extends TelegramError {}
/** @memberOf Exceptions */
class TerminatedByOtherGetUpdates extends ConflictError {}
/** @memberOf Exceptions */
class CantGetUpdates extends ConflictError {}
/** @memberOf Exceptions */
class ForbiddenError extends TelegramError {}
/** @memberOf Exceptions */
class BotKicked extends ForbiddenError {}
/** @memberOf Exceptions */
class BotBlocked extends ForbiddenError {}
/** @memberOf Exceptions */
class UserDeactivated extends ForbiddenError {}
/** @memberOf Exceptions */
class CantInitiateConversation extends ForbiddenError {}
/** @memberOf Exceptions */
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
