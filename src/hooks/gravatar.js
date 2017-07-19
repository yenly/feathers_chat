'use strict';
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// we need this to create the MD5 hash
const crypto = require('crypto');

// the gravatar image service
const gravatarUrl = 'https://s.gravatar.com/avatar';
// the size query. our chat needs 60px images
const query = 's=60';

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function gravatar (hook) {
    // user email
    const { email } = hook.data;
    // gravatar uses MD5 hashes from an email address to get the images
    const hash = crypto.createHash('md5').update(email).digest('hex');

    hook.data.avatar = `${gravatarUrl}/${hash}?${query}`;

    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    return Promise.resolve(hook);
  };
};
