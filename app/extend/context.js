'use strict';
const $token = require('../utils/token');
module.exports = {
  SUCCESS_CODE: 0,
  FAIL_CODE: 1,
  NO_LOGIN_CODE: 401,
  $token() {
    $token.ctx = this;
    return $token;
  },
};
