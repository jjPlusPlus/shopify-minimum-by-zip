require('isomorphic-fetch');
const dotenv = require('dotenv');

const next = require('next');

const logger = require('koa-logger')
const Koa = require('koa');
const Router = require('koa-router');

const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');

const { ApolloServer, gql, graphqlKoa } = require('apollo-server-koa');

const { MongoClient } = require('mongodb');
// const mongoose = require('mongoose');

const resolvers = require('./server/resolvers');
const Restrictions = require('./server/RestrictionsDatasource.js')
const typeDefs = require('./server/typedefs');

const client = new MongoClient(
  'mongodb+srv://minByZipUser:pfCF*QKwCET1C4GUeWz@minbyzip-k4d5f.gcp.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
client.connect()

dotenv.config();

// const { ApiVersion } = require('@shopify/koa-shopify-graphql-proxy');
// const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;

app.prepare().then(() => {
  const server = new Koa();
  server.keys = [SHOPIFY_API_SECRET_KEY];

  const restrictions = new Restrictions(client.db().collection('restrictions'));
  restrictions.initialize();

  const graphQLServer = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      restrictions: restrictions
    }),
    introspection: true,
    playground: true,
    formatError: (err) => {
      console.log(err)
      return err;
    },
  })

  graphQLServer.applyMiddleware({
    app: server
  });

  server.use(logger());

  const router = new Router();
  server.use(router.routes());
  //server.use(router.allowedMethods());

  server.use(session({ sameSite: 'none', secure: true }, server));

  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: ['read_products'],
      afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        ctx.cookies.set('shopOrigin', shop, {
          httpOnly: false,
          secure: true,
          sameSite: 'none'
        });
        ctx.redirect('/');
      },
    }),
  );

  server.use(verifyRequest());
  server.use(async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
