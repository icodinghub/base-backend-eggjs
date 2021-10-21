'use strict';

const { Service } = require('egg');

class StudentsService extends Service {
  async get() {
    const data = await this.app.mysql.select('students', {
      orders: [
        [
          'id',
          'desc',
        ],
      ],
      limit: 10,
      offset: 0,
    });
    return data;
  }

  async find(uid) {
    const data = await this.app.mysql.get('students', { id: uid });
    return data;
  }

  async insert(row) {
    await this.app.mysql.insert('students', row);
    return true;
  }

  async update(row) {
    await this.app.mysql.update('students', row);
    return true;
  }
}

module.exports = StudentsService;
