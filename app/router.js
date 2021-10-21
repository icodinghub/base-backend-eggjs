'use strict';

const students = require('./routes/students');
const user = require('./routes/user');
const book = require('./routes/book');

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  students(app);
  user(app);
  book(app);
};
