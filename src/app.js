import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import routes from './router';
import dotenv from 'dotenv';

dotenv.config();
class App {
  constructor() {
    this.server = express(); //ativar o servidor; server é a variavel que tem o express
    mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }); //conexão com banco
    this.middlewares(); // conectar com middleware
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(
      //server.use = manda para o servidor inteiro
      '/files',
      express.static(path.resolve(__dirname, '..', 'uploads')) //caminho pra mandar imagens pra pasta uploads; static = fixo, não vai mudar
    );
    this.server.use(express.json())
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server