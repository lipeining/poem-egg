'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/service/poetry.test.js', () => {
  let ctx;
  before(async () => {
    ctx = app.mockContext();
  });
  it(' import author ', async () => {
    await ctx.service.poetry.importAuthor();
  });
  // it(' import ci ', async () => {
  //   await ctx.service.poetry.importCI();
  // });
  // it(' import poet ', async () => {
  //   await ctx.service.poetry.importPOET();
  // });
});
