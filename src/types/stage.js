/**
 * The default scene is the scene that is entered when the user is not in another scene.
 *
 * When you use custom name of session property or multiple sessions, you should configure `sessionName`
 *
 * After TTL expired, all scene data stored in local session of scene be permanently removed
 *
 * @typedef {object} StageOptions
 * @property {string} [sessionName='session'] Name of session property used for scenes, by default - `session`
 * @property {string} [default] Name of scene by default
 * @property {number} [ttl] Time of life for scenes in seconds
 */
