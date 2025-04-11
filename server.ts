import compression from 'compression';
import express from 'express';
import type { Request, Response } from 'express';
import fs from 'node:fs';
import https from 'node:https';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import serverTiming from 'server-timing';
import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';
import mkcert from 'vite-plugin-mkcert';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const templatePath = isProduction ? 'dist/client/index.html' : 'index.html';
const serverEntry = isProduction ? './dist/server/entry-server.js' : 'src/entry-server.tsx';
const PORT = 3000;
const DOMAIN = isProduction ? 'localhost' : 'ssr-local.com';

let render: (url: string, template: string, res: Response) => Promise<string>;
let template: string;

async function prepareHTML(req: Request, res: Response, vite: ViteDevServer) {
  res.startTime('prepareHTML', 'resolving template');
  const url = req.originalUrl;

  if (template && render && isProduction) {
    res.endTime('prepareHTML');
    return await render(url, template, res);
  }

  template = fs.readFileSync(path.resolve(__dirname, templatePath), 'utf-8');

  if (!isProduction) {
    template = await vite.transformIndexHtml(url, template);
    render = (await vite.ssrLoadModule(serverEntry)).render;
  } else {
    render = (await import(serverEntry)).render;
  }

  res.endTime('prepareHTML');
  return await render(url, template, res);
}

async function createServer() {
  const app = express();

  app.use(
    serverTiming({
      enabled: (req) => req.query.timing === 'true'
    })
  );

  if (isProduction) {
    app.use(compression());
    app.use(express.static('dist'));
  }

  let vite: ViteDevServer;

  if (!isProduction) {
    vite = await createViteServer({
      server: {
        middlewareMode: true
      },
      appType: 'custom',
      plugins: [
        mkcert({
          hosts: [DOMAIN],
          savePath: 'ssl'
        })
      ]
    });

    app.use(vite.middlewares);
  }

  app.use('*splat', async (req, res) => {
    res.startTime('routing', 'routing total');

    try {
      const html = await prepareHTML(req, res, vite);
      res.endTime('routing');
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (error) {
      vite?.ssrFixStacktrace(error as Error);
      console.error(error);
      res
        .status(500)
        .end(
          'OOPSIE WOOPSIE!! Uwu We made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!'
        );
    }
  });

  if (isProduction) {
    app.listen(PORT, () => {
      console.info(`Server started at http://localhost:3000`);
    });
  } else {
    https
      .createServer(
        {
          cert: fs.readFileSync('ssl/cert.pem'),
          key: fs.readFileSync('ssl/dev.pem')
        },
        app
      )
      .listen(PORT, DOMAIN, () => {
        const url = `https://${DOMAIN}:${PORT}`;

        console.info(`Server started at ${url}`);
      });
  }
}

createServer();
