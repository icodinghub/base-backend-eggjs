/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1621870077441_7088';

  // add your middleware config here
  config.middleware = [ 'auth', 'errHandler' ];

  // jwt 配置
  config.jwt = {
    secret: '123456',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
    // 暂时关闭 csrf
    security: {
      csrf: {
        enable: false,
      },
    },
  };
};
