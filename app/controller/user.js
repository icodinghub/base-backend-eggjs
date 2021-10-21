'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async register() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    /**
     * 1. username 必须未注册过
     */
    if (!username || !password) {
      ctx.helper.fail({ ctx, msg: '请正确填写注册信息！' });
      return;
    }
    const user = await ctx.service.user.findUser({ username });
    if (user.length > 0) {
      ctx.helper.fail({ ctx, msg: '用户名已注册！' });
      return;
    }
    
    await ctx.service.user.register({ username, password });
    ctx.helper.success({ ctx, msg: '用户注册成功！' });
  }

  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    const res = await ctx.service.user.find({ username });
    if (!res) {
      ctx.helper.fail({ ctx, msg: '用户未找到！' });
      return;
    }
    if (res.password === password) {
      Reflect.deleteProperty(res, 'password');
      const token = ctx.$token().create({ username, id: res.id });
      ctx.helper.success({ ctx, res: { ...res, token } });
    } else {
      ctx.helper.fail({ ctx, msg: '密码错误！' });
    }
  }

  // async find(id) {}

  // async update() {}

  // async delete() {}
}

module.exports = UserController;
