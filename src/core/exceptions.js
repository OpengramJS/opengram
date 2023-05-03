const { TelegramError } = require('./error')
class BadRequest extends TelegramError {}
class MessageNotModified extends BadRequest {}
class MessageToForwardNotFound extends BadRequest {}
class MessageIdInvalid extends BadRequest {}
class MessageToDeleteNotFound extends BadRequest {}
class MessageToPinNotFound extends BadRequest {}
class MessageToReplyNotFound extends BadRequest {}
class MessageIdentifierNotSpecified extends BadRequest {}
class MessageTextIsEmpty extends BadRequest {}
class MessageCantBeEdited extends BadRequest {}
class MessageCantBeDeleted extends BadRequest {}
class MessageCantBeForwarded extends BadRequest {}
class MessageToEditNotFound extends BadRequest {}
class MessageIsTooLong extends BadRequest {}
class ToMuchMessages extends BadRequest {}
class ObjectExpectedAsReplyMarkup extends BadRequest {}
class InlineKeyboardExpected extends BadRequest {}
class PollCantBeStopped extends BadRequest {}
class PollHasAlreadyBeenClosed extends BadRequest {}
class PollsCantBeSentToPrivateChats extends BadRequest {}
class PollMustHaveMoreOptions extends BadRequest {}
class PollCantHaveMoreOptions extends BadRequest {}
class PollOptionsMustBeNonEmpty extends BadRequest {}
class PollQuestionMustBeNonEmpty extends BadRequest {}
class PollOptionsLengthTooLong extends BadRequest {}
class PollQuestionLengthTooLong extends BadRequest {}
class PollCanBeRequestedInPrivateChatsOnly extends BadRequest {}
class MessageWithPollNotFound extends BadRequest {}
class MessageIsNotAPoll extends BadRequest {}
class ChatNotFound extends BadRequest {}
class ChatIdIsEmpty extends BadRequest {}
class InvalidUserId extends BadRequest {}
class ChatDescriptionIsNotModified extends BadRequest {}
class InvalidQueryID extends BadRequest {}
class InvalidPeerID extends BadRequest {}
class InvalidHTTPUrlContent extends BadRequest {}
class ButtonURLInvalid extends BadRequest {}
class URLHostIsEmpty extends BadRequest {}
class StartParamInvalid extends BadRequest {}
class ButtonDataInvalid extends BadRequest {}
class FileIsTooBig extends BadRequest {}
class WrongFileIdentifier extends BadRequest {}
class GroupDeactivated extends BadRequest {}
class PhotoAsInputFileRequired extends BadRequest {}
class InvalidStickersSet extends BadRequest {}
class NoStickerInRequest extends BadRequest {}
class TooMuchStickersInSet extends BadRequest {}
class ChatAdminRequired extends BadRequest {}
class NeedAdministratorRightsInTheChannel extends BadRequest {}
class NotEnoughRightsToPinMessage extends BadRequest {}
class MethodNotAvailableInPrivateChats extends BadRequest {}
class CantDemoteChatCreator extends BadRequest {}
class CantRestrictSelf extends BadRequest {}
class NotEnoughRightsToRestrict extends BadRequest {}
class PhotoDimensions extends BadRequest {}
class UnavailableMembers extends BadRequest {}
class TypeOfFileMismatch extends BadRequest {}
class WrongRemoteFileIdSpecified extends BadRequest {}
class PaymentProviderInvalid extends BadRequest {}
class CurrencyTotalAmountInvalid extends BadRequest {}
class WebhookRequireHTTPS extends BadRequest {}
class BadWebhookPort extends BadRequest {}
class BadWebhookAddrInfo extends BadRequest {}
class BadWebhookNoAddressAssociatedWithHostname extends BadRequest {}
class CantParseUrl extends BadRequest {}
class UnsupportedUrlProtocol extends BadRequest {}
class CantParseEntities extends BadRequest {}
class ResultIdDuplicate extends BadRequest {}
class BotDomainInvalid extends BadRequest {}
class MethodIsNotAvailable extends BadRequest {}
class CantRestrictChatOwner extends BadRequest {}
class UserIsAnAdministratorOfTheChat extends BadRequest {}
class MethodNotKnown extends BadRequest {}
class ConflictError extends TelegramError {}
class TerminatedByOtherGetUpdates extends ConflictError {}
class CantGetUpdates extends ConflictError {}
class ForbiddenError extends TelegramError {}
class BotKicked extends ForbiddenError {}
class BotBlocked extends ForbiddenError {}
class UserDeactivated extends ForbiddenError {}
class CantInitiateConversation extends ForbiddenError {}
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
