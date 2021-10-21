'use strict';

const Base64 = require('crypto-js/enc-base64');
const Utf8 = require('crypto-js/enc-utf8');

module.exports = {
  base64Enc(value) {
    return Base64.stringify(Utf8.parse(value));
  },
  base64Dec(value) {
    return Utf8.stringify(Base64.parse(value));
  },
};
