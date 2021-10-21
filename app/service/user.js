'use strict';

const { Service } = require('egg');
const { DB_METER_NAMES } = require('../db');

class UserService extends Service {
  async register({ username, password, schoolId }) {
    const { app } = this;
    await app.mysql.insert(DB_METER_NAMES.USERS, {
      username,
      password,
      school_id: schoolId,
    });
  }

  async findUser({ username }) {
    const { app } = this;
    const res = await app.mysql.select(DB_METER_NAMES.USERS, {
      columns: [
        'username',
      ],
      where: {
        username,
      },
    });
    return res;
  }

  /**
   * 查询用户表中数据
   * @param {Object} $where { username, id }
   * @return Array
   */
  async find($where) {
    const { app } = this;
    const res = await app.mysql.get(DB_METER_NAMES.USERS, $where);
    return res;
  }
}

module.exports = UserService;
