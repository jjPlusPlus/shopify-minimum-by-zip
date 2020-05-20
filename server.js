require('isomorphic-fetch');
const dotenv = require('dotenv');

const next = require('next');

const Koa = require('koa');
const Router = require('koa-router');

const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');

// const koaBody = require('koa-bodyparser');
const { ApolloServer, gql, graphqlKoa } = require('apollo-server-koa');

const graphQLSchema = require('./server/schema/schema');
const resolvers = require('./server/resolvers');
const Restrictions = require('./server/RestrictionsDatasource.js')

const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

const client = new MongoClient('mongodb+srv://minByZipUser:pfCF*QKwCET1C4GUeWz@minbyzip-k4d5f.gcp.mongodb.net/test?retryWrites=true&w=majority');
client.connect()

const typeDefs = gql`
  # Queryable fields for a restriction
  type Restriction {
    zip: String
    minimum: String
    name: String
  }

  # Query all (or no) Restrictions
  type Query {
    restrictions: [Restriction]
  }
`;

dotenv.config();

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;

app.prepare().then(() => {
  const server = new Koa();
  server.use(session({ sameSite: 'none', secure: true }, server));
  server.keys = [SHOPIFY_API_SECRET_KEY];

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
