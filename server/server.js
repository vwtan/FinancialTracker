import path from 'path';
import Express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import Sequelize from 'sequelize';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import Helmet from 'react-helmet';
import dotenv from 'dotenv';

import configureStore from '../client/store';
import fetchComponentData from './util/fetchComponentData';
import routes from '../client/routes';
import config from '../config/webpack.client.dev';
import serverConfig from './config';

dotenv.config();

const app = new Express();

var sequelize = new Sequelize('postgres://:@localhost:5432/fin_tracker');


// database initiation
sequelize.authenticate().then(function(err) {
    console.log('Connection has been established successfully.');
    var Task = sequelize.define('task', {
      title: Sequelize.STRING,
      description: Sequelize.TEXT,
      deadline: Sequelize.DATE
    });

    Task.create({ title: 'John Doe', description: 'senior engineer', deadline: '01/01/2019' })
      .then(function(employee) {

        console.log(employee.get('title'));
        console.log(employee.get('description'));
      })

    Task.sync();

  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

// end point to get All entries in table
app.get('/db_data', function(req, res) {
  sequelize.Task.findAll({
    attributes: { exclude: ['deadline'] }
  })
  .then(function(ret){
    console.log(ret[0].dataValues.title);
    console.log(ret[0].dataValues.description);
    res.end(JSON.stringify(ret));
  });

});


if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath, headers: { 'Access-Control-Allow-Origin': '*' } }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../build')));
app.use('static', Express.static(path.resolve(__dirname, '../public')));

const renderFullPage = (html, initialState) => {
  const head = Helmet.rewind();

  // Import Manifests
  const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

  return `
    <!doctype html>
    <html>
      <head>
        ${head.base.toString()}
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        ${head.script.toString()}
        ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
      </head>
      <body>
        <div id="root" style="height:100%;">${process.env.NODE_ENV === 'production' ? html : `<div>${html}</div>`}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          ${process.env.NODE_ENV === 'production' ?
          `//<![CDATA[
          window.webpackManifest = ${JSON.stringify(chunkManifest)};
          //]]>` : ''}
        </script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js'}'></script>
      </body>
    </html>
  `;
};

const renderError = (err) => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = process.env.NODE_ENV !== 'production' ?
    `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  return renderFullPage(`Server Error${errTrace}`, {});
};

app.use((req, res, next) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end(renderError(err));
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return next();
    }

    const store = configureStore();

    return fetchComponentData(store, renderProps.components, renderProps.params)
      .then(() => {
        const initialView = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        const finalState = store.getState();

        res
          .set('Content-Type', 'text/html')
          .status(200)
          .end(renderFullPage(initialView, finalState));
      })
      .catch(error => next(error));
  });
});

app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`running on port: ${serverConfig.port}`); // eslint-disable-line
  }
});

export default app;
