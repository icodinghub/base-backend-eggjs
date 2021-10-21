'use strict';

exports.success = ({ ctx, res = null, msg = 'sucess' }) => {
  ctx.body = {
    code: ctx.SUCCESS_CODE,
    state: true,
    data: res,
    msg,
  };
  ctx.status = 200;
};


exports.fail = ({ ctx, res = null, msg = 'fail', code }) => {
  ctx.body = {
    code: code || ctx.FAIL_CODE,
    state: false,
    data: res,
    msg,
  };
  ctx.status = 200;
};
