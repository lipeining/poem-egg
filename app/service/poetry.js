'use strict';
const Service = require('egg').Service;

class PoetryService extends Service {
  async ping() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async import(values, options = {}) {
    const { app, ctx, config } = this;
    const dir = app.path.resolve(config.poetry.dir);
    ctx.logger.info(dir);
  }
  async importAuthor(values, options = {}) {
    const { app, ctx, config } = this;
    const ciMap = {
      name: 'name',
      desc: 'description',
      id: 'id',
    };
    const poetMap = {
      name: 'name',
      desc: 'desc',
      id: 'id',
    };
    const fileList = [
      app.path.join(app.path.resolve(config.poetry.dir, 'ci'), 'author.song.json'),
      app.path.join(app.path.resolve(config.poetry.dir, 'json'), 'authors.song.json'),
      app.path.join(app.path.resolve(config.poetry.dir, 'json'), 'authors.tang.json'),
    ];
    const records = [];
    const promises = fileList.map(filePath => {
      return app.fs.readJson(filePath).then(authors => {
        authors.map(author => {
          const data = {
            name: author[ciMap.name] || author[poetMap.name],
            desc: author[ciMap.desc] || author[poetMap.desc],
            uuid: author[ciMap.id] || author[poetMap.id] || '',
          };
          records.push(data);
          return data;
        });
      });
    });
    await Promise.all(promises);
    await ctx.model.Author.bulkCreate(records);
    // todo
    // 由于简介过长， redis 应该会使用 hashtable 存储对应的数据，而不是 ziplist
    // 若是想节省空间，需要将 desc 分开存储，一个单纯的字符串键即可，
    // 使用 multi pipeline 一次性获取到对应的作者信息，这样可以减少网络往来时间。
    // for (const author of authors) {
    //   const data = {
    //     name: author[map.name],
    //     // desc: author[map.desc],
    //     id: author[map.id] || '',
    //   };
    //   const key = `author:${data.name}:`;
    //   await app.redis.hmset(key, data);
    //   await app.redis.set(`${key}:desc:`, author[map.desc]);
    // }
  }
  async importCI(values, options = {}) {
    const { app, ctx, config } = this;
    const dir = app.path.resolve(config.poetry.dir, 'ci');
    const files = app.fs.readdirSync(dir);
    // console.log(files);
    const authorMap = {};
    const rhythmicMap = {};
    const cisList = [];
    const rhythmicList = [];
    const promises = files.filter(f => {
      return f.startsWith('ci.song.');
    }).map(f => {
      return app.fs.readJson(app.path.join(dir, f)).then(async cis => {
        // author
        // paragraphs
        // rhythmic
        for (const ci of cis) {
          const paragraphs = ci.paragraphs.join('');
          const para = paragraphs.substring(0, 20);
          // const words = app._.uniq(app._.words(para, /[^，。！？]/g));
          const ciId = app.uuid();
          // const key = `ci:${ciId}`;
          const rhythmic = ci.rhythmic;
          const author = ci.author;
          const data = { uuid: ciId, para, paragraphs, rhythmic, author };
          cisList.push(data);
          rhythmicList.push(rhythmic);
        }
        return cis;
      });
    });
    await Promise.all(promises);
    // await ctx.model.Rhythmic.bulkCreate(rhythmicList);
    for (const cis of app._.chunk(cisList, 2000)) {
      const dataCis = await ctx.model.Poetry.bulkCreate(cis);
    }
    // 建立索引的方法可以之后再做吧。
    // for (const ci of dataCis) {
    //   // 将数据存储到数据库中
    //   const rhythmic = ci.rhythmic;
    //   const author = ci.author;
    //   if (!authorMap[author]) {
    //     authorMap[author] = [];
    //   }
    //   authorMap[author].push(ci.id);
    //   if (!rhythmicMap[rhythmic]) {
    //     rhythmicMap[rhythmic] = [];
    //   }
    //   rhythmicMap[rhythmic].push(ci.id);
    // }
    // for(const author of Object.keys(authorMap)){
    // await app.redis.sadd(`author:${author}:ci:`, authorMap[author]);
    // }
    // for(const rhythmic of Object.keys(rhythmicMap)){
    // await app.redis.sadd(`rhythmic:${rhythmic}:ci:`, rhythmicMap[rhythmic]);
    // }

    // await app.redis.hmset(key, data);
    // await app.redis.sadd(`author:${author}:ci:`, ciId);
    // await app.redis.sadd(`rhythmic:${rhythmic}:`, ciId);
    // for (const word of words) {
    //   await app.redis.sadd(`word:${word}`, ciId);
    // }
  }
  async importPOET(values, options = {}) {
    const { app, ctx, config } = this;
    const dir = app.path.resolve(config.poetry.dir, 'json');
    const files = app.fs.readdirSync(dir);
    // console.log(files);
    const authorMap = {};
    const poetList = [];
    const promises = files.filter(f => {
      return f.startsWith('poet.song.') || f.startsWith('poet.tang.');
    }).map(f => {
      return app.fs.readJson(app.path.join(dir, f)).then(async poets => {
        // author
        // paragraphs
        // rhythmic
        for (const poet of poets) {
          const paragraphs = poet.paragraphs.join('');
          const para = paragraphs.substring(0, 20);
          // const words = app._.uniq(app._.words(para, /[^，。！？]/g));
          const ciId = poet.id || app.uuid();
          const author = poet.author;
          const title = poet.title;
          const data = { uuid: ciId, title, para, paragraphs, author };
          poetList.push(data);
        }
        return poets;
      });
    });
    await Promise.all(promises);
    for (const poets of app._.chunk(poetList, 2000)) {
      const dataPoets = await ctx.model.Poetry.bulkCreate(poets);
    }
  }
  async importLUNYU(values, options = {}) {
    const { app, ctx, config } = this;
  }
  async importYUANQU(values, options = {}) {
    const { app, ctx, config } = this;
  }
  async importSHIJING(values, options = {}) {
    const { app, ctx, config } = this;
  }
}


module.exports = PoetryService;
