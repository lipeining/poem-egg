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
  config.keys = appInfo.name + '_1578118608658_930';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.poetry = {
    dir: '/chinese-poetry-master',
  };
  config.paths = {
    upload: `/raid/${appInfo.name}/upload`,
  };
  config.cluster = {
    listen: {
      port: 7001,
    },
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ 'http://localhost:3000' ],
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  config.valparams = {
    locale: 'zh-cn',
  };
  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'poem',
    username: 'duoyi',
    password: 'DUOYIqaz123',
  };
  config.redis = {
    client: {
      host: 'localhost',
      port: 6379,
      // password: 'admin', // docker
      password: '',
      db: 12,
    },
  };
  return {
    ...config,
    ...userConfig,
  };
};
