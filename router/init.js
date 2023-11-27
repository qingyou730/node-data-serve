const Koa = require('koa')
const routing = require('./api/index')
// const ipMiddleware = require('koa-ip');


const app = new Koa()

// app.use(ipMiddleware());
app.use( async (ctx, next) => {
  console.log('inter =====')
  // 允许所有来源，可以设置为具体的域名
  ctx.set('Access-Control-Allow-Origin', '*');
  
  // 允许的 HTTP 方法
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  
  // 允许的请求头
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // 允许携带身份凭证，例如 Cookie
  ctx.set('Access-Control-Allow-Credentials', 'true');

  // 继续处理请求
  await next();
})


routing(app);

app.listen(8889, ()=>{
  console.log('server is running at http://localhost:8889')
})

