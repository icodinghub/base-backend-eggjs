'use strict';

const { Controller } = require('egg');
const cheeper = require('../utils/creeper');
const Crypto = require('../utils/crypto');

const cheeperUri = 'http://m.b520.cc';

class BookController extends Controller {
  // 获取排行
  async getRanking() {
    const { ctx } = this;
    const list = await cheeperClass(ctx, 'top.html');
    ctx.helper.success({ ctx, res: list });
  }

  // 获取排行榜列表
  async getRankingList() {
    const { ctx } = this;
    const list = await cheeperClassList(ctx);
    ctx.helper.success({ ctx, res: list });
  }

  // 获取分类
  async getStatistics() {
    const { ctx } = this;
    const list = await cheeperClass(ctx, 'sort.html');
    ctx.helper.success({ ctx, res: list });
  }

  // 获取分类列表
  async getStatisticsList() {
    const { ctx } = this;
    const list = await cheeperClassList(ctx);
    ctx.helper.success({ ctx, res: list });
  }

  // 获取小说介绍
  async getBookInfo() {
    const { ctx } = this;
    const { link } = ctx.params;
    const id = Crypto.base64Dec(link);
    const res = await ctx.service.creeper.get(`${cheeperUri}/${id}/`);
    const $ = cheeper.getDom(res.data);
    const book = $('.cover .block');
    const introInfo = $('.cover .intro_info');
    const bookInfo = book.find('.block_txt2');
    const $p = bookInfo.find('p');

    const title = bookInfo.find('h2>a').text();
    const bookId = bookInfo.find('h2>a').attr('href');
    const author = $p.eq(2).text().split('：')[1];
    const authorId = $p.eq(2).find('a').attr('href');
    const tag = $p.eq(3).text().split('：')[1];
    const status = $p.eq(4).text().split('：')[1];
    const lastTime = $p.eq(5).text().split('：')[1];
    const lastChapter = $p.eq(6).text().split('：')[1];
    const lastChapterLink = $p.eq(6).find('a').attr('href');
    const chaperLink = $('.ablum_read>span').eq(1).find('a')
      .attr('href');

    ctx.helper.success({
      ctx,
      res: {
        pic: book.find('.block_img2 img').attr('src'),
        title,
        bookId: Crypto.base64Enc(bookId),
        author,
        authorId: Crypto.base64Enc(authorId),
        tag,
        status,
        lastTime,
        lastChapter,
        lastChapterId: Crypto.base64Enc(lastChapterLink),
        chaperId: Crypto.base64Enc(chaperLink),
        intro: introInfo.text(),
      },
    });
  }

  // 获取小说章节
  async getChapter() {
    const { ctx } = this;
    const { id } = ctx.params;
    const { count } = ctx.query;
    const link = parseIdToLink(id);
    const res = await ctx.service.creeper.get(`${cheeperUri}/${link}_${count}/`);
    const $ = cheeper.getDom(res.data);
    const $chapters = $('.cover .chapter>li');
    const list = [];
    $chapters.each((index, li) => {
      const $a = $(li).find('a');
      list.push({
        title: $a.text(),
        id: Crypto.base64Enc($a.attr('href')),
      });
    });
    ctx.helper.success({ ctx, res: list });
  }

  // 获取章节内容
  async getContent() {
    const { ctx } = this;
    const { id } = ctx.params;
    const link = parseIdToLink(id);
    const res = await ctx.service.creeper.get(`${cheeperUri}/${link}/`);
    const $ = cheeper.getDom(res.data);
    const content = $('#content .text');
    const title = $('#content .title');
    if (content) {
      ctx.helper.success({
        ctx,
        res: {
          title: title.text(),
          cpContent: content.text(),
        },
      });
    } else {
      ctx.helper.fail({ ctx });
    }
  }
}

function parseIdToLink(id) {
  const link = Crypto.base64Dec(id);
  const _link = link.replace(/\//g, '');
  return _link;
}

async function cheeperClass(ctx, html) {
  const res = await ctx.service.creeper.get(`${cheeperUri}/${html}`);
  const $ = cheeper.getDom(res.data);
  const content = $('.content');
  const list = [];
  content.find('a').each((index, e) => {
    const $e = $(e);
    const title = $e.text();
    const id = $e.attr('href');
    list.push({
      title,
      id: Crypto.base64Enc(id),
    });
  });
  return list;
}

async function cheeperClassList(ctx) {
  const { link } = ctx.params;
  const classId = Crypto.base64Dec(link);
  const res = await ctx.service.creeper.get(`${cheeperUri}/${classId}/`);
  const $ = cheeper.getDom(res.data);
  const cover = $('.cover');
  const list = [];
  cover.find('.line').each((index, p) => {
    const $a = $(p).find('a');
    const tag = $a.eq(0).text();
    const title = $a.eq(1).text();
    const bookId = $a.eq(1).attr('href');
    const author = $a.eq(2).text();
    const authorId = $a.eq(2).attr('href');
    const pic = getBookPic(bookId);
    list.push({
      pic,
      tag,
      title,
      author,
      bookId: Crypto.base64Enc(bookId),
      authorId: Crypto.base64Enc(authorId),
    });
  });
  return list;
}

function getBookPic(bookId) {
  const imgUri = 'http://r.m.b520.cc/files/article/image/';
  const bIds = bookId.match(/-(\d+)\//);
  const id = bIds[1];
  const prefix = id.length < 4 ? 0 : id.slice(0, 1);
  return id.length < 5
    ? imgUri + `${prefix}/${id}/${id}s.jpg`
    : 'http://m.b520.cc/images/no_photo.jpg';
}

module.exports = BookController;
