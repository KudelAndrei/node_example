import convert from 'koa-convert';
import KoaBody from 'koa-body';
import Router from 'koa-router';
import { validate, schemas } from '../validator';
import UserServices from '../../services/user.service';

const service = new UserServices();

const router = new Router();
const koaBody = convert(KoaBody());

router.get('/users', async (ctx, next) => {
  await validate({}, ctx);
  const users = await service.getUsers();
  ctx.body = { users };
  await next();
});

router.post('/users', koaBody, async (ctx, next) => {
    await validate(schemas.register, ctx);
    const user = await service.signUp(ctx.request.body);
    ctx.body = { user };
    next();
});

router.post('/users/signin', koaBody, async (ctx, next) => {
  await validate(schemas.register, ctx);
  await service.signIn(ctx.request.body);
  next();
});

router.post('/users/confirm', koaBody, async (ctx, next) => {
  await validate(schemas.register, ctx);
  const user = await service.confirmRegister(ctx.request.body);
  ctx.body = { user };
  next();

});

router.post('/users/delete', koaBody, async (ctx, next) => {
  await validate(schemas.register, ctx);
  const user = await service.deleteUser(ctx.request.body);
  ctx.body = { user };
  next();
});

export default router;
