'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/students', controller.students.get);
  router.get('/students/:id', controller.students.find);
  router.post('/students', controller.students.insert);
  router.put('/stundets/:id', controller.students.update);
};
