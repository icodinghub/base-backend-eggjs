'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/book/query', controller.book.queryBook);
  router.get('/book/ranking', controller.book.getRanking);
  router.get('/book/ranking/:link', controller.book.getRankingList);
  router.get('/book/statistics', controller.book.getStatistics);
  router.get('/book/statistics/:link', controller.book.getStatisticsList);
  router.get('/book/info/:link', controller.book.getBookInfo);
  router.get('/book/chapter/:id', controller.book.getChapter);
  router.get('/book/content/:id', controller.book.getContent);
};
