const Router = require('koa-router');
const interService = require('../../services/interService');
const rp = require('request-promise');
const IP2Region = require('ip2region').default;
// **配置路由前缀**
const router = new Router({
  prefix: '/inter'
})

const ip2region = new IP2Region();

router.get('/', async (ctx, next) => {
  const list = await interService.getInterList();

  console.log('ctx', ctx.response.headers)


  // ctx.response.headers["access-control-allow-origin"] = "*";
  // ctx.response.headers["access-control-allow-methods"] = "GET";

  // ctx.response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderFeild');
  // ctx.response.headers.set('Access-Control-Allow-Origin', '*');
  ctx.body = list;
   // 继续处理请求
   await next();
})

router.post(
  "/",
  async (ctx, next) => {
    const clientIp = ctx.request.ip;
    ctx.response.set('Access-Control-Allow-Origin', '*');
    const result = ip2region.search(clientIp || '8.130.103.188');
    await interService.addInterList({
      ip: clientIp,
      ...result,
    });
    ctx.body = result;
  }
);
//   ctx.body = `用户id：${ctx.params.id}`

module.exports = router
