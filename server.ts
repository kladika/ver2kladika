import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { enableProdMode } from '@angular/core';
// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import { join } from 'path';

import { ROUTES } from './static.paths';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

/* - Example Express Rest API endpoints -
  app.get('/api/**', (req, res) => { });
*/

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));

// To enable proper 404 redirects in non existent routes we need to specify the existing routes and then
// add a '*' route for all the non existent routes to be treated with a 404 status
console.log('Enabled ROUTES:');
ROUTES.forEach(route => {
  console.log(route);
  app.get(`${route}`, (req, res) => {
    console.time(`GET: ${req.originalUrl}`);
    res.render('index', {
      req,
      res
    });
    console.timeEnd(`GET: ${req.originalUrl}`);
  });
});

app.get('*', (req, res) => {
  console.time(`GET: ${req.originalUrl} [404]`);
  res.status(404).render('index', {
    req,
    res,
    requestUrl: '/404'
  });
  console.timeEnd(`GET: ${req.originalUrl} [404]`);
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
