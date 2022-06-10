require('dotenv').config();

// Libraries
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const socketio = require('socket.io');

// Router
const api = require('./api');
// Middleware
const middlewares = require('./middlewares');
// Listener
const twitch = require('./libraries/twitchComfyListener');


class Main {
  constructor() {
    this.app = express();
    this.io = socketio(this.start(), {
      cors: {
        origin: ["", "http://localhost:8081"],
        methods: ["GET", "POST"]
      }
    });
    this.config();
    this.Handlers();
    this.routes();
  }

  config() {
    this.app.use(morgan('dev'));
    this.app.use(helmet());
    this.app.use(cors({
      origin: ["", "http://localhost:8081"],
      optionsSuccessStatus: 200 
    }));
    this.app.use(express.json());
    twitch;
  }

  routes() {
    this.app.get('/', (req, res) => {
      res.json({
        message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
      });
    });
    this.app.use('/api/v1', api);
    this.app.use(middlewares.notFound);
    this.app.use(middlewares.errorHandler);
  }
  
  async Handlers()
  {
    twitch.client.onChat = async ( user, message, flags, self, extra ) => {
      if(self) return;
      this.emitSocket('chat', {
        user: await twitch.ChatHandler( user, message, flags, self, extra ),
        message: message,
        flags: flags,
      });
    }
    twitch.client.onCommand = ( user, command, message, flags, extra ) => twitch.CommandsHandler( user, command, message, flags, extra );
    twitch.client.onReward = async ( user, reward, cost, message, extra ) =>  await twitch.RewardHandler( user, reward, cost, message, extra );
  }

  emitSocket(eventName, eventData)
  {
    this.io.sockets.emit(eventName, eventData);
  }

  start(){
    const port = process.env.PORT || 5000;
    const serv = this.app.listen(port, () => {
      /* eslint-disable no-console */
      console.log(`Listening: http://localhost:${port}`);
      /* eslint-enable no-console */
    });

    return serv;
  }
}
const main = new Main();
module.exports =  main;
