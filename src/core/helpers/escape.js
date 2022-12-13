/**
 * Escapes special HTML characters in the given string
 *
 * @private
 * @param string String to escape
 * @return {string}
 */
const escapeHTML = (string) => {
  return string
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

module.exports = { escapeHTML }
