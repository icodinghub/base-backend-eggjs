'use strict';

const { Controller } = require('egg');

class StudentsController extends Controller {
  async get() {
    const ctx = this.ctx;
    const res = await ctx.service.students.get();
    ctx.helper.success({ ctx, res });
  }

  async find() {
    const ctx = this.ctx;
    const { id } = ctx.params;
    const res = await ctx.service.students.find(id);
    ctx.helper.success({ ctx, res });
  }

  async insert() {
    const ctx = this.ctx;
    const { name, sex, code, classId } = ctx.request.body;
    await ctx.service.students.insert({ name, sex, studentCode: code, classId });
    ctx.helper.success({ ctx });
  }

  async update() {
    const ctx = this.ctx;
    const { name, sex, code, classId } = ctx.request.body;
    const { id } = ctx.params;
    await ctx.service.students.update({ name, sex, studentCode: code, classId, id });
    ctx.helper.success({ ctx });
  }
}

module.exports = StudentsController;
