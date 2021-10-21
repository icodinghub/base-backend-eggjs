'use strict';

module.exports = {
  ctx: null,
  create(data = {}) {
    const { app } = this.ctx;
    const token = app.jwt.sign(data, app.config.jwt.secret, { expiresIn: '12h' });
    return token;
  },
  get() {
    const token = this.ctx.get('X-Token');
    return token;
  },
  remove() { },
  async verify() {
    const { app } = this.ctx;
    const token = this.get();
    const verifyResult = await new Promise(resolve => {
      app.jwt.verify(token, app.config.jwt.secret, (err, decoded) => {
        if (err) {
          resolve({ verify: false, message: err.message });
        } else {
          resolve({ verify: true, message: decoded });
        }
      });
    });
    console.log(verifyResult);
    if (!verifyResult.verify) {
      this.verifyFail(401, verifyResult.message);
      return false;
    }
    // if (userUuid !== verifyResult.message.userUuid) {
    //   this.verifyFail(401, '用户 ID 与 Token 不一致');
    //   return false;
    // }
    return true;
  },
  // 校验token失败
  verifyFail(code, message) {
    this.body = { code, message };
    this.status = code;
  },
};
