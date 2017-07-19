'use strict'
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function processMessage (hook) {
    // the authenticated user
    const user = hook.params.user;
    // the actual message text
    const text = hook.data.text
      // messages can't be longer than 400 characters
      .substring(0, 400)
      // do some basic html escaping
      .replace(/&/g,'&amp').replace(/</g,'&lt;').replace(/>/g,'&gt;');

    hook.data = {
      text,
      // set the user id
      userId: user._id,
      // add the current time via `getTime`
      createAt: new Date().getTime()
    };

    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    return Promise.resolve(hook);
  };
};
