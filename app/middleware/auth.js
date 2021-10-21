'use strict';
// options, app
module.exports = () => {
  return async function auth(ctx, next) {
    const verifyPaths = [
      '/api',
    ];
    console.log('请求接口：', ctx.path);
    if (verifyPaths.some(path => ctx.path.includes(path))) {
      const valid = await ctx.$token().verify();
      if (valid) {
        await next();
      } else {
        ctx.status = 401;
        ctx.body = {
          code: ctx.NO_LOGIN_CODE,
          message: '尚未登录',
        };
      }
    } else {
      await next();
    }
  };
};
