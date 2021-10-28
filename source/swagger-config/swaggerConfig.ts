import * as swagger from 'swagger-express-ts';
import express from 'express';

export function configureSwagger(app: express.Application) {
  app.use('/api-docs/swagger', express.static('swagger'));
  app.use(
    '/api-docs/swagger/assets',
    express.static('node_modules/swagger-ui-dist')
  );
  app.use(
    swagger.express({
      definition: {
        info: {
          title: 'Partners Api',
          version: '1.0',
        },
        externalDocs: {
          url: 'docs',
        },
      },
    })
  );
}
