const Router = require('koa-router');
const interService = require('../../services/interService');
const IP2Region = require('ip2region').default;
// **配置路由前缀**
const router = new Router({
  prefix: '/inter'
})

const ip2region = new IP2Region();

router.get('/', async (ctx, next) => {
  const list = await interService.getInterList();
  

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
    const clientIp = ctx.request.header['x-real-ip'] || ctx.request.header['x-forwarded-for'];
    let one = await interService.getInterOne(clientIp);
    console.log('one', one)
    console.log('x-forwarded-for', clientIp)
    if (one) {
      one = await interService.updateInterList(one.id, {
        accessNumber: Number(one.accessNumber) + 1 + "",
      });
    } else {
      // 8.130.103.188' || 
      const result = ip2region.search(clientIp );
      one = await interService.addInterList({
        ...result,
        ip: clientIp,
        accessNumber: '1',
      });
    }

    ctx.body = one;
  }
);
//   ctx.body = `用户id：${ctx.params.id}`

module.exports = router
