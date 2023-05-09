module.exports = {
  copyMethods: {
    audio: 'sendAudio',
    contact: 'sendContact',
    document: 'sendDocument',
    location: 'sendLocation',
    photo: 'sendPhoto',
    sticker: 'sendSticker',
    text: 'sendMessage',
    venue: 'sendVenue',
    video: 'sendVideo',
    video_note: 'sendVideoNote',
    animation: 'sendAnimation',
    voice: 'sendVoice',
    poll: 'sendPoll'
  },
  text: (message) => {
    return {
      reply_markup: message.reply_markup,
      text: message.text,
      entities: message.entities,
      protect_content: message.has_protected_content
    }
  },
  contact: (message) => {
    return {
      reply_markup: message.reply_markup,
      phone_number: message.contact.phone_number,
      first_name: message.contact.first_name,
      last_name: message.contact.last_name,
      protect_content: message.has_protected_content
    }
  },
  location: (message) => {
    return {
      reply_markup: message.reply_markup,
      latitude: message.location.latitude,
      longitude: message.location.longitude,
      horizontal_accuracy: message.location.horizontal_accuracy,
      live_period: message.location.live_period,
      heading: message.location.heading,
      proximity_alert_radius: message.location.proximity_alert_radius,
      protect_content: message.has_protected_content
    }
  },
  venue: (message) => {
    return {
      reply_markup: message.reply_markup,
      latitude: message.venue.location.latitude,
      longitude: message.venue.location.longitude,
      title: message.venue.title,
      address: message.venue.address,
      foursquare_id: message.venue.foursquare_id,
      foursquare_type: message.venue.foursquare_type,
      protect_content: message.has_protected_content,
      google_place_id: message.venue.google_place_id,
      google_place_type: message.venue.google_place_type
    }
  },
  voice: (message) => {
    return {
      reply_markup: message.reply_markup,
      voice: message.voice.file_id,
      duration: message.voice.duration,
      caption: message.caption,
      caption_entities: message.caption_entities,
      protect_content: message.has_protected_content
    }
  },
  audio: (message) => {
    return {
      reply_markup: message.reply_markup,
      audio: message.audio.file_id,
      thumbnail: message.audio.thumbnail,
      duration: message.audio.duration,
      performer: message.audio.performer,
      title: message.audio.title,
      caption: message.caption,
      caption_entities: message.caption_entities,
      protect_content: message.has_protected_content
    }
  },
  video: (message) => {
    return {
      reply_markup: message.reply_markup,
      video: message.video.file_id,
      thumbnail: message.video.thumbnail,
      caption: message.caption,
      caption_entities: message.caption_entities,
      duration: message.video.duration,
      width: message.video.width,
      height: message.video.height,
      supports_streaming: !!message.video.supports_streaming,
      has_spoiler: message.has_media_spoiler,
      protect_content: message.has_protected_content
    }
  },
  document: (message) => {
    return {
      reply_markup: message.reply_markup,
      document: message.document.file_id,
      caption: message.caption,
      caption_entities: message.caption_entities,
      protect_content: message.has_protected_content
    }
  },
  sticker: (message) => {
    return {
      reply_markup: message.reply_markup,
      sticker: message.sticker.file_id,
      protect_content: message.has_protected_content,
      emoji: message.sticker.emoji
    }
  },
  photo: (message) => {
    return {
      reply_markup: message.reply_markup,
      photo: message.photo[message.photo.length - 1].file_id,
      caption: message.caption,
      caption_entities: message.caption_entities,
      has_spoiler: message.has_media_spoiler,
      protect_content: message.has_protected_content
    }
  },
  video_note: (message) => {
    return {
      reply_markup: message.reply_markup,
      video_note: message.video_note.file_id,
      thumbnail: message.video_note.thumbnail,
      length: message.video_note.length,
      duration: message.video_note.duration,
      protect_content: message.has_protected_content
    }
  },
  animation: (message) => {
    return {
      reply_markup: message.reply_markup,
      animation: message.animation.file_id,
      thumbnail: message.animation.thumbnail,
      duration: message.animation.duration,
      has_spoiler: message.has_media_spoiler,
      protect_content: message.has_protected_content
    }
  },
  poll: (message) => {
    return {
      question: message.poll.question,
      type: message.poll.type,
      is_anonymous: message.poll.is_anonymous,
      allows_multiple_answers: message.poll.allows_multiple_answers,
      correct_option_id: message.poll.correct_option_id,
      options: message.poll.options.map(({ text }) => text),
      protect_content: message.has_protected_content,
      explanation: message.poll.explanation,
      explanation_entities: message.poll.explanation_entities,
      open_period: message.poll.open_period,
      close_date: message.poll.close_date
    }
  }
}
