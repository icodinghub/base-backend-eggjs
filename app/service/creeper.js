'use strict';

const { Service } = require('egg');

class CreeperService extends Service {
  async get(url) {
    try {
      const res = await this.app.curl(url, {
        // 创建连接超时 3 秒，接收响应超时 3 秒
        timeout: 10000,
      });
      return res;
    } catch (error) {
      console.log(error, 'error');
    }
  }
}

module.exports = CreeperService;
