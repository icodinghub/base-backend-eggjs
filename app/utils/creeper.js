'use strict';
/**
 * 爬虫爬取想要的信息
 */
// 涉及到两个插件
// cheerio 一个类似于 jQuery 的 DOM 解析库
// iconv-lite 由于 Node.js 只有 utf8 编码规则，那么如果处理 gbk 编码规则的文件就会出现乱码情况，所以使用其转码
const iconv = require('iconv-lite');
const cheerio = require('cheerio');

module.exports = {
  getDom(body, encoding = 'gbk') {
    const html = iconv.decode(body, encoding);
    const $ = cheerio.load(html, { decodeEntities: false });
    return $;
  },
};
